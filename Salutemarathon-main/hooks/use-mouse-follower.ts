"use client"

import { useEffect, useRef } from "react"

export function useMouseFollower<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const handleMouseMove = (e: MouseEvent) => {
      currentRef.style.left = `${e.clientX}px`
      currentRef.style.top = `${e.clientY}px`
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return ref
}
