import mongoose, { Document, Schema } from 'mongoose'

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId
  registrationId: string
  razorpayOrderId: string
  razorpayPaymentId?: string
  razorpaySignature?: string
  amount: number
  currency: string
  status: 'created' | 'attempted' | 'paid' | 'failed' | 'refunded'
  raceCategory: '5K' | '10K'
  paymentMethod?: string
  failureReason?: string
  refundId?: string
  refundAmount?: number
  webhookVerified: boolean
  metadata?: {
    userAgent?: string
    ipAddress?: string
    timestamp?: Date
  }
  createdAt: Date
  updatedAt: Date
}

const TransactionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  registrationId: {
    type: String,
    required: true,
    index: true
  },
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  razorpayPaymentId: {
    type: String,
    sparse: true,
    index: true
  },
  razorpaySignature: {
    type: String,
    sparse: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative'],
    validate: {
      validator: function(v: number) {
        return v === 33300 || v === 55500 // 333 and 555 in paise
      },
      message: 'Invalid amount for race category'
    }
  },
  currency: {
    type: String,
    required: true,
    default: 'INR',
    enum: ['INR']
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'attempted', 'paid', 'failed', 'refunded'],
    default: 'created',
    index: true
  },
  raceCategory: {
    type: String,
    required: true,
    enum: ['5K', '10K']
  },
  paymentMethod: {
    type: String,
    trim: true
  },
  failureReason: {
    type: String,
    trim: true
  },
  refundId: {
    type: String,
    sparse: true
  },
  refundAmount: {
    type: Number,
    min: [0, 'Refund amount cannot be negative']
  },
  webhookVerified: {
    type: Boolean,
    default: false,
    index: true
  },
  metadata: {
    userAgent: {
      type: String,
      trim: true
    },
    ipAddress: {
      type: String,
      validate: {
        validator: function(v: string) {
          if (!v) return true
          // Basic IP validation (IPv4 and IPv6)
          const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
          const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
          return ipv4Regex.test(v) || ipv6Regex.test(v)
        },
        message: 'Invalid IP address format'
      }
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
})

// Compound indexes for better query performance
TransactionSchema.index({ userId: 1, status: 1 })
TransactionSchema.index({ status: 1, createdAt: -1 })
TransactionSchema.index({ razorpayOrderId: 1, razorpayPaymentId: 1 })

// Pre-save middleware to validate amount based on race category
TransactionSchema.pre('save', function(next) {
  const transaction = this as ITransaction
  
  if (transaction.raceCategory === '5K' && transaction.amount !== 33300) {
    return next(new Error('Invalid amount for 5K race category'))
  }
  
  if (transaction.raceCategory === '10K' && transaction.amount !== 55500) {
    return next(new Error('Invalid amount for 10K race category'))
  }
  
  next()
})

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema)