"use client"
import { useAnimateOnScroll } from "@/hooks/use-intersection-observer"
import { useTiltEffect } from "@/hooks/use-tilt-effect"

export function PartnersSection() {
  const sectionHeaderRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")
  const titlePartnerRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")
  const goldPartnersRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")
  const silverPartnersRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")

  const tiltRef1 = useTiltEffect<HTMLDivElement>()
  const tiltRef2 = useTiltEffect<HTMLDivElement>()
  const tiltRef3 = useTiltEffect<HTMLDivElement>()
  const tiltRef4 = useTiltEffect<HTMLDivElement>()
  const tiltRef5 = useTiltEffect<HTMLDivElement>()
  const tiltRef6 = useTiltEffect<HTMLDivElement>()

  return (
    <section id="partners" className="partners section bg-background-white py-24 relative">
      <div className="container mx-auto px-8">
        <div ref={sectionHeaderRef} className="section-header text-center mb-16 animate-fade-in-up">
          <div className="section-badge bg-primary-gradient text-text-light px-6 py-2 rounded-[50px] text-sm font-semibold uppercase tracking-wider mb-6 inline-block animate-fade-in-down">
            Partnership
          </div>
          <h2 className="section-title font-poppins text-5xl font-extrabold text-text-dark mb-6 leading-tight animate-fade-in-up">
            Our Valued Partners
          </h2>
          <p className="section-subtitle text-xl text-text-gray max-w-[700px] mx-auto leading-relaxed animate-fade-in-up">
            Supporting our mission for women safety and drug awareness
          </p>
        </div>
        {/* Gold Sponsor Section */}
        <div className="flex flex-col items-center justify-center my-12">
          <h3 className="font-poppins text-2xl font-bold text-text-dark mb-6">Gold Sponsor</h3>
          <div className="flex flex-col items-center">
            <div className="flex items-end justify-center min-h-[90px]">
              <img src="/7.jpg" alt="Gold Sponsor Logo" className="max-h-[80px] w-auto object-contain mb-2" />
            </div>
          </div>
        </div>
        {/* Valuable Partners Section */}
        <div className="flex flex-col items-center justify-center my-12">
          <h3 className="font-poppins text-2xl font-bold text-text-dark mb-6">Our Valuable Partners</h3>
          <div className="flex flex-row justify-center items-end gap-8 w-full max-w-4xl">
            {/* Technical partner */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div className="flex items-end justify-center min-h-[90px]">
                <img src="/5.jpg" alt="Technical Partner Logo" className="max-h-[80px] w-auto object-contain mb-2" />
              </div>
              <span className="font-semibold text-text-dark text-lg text-center mt-2">Technical partner</span>
            </div>
            {/* Designing partner */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div className="flex items-end justify-center min-h-[90px]">
                <img src="/8.png" alt="Designing Partner Logo" className="max-h-[80px] w-auto object-contain mb-2" />
              </div>
              <span className="font-semibold text-text-dark text-lg text-center mt-2">Designing partner</span>
            </div>
            {/* Energy partner */}
            <div className="flex flex-col items-center flex-1 min-w-0">
              <div className="flex items-end justify-center min-h-[90px]">
                <img src="/3.png" alt="Energy Partner Logo" className="max-h-[80px] w-auto object-contain mb-2" />
              </div>
              <span className="font-semibold text-text-dark text-lg text-center mt-2">Energy partner</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
