import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Registration from '@/models/Registration'
import Transaction from '@/models/Transaction'
import { 
  generateRegistrationId, 
  sanitizeInput, 
  validateEmail, 
  validatePhoneNumber, 
  validateAge, 
  validatePincode,
  validateRequiredFields,
  rateLimiters,
  getClientIP
} from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    
    try {
      await rateLimiters.registration.consume(clientIP)
    } catch (rateLimiterRes) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Too many registration attempts. Please try again later.' 
        },
        { status: 429 }
      )
    }

    // Connect to database
    await dbConnect()

    // Parse request body
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'age', 'gender', 
      'raceCategory', 'emergencyContactName', 'emergencyContactPhone', 
      'tshirtSize', 'address.street', 'address.city', 'address.state', 
      'address.pincode', 'termsAccepted', 'waiver'
    ]

    const validation = validateRequiredFields(body, requiredFields)
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields', 
          missingFields: validation.missingFields 
        },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      firstName: sanitizeInput(body.firstName),
      lastName: sanitizeInput(body.lastName),
      email: sanitizeInput(body.email.toLowerCase()),
      phone: validatePhoneNumber(body.phone) ? body.phone.replace(/\D/g, '').slice(-10) : '',
      age: parseInt(body.age),
      gender: body.gender,
      raceCategory: body.raceCategory,
      emergencyContactName: sanitizeInput(body.emergencyContactName),
      emergencyContactPhone: validatePhoneNumber(body.emergencyContactPhone) ? body.emergencyContactPhone.replace(/\D/g, '').slice(-10) : '',
      medicalConditions: sanitizeInput(body.medicalConditions || ''),
      tshirtSize: body.tshirtSize,
      address: {
        street: sanitizeInput(body.address.street),
        city: sanitizeInput(body.address.city),
        state: sanitizeInput(body.address.state),
        pincode: body.address.pincode
      },
      termsAccepted: Boolean(body.termsAccepted),
      waiver: Boolean(body.waiver)
    }

    // Validate data
    if (!validateEmail(sanitizedData.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      )
    }

    if (!validatePhoneNumber(sanitizedData.phone)) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    if (!validateAge(sanitizedData.age)) {
      return NextResponse.json(
        { success: false, message: 'Age must be between 16 and 80 years' },
        { status: 400 }
      )
    }

    if (!validatePincode(sanitizedData.address.pincode)) {
      return NextResponse.json(
        { success: false, message: 'Invalid pincode format' },
        { status: 400 }
      )
    }

    if (!['5K', '10K'].includes(sanitizedData.raceCategory)) {
      return NextResponse.json(
        { success: false, message: 'Invalid race category' },
        { status: 400 }
      )
    }

    if (!sanitizedData.termsAccepted || !sanitizedData.waiver) {
      return NextResponse.json(
        { success: false, message: 'Terms and waiver must be accepted' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: sanitizedData.email },
        { phone: sanitizedData.phone }
      ]
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email or phone already registered' },
        { status: 400 }
      )
    }

    // Generate unique registration ID
    let registrationId = generateRegistrationId()
    let isUnique = false
    let attempts = 0
    const maxAttempts = 5

    while (!isUnique && attempts < maxAttempts) {
      const existingRegistration = await User.findOne({ registrationId })
      if (!existingRegistration) {
        isUnique = true
      } else {
        registrationId = generateRegistrationId()
        attempts++
      }
    }

    if (!isUnique) {
      return NextResponse.json(
        { success: false, message: 'Unable to generate unique registration ID. Please try again.' },
        { status: 500 }
      )
    }

    // Create user
    const user = new User({
      ...sanitizedData,
      registrationId
    })

    await user.save()

    // Calculate amount (in paise for Razorpay)
    const amount = sanitizedData.raceCategory === '5K' ? 33300 : 55500 // ₹333 or ₹555 in paise

    // Create initial transaction record
    const transaction = new Transaction({
      userId: user._id,
      registrationId,
      razorpayOrderId: '', // Will be updated when payment order is created
      amount,
      currency: 'INR',
      status: 'created',
      raceCategory: sanitizedData.raceCategory,
      webhookVerified: false,
      metadata: {
        userAgent: request.headers.get('user-agent') || '',
        ipAddress: clientIP,
        timestamp: new Date()
      }
    })

    await transaction.save()

    // Create registration record
    const registration = new Registration({
      registrationId,
      userId: user._id,
      transactionId: transaction._id,
      status: 'pending',
      raceCategory: sanitizedData.raceCategory,
      amount: amount / 100, // Store in rupees
      paymentStatus: 'pending',
      confirmationEmailSent: false,
      kitCollected: false,
      raceCompleted: false
    })

    await registration.save()

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Registration created successfully',
      registrationId,
      userId: user._id.toString(),
      transactionId: transaction._id.toString(),
      amount: amount / 100,
      raceCategory: sanitizedData.raceCategory
    })

  } catch (error) {
    console.error('Registration error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again.' 
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