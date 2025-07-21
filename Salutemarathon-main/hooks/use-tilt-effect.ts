"use client"

import { useRef, useEffect } from "react"

export function useTiltEffect<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = currentRef.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      const rotateX = (mouseY / rect.height) * 20
      const rotateY = (mouseX / rect.width) * 20

      currentRef.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
    }

    const handleMouseLeave = () => {
      currentRef.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    }

    currentRef.addEventListener("mouseenter", handleMouseEnter)
    currentRef.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      currentRef.removeEventListener("mouseenter", handleMouseEnter)
      currentRef.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return ref
}
