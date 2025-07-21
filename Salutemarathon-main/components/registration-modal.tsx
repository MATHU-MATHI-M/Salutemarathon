"use client"

import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { CreditCard, User, MapPin, Heart, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface RegistrationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  raceCategory: '5K' | '10K'
  emergencyContactName: string
  emergencyContactPhone: string
  medicalConditions: string
  tshirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  termsAccepted: boolean
  waiver: boolean
}

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'5K' | '10K'>('5K')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<RegistrationFormData>({
    defaultValues: {
      raceCategory: '5K',
      termsAccepted: false,
      waiver: false
    }
  })

  const watchedCategory = watch('raceCategory')

  useEffect(() => {
    setSelectedCategory(watchedCategory || '5K')
  }, [watchedCategory])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && e.target === modalRef.current) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleCategorySelect = (category: '5K' | '10K') => {
    setSelectedCategory(category)
    setValue('raceCategory', category)
  }

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    try {
      // Submit registration data
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed')
      }

      // Store registration data in localStorage for payment completion
      localStorage.setItem('pendingRegistration', JSON.stringify({
        registrationId: result.registrationId,
        raceCategory: selectedCategory,
        userInfo: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone
        }
      }))

      // Redirect to appropriate payment link
      const paymentUrl = selectedCategory === '5K' 
        ? 'https://rzp.io/rzp/5k-salute'
        : 'https://rzp.io/rzp/10k-salute'

      toast.success('Registration data saved! Redirecting to payment...')
      
      // Small delay for user to see the success message
      setTimeout(() => {
        window.open(paymentUrl, '_blank')
        toast.info('Complete your payment in the new tab. Come back here after payment completion.')
        reset()
        setCurrentStep(1)
        onClose()
      }, 1500)

    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error instanceof Error ? error.message : 'Registration failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Choose Your Race Category</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div
                  className={`pricing-card cursor-pointer p-6 rounded-[15px] border-2 transition-all duration-300 ${
                    selectedCategory === '5K' 
                      ? 'border-primary-purple bg-primary-purple/10' 
                      : 'border-gray-200 bg-background-light hover:border-primary-purple'
                  }`}
                  onClick={() => handleCategorySelect('5K')}
                >
                  <div className="text-center">
                    <input
                      type="radio"
                      {...register('raceCategory')}
                      value="5K"
                      checked={selectedCategory === '5K'}
                      className="mb-3"
                      onChange={() => handleCategorySelect('5K')}
                    />
                    <div className="font-bold text-xl mb-2">5K Challenge</div>
                    <div className="text-3xl font-extrabold text-primary-pink">₹333</div>
                  </div>
                </div>
                <div
                  className={`pricing-card cursor-pointer p-6 rounded-[15px] border-2 transition-all duration-300 ${
                    selectedCategory === '10K' 
                      ? 'border-primary-purple bg-primary-purple/10' 
                      : 'border-gray-200 bg-background-light hover:border-primary-purple'
                  }`}
                  onClick={() => handleCategorySelect('10K')}
                >
                  <div className="text-center">
                    <input
                      type="radio"
                      {...register('raceCategory')}
                      value="10K"
                      checked={selectedCategory === '10K'}
                      className="mb-3"
                      onChange={() => handleCategorySelect('10K')}
                    />
                    <div className="font-bold text-xl mb-2">10K Challenge</div>
                    <div className="text-3xl font-extrabold text-primary-pink">₹555</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary px-8 py-3 rounded-full font-semibold bg-primary-gradient text-white hover:scale-105 transition-transform"
              >
                Continue
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <User className="text-primary-purple mr-3" />
              <h3 className="text-2xl font-bold">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name *</label>
                <input
                  type="text"
                  {...register('firstName', { 
                    required: 'First name is required',
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: 'Only letters and spaces allowed'
                    }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Last Name *</label>
                <input
                  type="text"
                  {...register('lastName', { 
                    required: 'Last name is required',
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: 'Only letters and spaces allowed'
                    }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email format'
                    }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  {...register('phone', { 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Enter valid 10-digit mobile number'
                    }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Age *</label>
                <input
                  type="number"
                  {...register('age', { 
                    required: 'Age is required',
                    min: { value: 16, message: 'Minimum age is 16' },
                    max: { value: 80, message: 'Maximum age is 80' }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Gender *</label>
                <select
                  {...register('gender', { required: 'Gender is required' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">T-Shirt Size *</label>
                <select
                  {...register('tshirtSize', { required: 'T-shirt size is required' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                >
                  <option value="">Select Size</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
                {errors.tshirtSize && <p className="text-red-500 text-sm mt-1">{errors.tshirtSize.message}</p>}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary px-8 py-3 rounded-full font-semibold bg-primary-gradient text-white hover:scale-105 transition-transform"
              >
                Continue
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <MapPin className="text-primary-purple mr-3" />
              <h3 className="text-2xl font-bold">Address & Emergency Contact</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Street Address *</label>
                <textarea
                  {...register('address.street', { required: 'Street address is required' })}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                />
                {errors.address?.street && <p className="text-red-500 text-sm mt-1">{errors.address.street.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    {...register('address.city', { required: 'City is required' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  />
                  {errors.address?.city && <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">State *</label>
                  <input
                    type="text"
                    {...register('address.state', { required: 'State is required' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  />
                  {errors.address?.state && <p className="text-red-500 text-sm mt-1">{errors.address.state.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Pincode *</label>
                  <input
                    type="text"
                    {...register('address.pincode', { 
                      required: 'Pincode is required',
                      pattern: {
                        value: /^[1-9][0-9]{5}$/,
                        message: 'Enter valid 6-digit pincode'
                      }
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  />
                  {errors.address?.pincode && <p className="text-red-500 text-sm mt-1">{errors.address.pincode.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Emergency Contact Name *</label>
                  <input
                    type="text"
                    {...register('emergencyContactName', { required: 'Emergency contact name is required' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  />
                  {errors.emergencyContactName && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Emergency Contact Phone *</label>
                  <input
                    type="tel"
                    {...register('emergencyContactPhone', { 
                      required: 'Emergency contact phone is required',
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: 'Enter valid 10-digit mobile number'
                      }
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                  />
                  {errors.emergencyContactPhone && <p className="text-red-500 text-sm mt-1">{errors.emergencyContactPhone.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Medical Conditions (Optional)</label>
                <textarea
                  {...register('medicalConditions')}
                  rows={3}
                  placeholder="Please mention any medical conditions, allergies, or medications..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-purple focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="btn btn-primary px-8 py-3 rounded-full font-semibold bg-primary-gradient text-white hover:scale-105 transition-transform"
              >
                Continue
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center mb-6">
              <Heart className="text-primary-purple mr-3" />
              <h3 className="text-2xl font-bold">Terms & Payment</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('termsAccepted', { required: 'You must accept the terms and conditions' })}
                  className="mt-1"
                />
                <label className="text-sm">
                  I accept the <span className="text-primary-purple font-semibold">Terms and Conditions</span> and understand the race rules and regulations. *
                </label>
              </div>
              {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  {...register('waiver', { required: 'You must accept the waiver' })}
                  className="mt-1"
                />
                <label className="text-sm">
                  I acknowledge that I participate in this race at my own risk and release the organizers from any liability. I confirm that I am physically fit to participate. *
                </label>
              </div>
              {errors.waiver && <p className="text-red-500 text-sm">{errors.waiver.message}</p>}
            </div>

            <div className="bg-background-light p-6 rounded-lg">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount:</span>
                <span className="text-2xl text-primary-pink">₹{selectedCategory === '5K' ? '333' : '555'}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Includes race kit, t-shirt, medal, certificate, and refreshments
              </p>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary px-8 py-3 rounded-full font-semibold bg-primary-gradient text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                style={{ display: 'none' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} />
                    Save & Pay Now
                  </>
                )}
              </button>
              {/* Payment Link Button */}
              <a
                href={selectedCategory === '5K' ? 'https://rzp.io/rzp/5k-salute' : 'https://rzp.io/rzp/10k-salute'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-8 py-3 rounded-full font-semibold bg-primary-gradient text-white hover:scale-105 transition-transform flex items-center gap-2 justify-center text-center"
                style={{ minWidth: 200 }}
              >
                <CreditCard size={20} />
                Save & Pay Now
              </a>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div
      ref={modalRef}
      id="registration-modal"
      className="modal fixed inset-0 z-[2000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="modal-content bg-background-white p-8 rounded-[20px] w-full max-w-4xl relative animate-modal-slide-in shadow-heavy max-h-[90vh] overflow-y-auto">
        <button
          className="absolute right-6 top-6 text-2xl cursor-pointer text-text-gray transition-all duration-300 hover:text-text-dark hover:scale-110"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="mb-8">
          <h2 className="font-poppins text-3xl font-bold text-text-dark mb-2">Register for Salute Marathon</h2>
          <div className="flex items-center justify-between">
            <p className="text-text-gray">Step {currentStep} of 4</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    step <= currentStep ? 'bg-primary-purple' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}
        </form>
      </div>
    </div>
  )
}
