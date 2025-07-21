"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react"

export function Footer() {
  const scrollToTopBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollToTopBtnRef.current) {
        if (window.pageYOffset > 300) {
          scrollToTopBtnRef.current.style.opacity = "1"
          scrollToTopBtnRef.current.style.visibility = "visible"
          scrollToTopBtnRef.current.style.transform = "translateY(0)"
        } else {
          scrollToTopBtnRef.current.style.opacity = "0"
          scrollToTopBtnRef.current.style.visibility = "hidden"
          scrollToTopBtnRef.current.style.transform = "translateY(100px)"
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const shareOnSocialMedia = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent("Join Salute Marathon 2025 - Women Safety & Drug Awareness")
    const text = encodeURIComponent(
      "Be part of the movement for women safety and drug awareness. Every step towards safety!",
    )

    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`
        break
      default:
        break
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <footer className="footer bg-text-dark text-text-light py-16 pb-8 relative overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-primary-gradient">
      <div className="container mx-auto px-8">
        <div className="footer-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="footer-section">
            <h4 className="font-poppins text-2xl font-bold mb-6 text-text-light">Salute Marathon</h4>
            <p className="text-white/80 leading-relaxed mb-6">
              Every Step Towards Safety - Join the movement for women safety and drug awareness in Chennai.
            </p>
            <div className="social-links flex gap-4 mt-6">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  shareOnSocialMedia("facebook")
                }}
                className="w-[50px] h-[50px] bg-white/10 rounded-full flex items-center justify-center text-text-light transition-all duration-400 ease-DEFAULT hover:bg-primary-purple hover:translate-y-[-3px] hover:scale-110"
              >
                <Facebook />
              </a>
              <a
                href="#"
                className="w-[50px] h-[50px] bg-white/10 rounded-full flex items-center justify-center text-text-light transition-all duration-400 ease-DEFAULT hover:bg-primary-purple hover:translate-y-[-3px] hover:scale-110"
              >
                <Instagram />
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  shareOnSocialMedia("twitter")
                }}
                className="w-[50px] h-[50px] bg-white/10 rounded-full flex items-center justify-center text-text-light transition-all duration-400 ease-DEFAULT hover:bg-primary-purple hover:translate-y-[-3px] hover:scale-110"
              >
                <Twitter />
              </a>
              <a
                href="#"
                className="w-[50px] h-[50px] bg-white/10 rounded-full flex items-center justify-center text-text-light transition-all duration-400 ease-DEFAULT hover:bg-primary-purple hover:translate-y-[-3px] hover:scale-110"
              >
                <Youtube />
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  shareOnSocialMedia("linkedin")
                }}
                className="w-[50px] h-[50px] bg-white/10 rounded-full flex items-center justify-center text-text-light transition-all duration-400 ease-DEFAULT hover:bg-primary-purple hover:translate-y-[-3px] hover:scale-110"
              >
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h4 className="font-poppins text-2xl font-bold mb-6 text-text-light">Our Mission</h4>
            <ul>
              <li>
                <Link
                  href="#"
                  className="text-white/80 text-decoration-none transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-x-2"
                >
                  Women Safety Initiative
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 text-decoration-none transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-x-2"
                >
                  Drug Awareness Campaign
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 text-decoration-none transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-x-2"
                >
                  Community Engagement
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 text-decoration-none transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-x-2"
                >
                  Safety Education
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="font-poppins text-2xl font-bold mb-6 text-text-light">Event Info</h4>
            <ul>
              <li>Date: August 9, 2025</li>
              <li>Time: 5:00 AM - 7:30 AM</li>
              <li>Venue: Island Grounds, Chennai</li>
              <li>5K: ₹333 | 10K: ₹555</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="font-poppins text-2xl font-bold mb-6 text-text-light">Support</h4>
            <ul>
              <li>
                <Link
                  href="#contact"
                  className="text-white/80 text-decoration-none transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-x-2"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#rules"
                  className="text-white/80 text-decoration-none transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-x-2"
                >
                  Rules & Regulations
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-white/80 text-decoration-none transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-x-2"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white/80 text-decoration-none transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-x-2"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-sm opacity-80">
              Website created by{" "}
              <a
                href="https://studaiworks.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-purple text-decoration-none"
              >
                StudAI Works
              </a>
            </p>
          </div>
        </div>
        <div className="footer-bottom text-center pt-8 border-t border-white/10 text-white/70">
          <p>&copy; 2025 Salute Marathon. All rights reserved. | Women Safety • Drug Awareness • Community Action</p>
        </div>
      </div>

      <button
        ref={scrollToTopBtnRef}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-[50px] h-[50px] bg-primary-gradient text-white border-none rounded-full cursor-pointer text-xl z-[1000] transition-all duration-400 ease-DEFAULT opacity-0 invisible translate-y-[100px] shadow-medium hover:translate-y-[-5px] hover:scale-110 hover:shadow-glow"
      ></button>
    </footer>
  )
}
