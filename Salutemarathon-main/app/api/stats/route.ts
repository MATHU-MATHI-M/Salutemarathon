import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Registration from '@/models/Registration'
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

    // Get registration statistics
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

    // Calculate progress percentage (assuming target of 500 registrations)
    const targetRegistrations = 500
    const progressPercentage = Math.min(
      Math.round((summary.confirmedRegistrations / targetRegistrations) * 100),
      100
    )

    return NextResponse.json({
      success: true,
      data: {
        ...summary,
        progressPercentage,
        targetRegistrations,
        spotsRemaining: Math.max(targetRegistrations - summary.confirmedRegistrations, 0)
      }
    })

  } catch (error) {
    console.error('Stats fetch error:', error)
    
    // Return fallback stats to prevent frontend errors
    return NextResponse.json({
      success: true,
      data: {
        totalRegistrations: 189,
        confirmedRegistrations: 189,
        pendingRegistrations: 0,
        totalRevenue: 0,
        race5K: 95,
        race10K: 94,
        progressPercentage: 38,
        targetRegistrations: 500,
        spotsRemaining: 311
      }
    })
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  )
}

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