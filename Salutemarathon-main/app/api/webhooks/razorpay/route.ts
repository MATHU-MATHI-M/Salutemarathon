import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Transaction from '@/models/Transaction'
import Registration from '@/models/Registration'
import { verifyWebhookSignature } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect()

    // Get the raw body for signature verification
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')

    if (!signature) {
      return NextResponse.json(
        { success: false, message: 'Missing signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const isValidSignature = verifyWebhookSignature(
      body,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET!
    )

    if (!isValidSignature) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { success: false, message: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Parse the webhook payload
    const event = JSON.parse(body)
    
    console.log('Razorpay webhook received:', event.event)

    switch (event.event) {
      case 'payment.captured':
        await handlePaymentCaptured(event.payload.payment.entity)
        break
        
      case 'payment.failed':
        await handlePaymentFailed(event.payload.payment.entity)
        break
        
      case 'order.paid':
        await handleOrderPaid(event.payload.order.entity)
        break
        
      default:
        console.log('Unhandled webhook event:', event.event)
    }

    return NextResponse.json({ success: true, message: 'Webhook processed' })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { success: false, message: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentCaptured(payment: any) {
  try {
    const { id: paymentId, order_id: orderId, amount, status } = payment

    // Find and update transaction
    const transaction = await Transaction.findOne({ razorpayOrderId: orderId })
    
    if (transaction) {
      await Transaction.findByIdAndUpdate(transaction._id, {
        razorpayPaymentId: paymentId,
        status: 'paid',
        webhookVerified: true,
        paymentMethod: payment.method || '',
        metadata: {
          ...transaction.metadata,
          webhookReceivedAt: new Date(),
          paymentStatus: status,
          paymentAmount: amount
        }
      })

      // Update registration status
      await Registration.findOneAndUpdate(
        { registrationId: transaction.registrationId },
        {
          status: 'confirmed',
          paymentStatus: 'completed'
        }
      )

      console.log(`Payment captured and verified: ${paymentId}`)
    } else {
      console.error(`Transaction not found for order: ${orderId}`)
    }

  } catch (error) {
    console.error('Error handling payment captured:', error)
  }
}

async function handlePaymentFailed(payment: any) {
  try {
    const { order_id: orderId, error_code, error_description } = payment

    // Find and update transaction
    const transaction = await Transaction.findOne({ razorpayOrderId: orderId })
    
    if (transaction) {
      await Transaction.findByIdAndUpdate(transaction._id, {
        status: 'failed',
        webhookVerified: true,
        failureReason: `${error_code}: ${error_description}`,
        metadata: {
          ...transaction.metadata,
          webhookReceivedAt: new Date(),
          errorCode: error_code,
          errorDescription: error_description
        }
      })

      // Update registration status
      await Registration.findOneAndUpdate(
        { registrationId: transaction.registrationId },
        {
          status: 'cancelled',
          paymentStatus: 'failed'
        }
      )

      console.log(`Payment failed: ${orderId} - ${error_description}`)
    } else {
      console.error(`Transaction not found for order: ${orderId}`)
    }

  } catch (error) {
    console.error('Error handling payment failed:', error)
  }
}

async function handleOrderPaid(order: any) {
  try {
    const { id: orderId, amount, amount_paid } = order

    if (amount === amount_paid) {
      // Find and update transaction
      const transaction = await Transaction.findOne({ razorpayOrderId: orderId })
      
      if (transaction) {
        await Transaction.findByIdAndUpdate(transaction._id, {
          status: 'paid',
          webhookVerified: true,
          metadata: {
            ...transaction.metadata,
            orderPaidWebhookAt: new Date(),
            orderAmount: amount,
            amountPaid: amount_paid
          }
        })

        console.log(`Order fully paid: ${orderId}`)
      }
    }

  } catch (error) {
    console.error('Error handling order paid:', error)
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