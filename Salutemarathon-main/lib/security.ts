import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { RateLimiterMemory } from 'rate-limiter-flexible'

// Registration ID generation
export function generateRegistrationId(): string {
  const timestamp = Date.now().toString(36)
  const random = crypto.randomBytes(4).toString('hex').toUpperCase()
  return `SM25-${timestamp}-${random}`
}

// Input sanitization
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return ''
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>'"&]/g, (match) => {
      const entities: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      }
      return entities[match] || match
    })
    .trim()
}

// Phone number validation and formatting
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '').slice(-10)
}

// Email validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.toLowerCase())
}

// Age validation
export function validateAge(age: number): boolean {
  return age >= 16 && age <= 80
}

// Pincode validation
export function validatePincode(pincode: string): boolean {
  const pincodeRegex = /^[1-9][0-9]{5}$/
  return pincodeRegex.test(pincode)
}

// Password hashing (for future admin features)
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

// Rate limiting configurations
export const rateLimiters = {
  // Registration form submission: 3 attempts per hour per IP
  registration: new RateLimiterMemory({
    keyBy: 'ip',
    points: 3,
    duration: 3600, // 1 hour
    blockDuration: 3600 // Block for 1 hour
  }),
  
  // Payment creation: 5 attempts per hour per IP
  payment: new RateLimiterMemory({
    keyBy: 'ip',
    points: 5,
    duration: 3600,
    blockDuration: 1800 // Block for 30 minutes
  }),
  
  // General API: 100 requests per 15 minutes per IP
  general: new RateLimiterMemory({
    keyBy: 'ip',
    points: 100,
    duration: 900, // 15 minutes
    blockDuration: 900
  }),
  
  // Contact form: 2 submissions per hour per IP
  contact: new RateLimiterMemory({
    keyBy: 'ip',
    points: 2,
    duration: 3600,
    blockDuration: 3600
  })
}

// Razorpay signature verification
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  try {
    const body = orderId + '|' + paymentId
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex')
    
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(signature, 'hex')
    )
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
}

// Webhook signature verification
export function verifyWebhookSignature(
  body: string,
  signature: string,
  secret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body, 'utf8')
      .digest('hex')
    
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'hex'),
      Buffer.from(signature, 'hex')
    )
  } catch (error) {
    console.error('Webhook signature verification error:', error)
    return false
  }
}

// Data encryption for sensitive information
export function encryptData(data: string, key: string): string {
  const algorithm = 'aes-256-gcm'
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipher(algorithm, key)
  
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted
}

export function decryptData(encryptedData: string, key: string): string {
  const algorithm = 'aes-256-gcm'
  const parts = encryptedData.split(':')
  
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted data format')
  }
  
  const iv = Buffer.from(parts[0], 'hex')
  const authTag = Buffer.from(parts[1], 'hex')
  const encrypted = parts[2]
  
  const decipher = crypto.createDecipher(algorithm, key)
  decipher.setAuthTag(authTag)
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}

// IP address extraction from request
export function getClientIP(req: any): string {
  return (
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.headers['x-real-ip'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    'unknown'
  )
}

// Request validation middleware
export function validateRequiredFields(data: any, requiredFields: string[]): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = []
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      missingFields.push(field)
    }
  }
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  }
}