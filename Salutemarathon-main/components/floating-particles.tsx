import { useParticles } from "@/hooks/use-particles"

export function FloatingParticles() {
  const particlesRef = useParticles<HTMLDivElement>()

  return (
    <div
      ref={particlesRef}
      id="particles"
      className="floating-particles fixed inset-0 w-full h-full pointer-events-none z-[-1]"
    ></div>
  )
}
