"use client"

import type React from "react"
import { useState } from "react"
import { useAnimateOnScroll } from "@/hooks/use-intersection-observer"
import { useTiltEffect } from "@/hooks/use-tilt-effect"
import { ChevronDown } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  const tiltRef = useTiltEffect<HTMLDivElement>()
  const itemRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")

  return (
    <div
      ref={itemRef}
      className={`faq-item bg-background-light rounded-[20px] mb-8 overflow-hidden shadow-light transition-all duration-400 ease-DEFAULT border-2 border-transparent ${isOpen ? "active" : ""} hover:shadow-medium hover:border-primary-purple`}
    >
      <div
        ref={tiltRef}
        className="faq-question p-8 cursor-pointer flex justify-between items-center bg-background-white border-2 border-transparent transition-all duration-400 ease-DEFAULT relative overflow-hidden hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-primary-purple/5 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
        onClick={onClick}
      >
        <h3 className="font-poppins text-xl font-semibold text-text-dark m-0 transition-all duration-400 ease-DEFAULT hover:text-primary-purple">
          {question}
        </h3>
        <ChevronDown
          className={`faq-icon text-primary-purple text-2xl transition-all duration-400 ease-DEFAULT ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      <div
        className={`faq-answer px-8 max-h-0 overflow-hidden transition-all duration-400 ease-DEFAULT ${isOpen ? "max-h-[500px] pb-8" : ""}`}
      >
        <p className="text-text-gray leading-relaxed text-lg">{answer}</p>
      </div>
    </div>
  )
}

export function FAQSection() {
  const sectionHeaderRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is the Salute Marathon about?",
      answer:
        "The Salute Marathon is a community-driven event focused on raising awareness about women's safety and drug prevention. It's more than just a race - it's a movement that brings together people from all walks of life to champion these important social causes through the power of sports and collective action.",
    },
    {
      question: "When and where is the event taking place?",
      answer:
        "The Salute Marathon will take place on August 9, 2025, at Island Grounds, Chennai. The event starts at 5:00 AM. The entire event concludes by 7:30 AM.",
    },
    {
      question: "What are the registration fees?",
      answer:
        "Registration fees are ₹333 for the 5K race and ₹555 for the 10K race. Both packages include a race kit, finisher medal, digital certificate, refreshments, and breakfast.",
    },
    {
      question: "What is included in the race kit?",
      answer:
        "Your race kit includes a high-quality dry-fit t-shirt with safety messaging, a race bib with your number, a finisher medal, digital participation certificate, hydration and electrolyte drinks, energy snacks, post-race breakfast, and access to medical support throughout the event.",
    },
    {
      question: "Can I change my race category after registration?",
      answer:
        "Category changes are allowed up to 7 days before the event, subject to availability and payment of any price difference. Please contact our organizers at the numbers provided to make changes to your registration.",
    },
    {
      question: "Is there a time limit for completing the race?",
      answer:
        "Yes, there is a time limit of 45 minutes for the 5K race and 75 minutes for the 10K race. This ensures the safety of all participants and allows for proper event management. Medical support will be available throughout the duration.",
    },
    {
      question: "What should I bring on race day?",
      answer:
        "Please bring a valid government-issued photo ID, your registration confirmation, and wear comfortable running attire. Though hydration stations will be available along the route. Avoid bringing valuables as storage facilities are limited.",
    },
    {
      question: "Are there any medical facilities available?",
      answer:
        "Yes, we have comprehensive medical support including qualified doctors, paramedics, and first aid stations along the route. Ambulances will be stationed at key points. If you have any pre-existing medical conditions, please inform us during registration.",
    },
    {
      question: "What is the refund policy?",
      answer:
        "Registration fees are non-refundable once confirmed. However, in case of event cancellation due to unforeseen circumstances, full refunds will be processed within 10-15 working days. Transfer to another person is allowed up to 7 days before the event.",
    },
    {
      question: "How can I track my race results?",
      answer:
        "All participants will receive digital certificates. Race results will be published on our official website and social media channels within 48 hours of the event. You can also track your performance through our mobile app (details provided in your race kit).",
    },
  ]

  const handleQuestionClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="faq section bg-background-white py-24 relative">
      <div className="container mx-auto px-8">
        <div ref={sectionHeaderRef} className="section-header text-center mb-16 animate-fade-in-up">
          <div className="section-badge bg-primary-gradient text-text-light px-6 py-2 rounded-[50px] text-sm font-semibold uppercase tracking-wider mb-6 inline-block animate-fade-in-down">
            Help Center
          </div>
          <h2 className="section-title font-poppins text-5xl font-extrabold text-text-dark mb-6 leading-tight animate-fade-in-up">
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle text-xl text-text-gray max-w-[700px] mx-auto leading-relaxed animate-fade-in-up">
            Find answers to common questions about the Salute Marathon
          </p>
        </div>
        <div className="faq-container max-w-[1000px] mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleQuestionClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
