import mongoose, { Document, Schema } from 'mongoose'

export interface IRegistration extends Document {
  registrationId: string
  userId: mongoose.Types.ObjectId
  transactionId: mongoose.Types.ObjectId
  bibNumber?: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded'
  raceCategory: '5K' | '10K'
  amount: number
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  confirmationEmailSent: boolean
  kitCollected: boolean
  raceCompleted: boolean
  finishTime?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const RegistrationSchema: Schema = new Schema({
  registrationId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  transactionId: {
    type: Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
    index: true
  },
  bibNumber: {
    type: Number,
    unique: true,
    sparse: true,
    min: [1, 'Bib number must be positive'],
    max: [9999, 'Bib number cannot exceed 4 digits']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'confirmed', 'cancelled', 'refunded'],
    default: 'pending',
    index: true
  },
  raceCategory: {
    type: String,
    required: true,
    enum: ['5K', '10K'],
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative']
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
    index: true
  },
  confirmationEmailSent: {
    type: Boolean,
    default: false,
    index: true
  },
  kitCollected: {
    type: Boolean,
    default: false,
    index: true
  },
  raceCompleted: {
    type: Boolean,
    default: false,
    index: true
  },
  finishTime: {
    type: String,
    validate: {
      validator: function(v: string) {
        if (!v) return true
        // Validate time format (HH:MM:SS)
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(v)
      },
      message: 'Finish time must be in HH:MM:SS format'
    }
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true
})

// Compound indexes for better query performance
RegistrationSchema.index({ status: 1, paymentStatus: 1 })
RegistrationSchema.index({ raceCategory: 1, status: 1 })
RegistrationSchema.index({ createdAt: -1 })
RegistrationSchema.index({ userId: 1, transactionId: 1 })

// Pre-save middleware to ensure consistency
RegistrationSchema.pre('save', function(next) {
  const registration = this as IRegistration
  
  // Auto-confirm registration if payment is completed
  if (registration.paymentStatus === 'completed' && registration.status === 'pending') {
    registration.status = 'confirmed'
  }
  
  // Auto-cancel registration if payment failed
  if (registration.paymentStatus === 'failed' && registration.status === 'pending') {
    registration.status = 'cancelled'
  }
  
  next()
})

// Static method to get next available bib number
RegistrationSchema.statics.getNextBibNumber = async function(raceCategory: string) {
  const lastRegistration = await this.findOne(
    { raceCategory, bibNumber: { $exists: true } },
    { bibNumber: 1 },
    { sort: { bibNumber: -1 } }
  )
  
  if (!lastRegistration) {
    // Starting bib numbers: 5K starts from 1001, 10K starts from 2001
    return raceCategory === '5K' ? 1001 : 2001
  }
  
  return lastRegistration.bibNumber + 1
}

export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema)