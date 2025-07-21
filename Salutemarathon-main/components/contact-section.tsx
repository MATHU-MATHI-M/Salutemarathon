"use client"

import type React from "react"
import { useState } from "react"
import { useAnimateOnScroll } from "@/hooks/use-intersection-observer"
import { useTiltEffect } from "@/hooks/use-tilt-effect"
import { Phone, Send } from "lucide-react"

export function ContactSection() {
  const sectionHeaderRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")
  const contactInfoRef = useAnimateOnScroll<HTMLDivElement>("slide-in-left")
  const contactFormRef = useAnimateOnScroll<HTMLDivElement>("slide-in-right")

  const organizerCard1Ref = useTiltEffect<HTMLDivElement>()
  const organizerCard2Ref = useTiltEffect<HTMLDivElement>()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Form submitted:", formData)
      setSuccessMessage("Thank you for your message! We will get back to you soon.")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSuccessMessage(null), 5000)
      // In a real application, you would send this data to a backend API
    }
  }

  return (
    <section id="contact" className="contact section bg-background-light py-24">
      <div className="container mx-auto px-8">
        <div ref={sectionHeaderRef} className="section-header text-center mb-16 animate-fade-in-up">
          <div className="section-badge bg-primary-gradient text-text-light px-6 py-2 rounded-[50px] text-sm font-semibold uppercase tracking-wider mb-6 inline-block animate-fade-in-down">
            Get In Touch
          </div>
          <h2 className="section-title font-poppins text-5xl font-extrabold text-text-dark mb-6 leading-tight animate-fade-in-up">
            Contact Our Team
          </h2>
          <p className="section-subtitle text-xl text-text-gray max-w-[700px] mx-auto leading-relaxed animate-fade-in-up">
            Have questions? We&apos;re here to help you join the movement
          </p>
        </div>
        <div className="contact-content grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div ref={contactInfoRef} className="contact-info animate-slide-in-left text-center lg:text-left">
            <h3 className="font-poppins text-4xl font-bold text-text-dark mb-8">Event Organizers</h3>
            <div
              ref={organizerCard1Ref}
              className="organizer-card tilt-effect bg-background-white p-10 rounded-[20px] transition-all duration-400 ease-DEFAULT border-2 border-transparent mb-8 relative overflow-hidden w-full max-w-[400px] mx-auto lg:mx-0 hover:translate-y-[-5px] hover:scale-102 hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary-purple/5 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
            >
              <div className="organizer-name font-poppins text-xl font-bold text-text-dark mb-2">
                MJF Lion Manoj Seeralan
              </div>
              <div className="organizer-title text-text-gray mb-4 font-semibold">Chairman - Salute Marathon</div>
              <a
                href="tel:9884058788"
                className="contact-link inline-flex items-center gap-3 text-primary-purple text-decoration-none font-bold transition-all duration-400 ease-DEFAULT hover:text-primary-pink hover:translate-x-2"
              >
                <Phone />
                9884058788
              </a>
            </div>
            <div
              ref={organizerCard2Ref}
              className="organizer-card tilt-effect bg-background-white p-10 rounded-[20px] transition-all duration-400 ease-DEFAULT border-2 border-transparent relative overflow-hidden w-full max-w-[400px] mx-auto lg:mx-0 hover:translate-y-[-5px] hover:scale-102 hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary-purple/5 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
            >
              <div className="organizer-name font-poppins text-xl font-bold text-text-dark mb-2">
                Leo Lion Paul Jeevanesan A
              </div>
              <div className="organizer-title text-text-gray mb-4 font-semibold">Co-Chairman - Salute Marathon</div>
              <a
                href="tel:8939565609"
                className="contact-link inline-flex items-center gap-3 text-primary-purple text-decoration-none font-bold transition-all duration-400 ease-DEFAULT hover:text-primary-pink hover:translate-x-2"
              >
                <Phone />
                8939565609
              </a>
            </div>
          </div>
          <div ref={contactFormRef} className="contact-form animate-slide-in-right text-center">
            <h3 className="font-poppins text-4xl font-bold text-text-dark mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-8 relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder=" "
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-6 border-2 ${errors.name ? "border-red-500" : "border-[#e0e0e0]"} rounded-[15px] text-base transition-all duration-400 ease-DEFAULT bg-background-white focus:outline-none focus:border-primary-purple focus:shadow-glow focus:translate-y-[-2px]`}
                />
                <label htmlFor="name">Full Name</label>
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>
              <div className="form-group mb-8 relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder=" "
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-6 border-2 ${errors.email ? "border-red-500" : "border-[#e0e0e0]"} rounded-[15px] text-base transition-all duration-400 ease-DEFAULT bg-background-white focus:outline-none focus:border-primary-purple focus:shadow-glow focus:translate-y-[-2px]`}
                />
                <label htmlFor="email">Email Address</label>
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              <div className="form-group mb-8 relative">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder=" "
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-6 border-2 ${errors.message ? "border-red-500" : "border-[#e0e0e0]"} rounded-[15px] text-base transition-all duration-400 ease-DEFAULT bg-background-white focus:outline-none focus:border-primary-purple focus:shadow-glow focus:translate-y-[-2px]`}
                ></textarea>
                <label htmlFor="message">Your Message</label>
                {errors.message && <div className="error-message">{errors.message}</div>}
              </div>
              <button
                type="submit"
                className="btn btn-primary relative overflow-hidden px-8 py-4 rounded-[50px] text-decoration-none font-bold transition-all duration-400 ease-DEFAULT border-none cursor-pointer inline-flex items-center gap-3 text-lg bg-primary-gradient text-text-light shadow-light hover:translate-y-[-3px] hover:scale-105 hover:shadow-heavy before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
              >
                <Send />
                Send Message
              </button>
            </form>
            {successMessage && (
              <div className="fixed top-5 right-5 bg-accent-green text-white px-8 py-4 rounded-xl z-[9999] animate-slide-in-right shadow-heavy font-semibold">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
