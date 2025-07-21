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
        <div className="flex flex-row justify-between items-end gap-4 md:gap-0 mt-12">
          {/* Sponsor 1 */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="flex items-end justify-center min-h-[90px]">
              <img src="/7.jpg" alt="Sponsor 1 Logo" className="max-h-[80px] w-auto object-contain mb-2" />
            </div>
            <span className="font-semibold text-text-dark text-lg text-center mt-2">Gold sponsor</span>
          </div>
          {/* Sponsor 2 */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="flex items-end justify-center min-h-[90px]">
              <img src="/5.jpg" alt="Sponsor 2 Logo" className="max-h-[80px] w-auto object-contain mb-2" />
            </div>
            <span className="font-semibold text-text-dark text-lg text-center mt-2">Technical partner</span>
          </div>
          {/* Spacer between 2nd and 3rd logo */}
          <div className="hidden md:block" style={{ width: 48 }}></div>
          {/* Sponsor 3 */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="flex items-end justify-center min-h-[90px]">
              <img src="/8.png" alt="Sponsor 3 Logo" className="max-h-[80px] w-auto object-contain mb-2" />
            </div>
            <span className="font-semibold text-text-dark text-lg text-center mt-2">Designing partner</span>
          </div>
          {/* Sponsor 4 */}
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div className="flex items-end justify-center min-h-[90px]">
              <img src="/3.png" alt="Sponsor 4 Logo" className="max-h-[80px] w-auto object-contain mb-2" />
            </div>
            <span className="font-semibold text-text-dark text-lg text-center mt-2">Energy partner</span>
          </div>
        </div>
      </div>
    </section>
  )
}
