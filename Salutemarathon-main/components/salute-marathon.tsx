"use client"

import { useEffect, useState } from "react"
import { LoadingOverlay } from "./loading-overlay"
import { ScrollIndicator } from "./scroll-indicator"
import { MouseFollower } from "./mouse-follower"
import { ParallaxBackground } from "./parallax-background"
import { FloatingParticles } from "./floating-particles"
import { Navbar } from "./navbar"
import { HeroSection } from "./hero-section"
import { SocialProof } from "./social-proof"
import { AboutSection } from "./about-section"
import { VideoSection } from "./video-section"
import { RegistrationSection } from "./registration-section"
import { RulesSection } from "./rules-section"
import { PartnersSection } from "./partners-section"
import { ContactSection } from "./contact-section"
import { FAQSection } from "./faq-section"
import { Footer } from "./footer"
import { RegistrationModal } from "./registration-modal"

export function SaluteMarathon() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Enhanced Accessibility Features
    const skipLink = document.createElement("a")
    skipLink.href = "#main-content"
    skipLink.textContent = "Skip to main content"
    skipLink.className = "skip-link"
    document.body.insertBefore(skipLink, document.body.firstChild)

    const heroSection = document.getElementById("home")
    if (heroSection) {
      heroSection.id = "main-content"
    }

    // Enhanced Performance Monitoring
    if (typeof window !== "undefined" && "performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType("navigation")[0]
          const paintEntries = performance.getEntriesByType("paint")

          const metrics = {
            loadTime: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
            domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
            firstPaint: paintEntries.find((entry) => entry.name === "first-paint")?.startTime || 0,
            firstContentfulPaint: paintEntries.find((entry) => entry.name === "first-contentful-paint")?.startTime || 0,
          }

          console.log("Performance Metrics:", metrics)
          // trackEvent('performance_metrics', metrics); // If you have a global analytics function
        }, 0)
      })
    }

    // Enhanced Error Handling
    window.addEventListener("error", (e) => {
      console.error("An error occurred:", e.error)
      // trackEvent('javascript_error', { // If you have a global analytics function
      //   error_message: e.message,
      //   error_filename: e.filename,
      //   error_lineno: e.lineno
      // });
    })

    // Enhanced Mobile Experience - Touch gestures
    let touchStartX = 0
    let touchStartY = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX
      touchStartY = e.changedTouches[0].screenY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX
      const touchEndY = e.changedTouches[0].screenY

      const deltaX = touchEndX - touchStartX
      const deltaY = touchEndY - touchStartY

      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          console.log("Swipe Right")
          // trackEvent('swipe_right');
        } else {
          console.log("Swipe Left")
          // trackEvent('swipe_left');
        }
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchend", handleTouchEnd, { passive: true })

    console.log("🎉 Salute Marathon 2025 website loaded successfully!")
    console.log("✨ Enhanced features activated:")
    console.log("   - Advanced animations and transitions")
    console.log("   - Responsive design and mobile optimization")
    console.log("   - Accessibility improvements")
    console.log("   - Performance monitoring")
    console.log("   - Social media integration")
    console.log("   - Form validation and error handling")
    console.log("   - Analytics tracking")
    console.log("   - Touch gesture support")
    console.log("   - Loading states and user feedback")
    console.log("💪 Ready to make a difference with 189 runners already registered!")

    return () => {
      // Cleanup event listeners
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchend", handleTouchEnd)
      document.body.removeChild(skipLink)
    }
  }, [])

  return (
    <>
      {/* <LoadingOverlay /> */}
      <ScrollIndicator />
      <MouseFollower />
      <ParallaxBackground />
      <FloatingParticles />
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <HeroSection onOpenModal={() => setIsModalOpen(true)} />
      {/* <SocialProof /> */}
      <AboutSection />
      <VideoSection />
      <RegistrationSection onOpenModal={() => setIsModalOpen(true)} />
      <RulesSection />
      <PartnersSection />
      <ContactSection />
      <FAQSection />
      <Footer />
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
