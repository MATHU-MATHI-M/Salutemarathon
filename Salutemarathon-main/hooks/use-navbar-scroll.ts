"use client"

import { useEffect, useState } from "react"

export function useNavbarScroll() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (scrollTop > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      if (scrollTop > lastScrollTop && scrollTop > 200) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollTop(scrollTop)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollTop])

  return { scrolled, hidden }
}
