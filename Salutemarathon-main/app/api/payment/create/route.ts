import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'
import Registration from '@/models/Registration'
import User from '@/models/User'
import { rateLimiters, getClientIP } from '@/lib/security'

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    
    try {
      await rateLimiters.payment.consume(clientIP)
    } catch (rateLimiterRes) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many payment attempts. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Connect to database
    await dbConnect()

    // Parse request body
    const { registrationId, amount, currency } = await request.json()

    // Validate input
    if (!registrationId || !amount || !currency) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (currency !== 'INR') {
      return NextResponse.json(
        { success: false, message: 'Invalid currency' },
        { status: 400 }
      )
    }

    if (![333, 555].includes(amount)) {
      return NextResponse.json(
        { success: false, message: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Find the registration and validate
    const registration = await Registration.findOne({ registrationId })
      .populate('userId')
      .populate('transactionId')

    if (!registration) {
      return NextResponse.json(
        { success: false, message: 'Registration not found' },
        { status: 404 }
      )
    }

    if (registration.paymentStatus === 'completed') {
      return NextResponse.json(
        { success: false, message: 'Payment already completed for this registration' },
        { status: 400 }
      )
    }

    // Validate amount matches race category
    const expectedAmount = registration.raceCategory === '5K' ? 333 : 555
    if (amount !== expectedAmount) {
      return NextResponse.json(
        { success: false, message: 'Amount does not match race category' },
        { status: 400 }
      )
    }

    const user = registration.userId as any
    const amountInPaise = amount * 100

    // Create Razorpay order
    const orderOptions = {
      amount: amountInPaise,
      currency: currency,
      receipt: registrationId,
      notes: {
        registrationId: registrationId,
        userId: user._id.toString(),
        raceCategory: registration.raceCategory,
        participantName: `${user.firstName} ${user.lastName}`,
        participantEmail: user.email,
        participantPhone: user.phone
      }
    }

    const order = await razorpay.orders.create(orderOptions)

    if (!order || !order.id) {
      throw new Error('Failed to create Razorpay order')
    }

    // Update transaction with order ID
    await Transaction.findByIdAndUpdate(
      registration.transactionId,
      {
        razorpayOrderId: order.id,
        status: 'created',
        metadata: {
          ...((registration.transactionId as any).metadata || {}),
          orderCreatedAt: new Date(),
          orderAmount: amountInPaise,
          orderCurrency: currency
        }
      }
    )

    // Return order details for frontend
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: amountInPaise,
      currency: currency,
      registrationId: registrationId,
      userDetails: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone
      }
    })

  } catch (error) {
    console.error('Payment creation error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create payment order. Please try again.' 
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
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