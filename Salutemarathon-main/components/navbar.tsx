"use client"

import { useState } from "react"
import Link from "next/link"
import { MonitorIcon as Running } from "lucide-react"
import { useNavbarScroll } from "@/hooks/use-navbar-scroll"

export function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrolled, hidden } = useNavbarScroll()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav
      id="navbar"
      className={`navbar fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl z-[1000] transition-all duration-400 ease-DEFAULT border-b border-primary-purple/10 ${scrolled ? "scrolled bg-white/98 shadow-medium" : ""} ${hidden ? "translate-y-[-100%]" : "translate-y-0"}`}
    >
      <div className="nav-container flex justify-between items-center px-4 py-1 max-w-[1400px] mx-auto md:px-8">
        <Link
          href="#home"
          className="nav-logo flex items-center gap-3 font-poppins font-extrabold text-text-dark text-xl"
        >
          <img src="/1.png" alt="Salute Marathon Logo" className="logo-icon" style={{ width: 80, height: 80, maxHeight: 200, objectFit: 'contain', background: 'none', borderRadius: 0, display: 'block', padding: 0, margin: 0 }} />
          <span>SALUTE MARATHON</span>
        </Link>
        <ul
          className={`nav-menu flex list-none gap-8 md:flex ${isMenuOpen ? "active fixed left-0 top-[80px] flex-col bg-white w-full text-center shadow-medium py-8 gap-6" : "hidden md:flex"}`}
        >
          <li>
            <Link
              href="#home"
              onClick={closeMenu}
              className="relative py-3 text-text-dark font-semibold transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-y-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary-gradient after:transition-all after:duration-400 after:ease-DEFAULT after:rounded-sm hover:after:w-full"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              onClick={closeMenu}
              className="relative py-3 text-text-dark font-semibold transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-y-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary-gradient after:transition-all after:duration-400 after:ease-DEFAULT after:rounded-sm hover:after:w-full"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#video"
              onClick={closeMenu}
              className="relative py-3 text-text-dark font-semibold transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-y-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary-gradient after:transition-all after:duration-400 after:ease-DEFAULT after:rounded-sm hover:after:w-full"
            >
              Video
            </Link>
          </li>
          <li>
            <Link
              href="#register"
              onClick={closeMenu}
              className="relative py-3 text-text-dark font-semibold transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-y-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary-gradient after:transition-all after:duration-400 after:ease-DEFAULT after:rounded-sm hover:after:w-full"
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              href="#rules"
              onClick={closeMenu}
              className="relative py-3 text-text-dark font-semibold transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-y-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary-gradient after:transition-all after:duration-400 after:ease-DEFAULT after:rounded-sm hover:after:w-full"
            >
              Rules
            </Link>
          </li>
          <li>
            <Link
              href="#partners"
              onClick={closeMenu}
              className="relative py-3 text-text-dark font-semibold transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-y-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary-gradient after:transition-all after:duration-400 after:ease-DEFAULT after:rounded-sm hover:after:w-full"
            >
              Partners
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              onClick={closeMenu}
              className="relative py-3 text-text-dark font-semibold transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-y-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary-gradient after:transition-all after:duration-400 after:ease-DEFAULT after:rounded-sm hover:after:w-full"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="#faq"
              onClick={closeMenu}
              className="relative py-3 text-text-dark font-semibold transition-all duration-400 ease-DEFAULT hover:text-primary-purple hover:translate-y-[-2px] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[3px] after:bg-primary-gradient after:transition-all after:duration-400 after:ease-DEFAULT after:rounded-sm hover:after:w-full"
            >
              FAQ
            </Link>
          </li>
        </ul>
        <div className="nav-cta hidden md:block">
          <button
            onClick={onOpenModal} // Changed from Link to button and added onClick
            className="register-btn relative overflow-hidden bg-primary-gradient text-text-light px-8 py-3 rounded-[50px] text-decoration-none font-bold transition-all duration-400 ease-DEFAULT shadow-light animate-glow hover:translate-y-[-3px] hover:shadow-heavy hover:animate-none before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:transition-all before:duration-400 before:ease-DEFAULT hover:before:left-full"
          >
            Register Now
          </button>
        </div>
        <div className="hamburger flex-col cursor-pointer p-2 md:hidden" onClick={toggleMenu}>
          <span className="w-[25px] h-[3px] bg-text-dark my-[3px] transition-all duration-400 ease-DEFAULT rounded-sm"></span>
          <span className="w-[25px] h-[3px] bg-text-dark my-[3px] transition-all duration-400 ease-DEFAULT rounded-sm"></span>
          <span className="w-[25px] h-[3px] bg-text-dark my-[3px] transition-all duration-400 ease-DEFAULT rounded-sm"></span>
        </div>
      </div>
    </nav>
  )
}
