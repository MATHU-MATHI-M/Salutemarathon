import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'
import Registration from '@/models/Registration'
import User from '@/models/User'
import { verifyRazorpaySignature, rateLimiters, getClientIP } from '@/lib/security'

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
          message: 'Too many verification attempts. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Connect to database
    await dbConnect()

    // Parse request body
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      registrationId 
    } = await request.json()

    // Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !registrationId) {
      return NextResponse.json(
        { success: false, message: 'Missing required payment verification fields' },
        { status: 400 }
      )
    }

    // Find the transaction
    const transaction = await Transaction.findOne({ 
      razorpayOrderId: razorpay_order_id,
      registrationId: registrationId 
    })

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: 'Transaction not found' },
        { status: 404 }
      )
    }

    // Verify Razorpay signature
    const isValidSignature = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      process.env.RAZORPAY_KEY_SECRET!
    )

    if (!isValidSignature) {
      // Update transaction as failed
      await Transaction.findByIdAndUpdate(transaction._id, {
        status: 'failed',
        failureReason: 'Invalid signature verification',
        metadata: {
          ...transaction.metadata,
          verificationFailedAt: new Date(),
          failedSignature: razorpay_signature
        }
      })

      return NextResponse.json(
        { success: false, message: 'Payment verification failed - invalid signature' },
        { status: 400 }
      )
    }

    // Update transaction as successful
    await Transaction.findByIdAndUpdate(transaction._id, {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: 'paid',
      webhookVerified: false, // Will be verified by webhook
      metadata: {
        ...transaction.metadata,
        paymentCompletedAt: new Date(),
        verifiedAt: new Date()
      }
    })

    // Update registration status
    const registration = await Registration.findOne({ 
      registrationId: registrationId 
    }).populate('userId')

    if (registration) {
      // Assign bib number if not already assigned
      let bibNumber = registration.bibNumber
      if (!bibNumber) {
        bibNumber = await (Registration as any).getNextBibNumber(registration.raceCategory)
      }

      await Registration.findByIdAndUpdate(registration._id, {
        status: 'confirmed',
        paymentStatus: 'completed',
        bibNumber: bibNumber
      })

      // Get user details for response
      const user = registration.userId as any
      
      // Send confirmation email
      try {
        const { sendConfirmationEmail } = await import('@/lib/email')
        const updatedTransaction = await Transaction.findById(transaction._id)
        const emailSent = await sendConfirmationEmail(user, registration, updatedTransaction!)
        
        if (emailSent) {
          await Registration.findByIdAndUpdate(registration._id, {
            confirmationEmailSent: true
          })
        }
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError)
        // Don't fail the payment verification if email fails
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully',
        registrationId: registrationId,
        paymentId: razorpay_payment_id,
        bibNumber: bibNumber,
        status: 'confirmed',
        userDetails: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          raceCategory: registration.raceCategory
        }
      })
    } else {
      return NextResponse.json(
        { success: false, message: 'Registration not found' },
        { status: 404 }
      )
    }

  } catch (error) {
    console.error('Payment verification error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Payment verification failed. Please contact support.' 
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