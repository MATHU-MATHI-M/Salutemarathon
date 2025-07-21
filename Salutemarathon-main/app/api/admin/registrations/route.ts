import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Registration from '@/models/Registration'
import User from '@/models/User'
import Transaction from '@/models/Transaction'
import { rateLimiters, getClientIP } from '@/lib/security'

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    
    try {
      await rateLimiters.general.consume(clientIP)
    } catch (rateLimiterRes) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many requests. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Connect to database
    await dbConnect()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const raceCategory = searchParams.get('raceCategory')
    const search = searchParams.get('search')

    // Build filter query
    const filter: any = {}
    
    if (status) {
      filter.status = status
    }
    
    if (raceCategory) {
      filter.raceCategory = raceCategory
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Get registrations with populated user and transaction data
    let query = Registration.find(filter)
      .populate('userId', 'firstName lastName email phone age gender address tshirtSize')
      .populate('transactionId', 'razorpayPaymentId amount status paymentMethod createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    // Add search functionality if search term provided
    if (search) {
      const users = await User.find({
        $or: [
          { firstName: { $regex: search, $options: 'i' } },
          { lastName: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ]
      }).select('_id')

      const userIds = users.map(user => user._id)
      filter.userId = { $in: userIds }
    }

    const registrations = await query.exec()
    const totalRegistrations = await Registration.countDocuments(filter)

    // Get summary statistics
    const stats = await Registration.aggregate([
      {
        $group: {
          _id: null,
          totalRegistrations: { $sum: 1 },
          confirmedRegistrations: {
            $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] }
          },
          pendingRegistrations: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          totalRevenue: {
            $sum: { $cond: [{ $eq: ['$paymentStatus', 'completed'] }, '$amount', 0] }
          },
          race5K: {
            $sum: { $cond: [{ $eq: ['$raceCategory', '5K'] }, 1, 0] }
          },
          race10K: {
            $sum: { $cond: [{ $eq: ['$raceCategory', '10K'] }, 1, 0] }
          }
        }
      }
    ])

    const summary = stats[0] || {
      totalRegistrations: 0,
      confirmedRegistrations: 0,
      pendingRegistrations: 0,
      totalRevenue: 0,
      race5K: 0,
      race10K: 0
    }

    return NextResponse.json({
      success: true,
      data: {
        registrations,
        pagination: {
          page,
          limit,
          total: totalRegistrations,
          pages: Math.ceil(totalRegistrations / limit)
        },
        summary
      }
    })

  } catch (error) {
    console.error('Admin registrations fetch error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch registrations' 
      },
      { status: 500 }
    )
  }
}

// Export specific registration by ID
export async function POST(request: NextRequest) {
  try {
    const { action, registrationId } = await request.json()

    if (action === 'export') {
      await dbConnect()

      const registration = await Registration.findOne({ registrationId })
        .populate('userId')
        .populate('transactionId')

      if (!registration) {
        return NextResponse.json(
          { success: false, message: 'Registration not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: registration
      })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid action' },
      { status: 400 }
    )

  } catch (error) {
    console.error('Admin action error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Action failed' 
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function PUT() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  )
}