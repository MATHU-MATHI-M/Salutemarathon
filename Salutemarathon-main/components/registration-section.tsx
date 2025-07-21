"use client"

import type React from "react"
import { useAnimateOnScroll } from "@/hooks/use-intersection-observer"
import { useTiltEffect } from "@/hooks/use-tilt-effect"
import { Check, MonitorIcon as Running } from "lucide-react"

interface RegistrationSectionProps {
  onOpenModal: () => void
}

export function RegistrationSection({ onOpenModal }: RegistrationSectionProps) {
  const sectionHeaderRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")
  const pricingCardsRef = useAnimateOnScroll<HTMLDivElement>("slide-in-left")
  const registrationFormRef = useAnimateOnScroll<HTMLDivElement>("slide-in-right")

  const pricingCard1Ref = useTiltEffect<HTMLDivElement>()
  const pricingCard2Ref = useTiltEffect<HTMLDivElement>()

  const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onOpenModal()
  }

  return (
    <section id="register" className="registration section bg-background-white py-24 relative">
      <div className="container mx-auto px-8">
        <div ref={sectionHeaderRef} className="section-header text-center mb-16 animate-fade-in-up">
          <div className="section-badge bg-primary-gradient text-text-light px-6 py-2 rounded-[50px] text-sm font-semibold uppercase tracking-wider mb-6 inline-block animate-fade-in-down">
            Join the Movement
          </div>
          <h2 className="section-title font-poppins text-5xl font-extrabold text-text-dark mb-6 leading-tight animate-fade-in-up">
            Register for Change
          </h2>
          <p className="section-subtitle text-xl text-text-gray max-w-[700px] mx-auto leading-relaxed animate-fade-in-up">
            Be part of our mission for women safety and drug awareness
          </p>
        </div>
        {/* Changed from grid to flex-col to stack pricing cards and form */}
        <div className="registration-content flex flex-col items-center gap-20">
          {/* Modified pricing-cards to be a grid for horizontal layout on md screens */}
          <div
            ref={pricingCardsRef}
            className="pricing-cards grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-in-left w-full max-w-[800px]"
          >
            <div
              ref={pricingCard1Ref}
              className="pricing-card tilt-effect bg-background-light p-12 rounded-[25px] border-2 border-transparent transition-all duration-400 ease-DEFAULT relative overflow-hidden hover:border-primary-purple hover:translate-y-[-5px] hover:scale-102 hover:shadow-heavy before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[5px] before:bg-primary-gradient before:scale-x-0 before:transition-all before:duration-400 before:ease-DEFAULT hover:before:scale-x-100 after:content-[''] after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-primary-purple/5 after:to-transparent after:transition-all after:duration-400 after:ease-DEFAULT hover:after:left-full"
            >
              <div className="pricing-category font-poppins text-3xl font-bold text-text-dark mb-4">5K Challenge</div>
              <div className="pricing-amount text-5xl font-extrabold text-primary-pink mb-8 animate-pulse">₹333</div>
              <div className="pricing-features grid gap-4 mb-8">
                <div className="pricing-feature flex items-center gap-4 text-text-gray font-medium transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                  <Check className="text-accent-green text-xl transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                  <span>5 Kilometer distance</span>
                </div>
                <div className="pricing-feature flex items-center gap-4 text-text-gray font-medium transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                  <Check className="text-accent-green text-xl transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                  <span>Safety awareness materials</span>
                </div>
                <div className="pricing-feature flex items-center gap-4 text-text-gray font-medium transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                  <Check className="text-accent-green text-xl transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                  <span>hydration and electrolyte drinks</span>
                </div>
                <div className="pricing-feature flex items-center gap-4 text-text-gray font-medium transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                  <Check className="text-accent-green text-xl transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                  <span>Medal & certificate</span>
                </div>
              </div>
            </div>
            <div
              ref={pricingCard2Ref}
              className="pricing-card tilt-effect bg-background-light p-12 rounded-[25px] border-2 border-transparent transition-all duration-400 ease-DEFAULT relative overflow-hidden hover:border-primary-purple hover:translate-y-[-5px] hover:scale-102 hover:shadow-heavy before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[5px] before:bg-primary-gradient before:scale-x-0 before:transition-all before:duration-400 before:ease-DEFAULT hover:before:scale-x-100 after:content-[''] after:absolute after:top-0 after:left-[-100%] after:w-full after:h-full after:bg-gradient-to-r after:from-transparent after:via-primary-purple/5 after:to-transparent after:transition-all after:duration-400 after:ease-DEFAULT hover:after:left-full"
            >
              <div className="pricing-category font-poppins text-3xl font-bold text-text-dark mb-4">10K Challenge</div>
              <div className="pricing-amount text-5xl font-extrabold text-primary-pink mb-8 animate-pulse">₹555</div>
              <div className="pricing-features grid gap-4 mb-8">
                <div className="pricing-feature flex items-center gap-4 text-text-gray font-medium transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                  <Check className="text-accent-green text-xl transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                  <span>10 Kilometer distance</span>
                </div>
                <div className="pricing-feature flex items-center gap-4 text-text-gray font-medium transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                  <Check className="text-accent-green text-xl transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                  <span>Safety awareness materials</span>
                </div>
                <div className="pricing-feature flex items-center gap-4 text-text-gray font-medium transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                  <Check className="text-accent-green text-xl transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                  <span>hydration and electrolyte drinks</span>
                </div>
                <div className="pricing-feature flex items-center gap-4 text-text-gray font-medium transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                  <Check className="text-accent-green text-xl transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                  <span>Medal & certificate</span>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={registrationFormRef}
            className="registration-form text-center animate-slide-in-right w-full max-w-[500px]"
          >
            <h3 className="font-poppins text-4xl font-bold text-text-dark mb-8">Ready to Make a Difference?</h3>
            <button
              id="open-registration"
              onClick={handleRegisterClick}
              className="btn btn-primary btn-large relative overflow-hidden px-12 py-6 text-decoration-none font-extrabold transition-all duration-400 ease-DEFAULT border-none cursor-pointer inline-flex items-center gap-3 text-xl bg-primary-gradient text-text-light shadow-light animate-[pulse_2s_infinite] hover:translate-y-[-3px] hover:scale-105 hover:shadow-heavy hover:animate-none before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full rounded-[50px]"
            >
              <Running />
              Register Now
            </button>
            <div className="registration-note mt-8 text-text-gray text-base leading-relaxed">
              <p>Secure payment via Razorpay • All major payment methods accepted</p>
              <p>UPI, Cards, Net Banking, and Wallets supported</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
