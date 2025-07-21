import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  raceCategory: '5K' | '10K'
  emergencyContactName: string
  emergencyContactPhone: string
  medicalConditions?: string
  tshirtSize: 'M' | 'L' | 'XL' | 'XXL'
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  registrationId: string
  termsAccepted: boolean
  waiver: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters'],
    validate: {
      validator: function(v: string) {
        return /^[a-zA-Z\s]+$/.test(v)
      },
      message: 'First name should only contain letters and spaces'
    }
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters'],
    validate: {
      validator: function(v: string) {
        return /^[a-zA-Z\s]+$/.test(v)
      },
      message: 'Last name should only contain letters and spaces'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      },
      message: 'Please enter a valid email address'
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v: string) {
        return /^[6-9]\d{9}$/.test(v)
      },
      message: 'Please enter a valid 10-digit Indian mobile number'
    }
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [16, 'Minimum age is 16 years'],
    max: [80, 'Maximum age is 80 years']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other']
  },
  raceCategory: {
    type: String,
    required: [true, 'Race category is required'],
    enum: ['5K', '10K']
  },
  emergencyContactName: {
    type: String,
    required: [true, 'Emergency contact name is required'],
    trim: true,
    maxlength: [100, 'Emergency contact name cannot exceed 100 characters']
  },
  emergencyContactPhone: {
    type: String,
    required: [true, 'Emergency contact phone is required'],
    validate: {
      validator: function(v: string) {
        return /^[6-9]\d{9}$/.test(v)
      },
      message: 'Please enter a valid 10-digit emergency contact number'
    }
  },
  medicalConditions: {
    type: String,
    trim: true,
    maxlength: [500, 'Medical conditions cannot exceed 500 characters']
  },
  tshirtSize: {
    type: String,
    required: [true, 'T-shirt size is required'],
    enum: ['M', 'L', 'XL', 'XXL']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true,
      maxlength: [200, 'Street address cannot exceed 200 characters']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: [50, 'City cannot exceed 50 characters']
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
      maxlength: [50, 'State cannot exceed 50 characters']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      validate: {
        validator: function(v: string) {
          return /^[1-9][0-9]{5}$/.test(v)
        },
        message: 'Please enter a valid 6-digit pincode'
      }
    }
  },
  registrationId: {
    type: String,
    unique: true,
    required: true
  },
  termsAccepted: {
    type: Boolean,
    required: [true, 'You must accept the terms and conditions'],
    validate: {
      validator: function(v: boolean) {
        return v === true
      },
      message: 'Terms and conditions must be accepted'
    }
  },
  waiver: {
    type: Boolean,
    required: [true, 'You must accept the waiver'],
    validate: {
      validator: function(v: boolean) {
        return v === true
      },
      message: 'Waiver must be accepted'
    }
  }
}, {
  timestamps: true
})

// Indexes for better performance
UserSchema.index({ email: 1 })
UserSchema.index({ phone: 1 })
UserSchema.index({ registrationId: 1 })
UserSchema.index({ createdAt: -1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)