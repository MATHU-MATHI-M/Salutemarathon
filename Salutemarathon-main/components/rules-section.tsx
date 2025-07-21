"use client"
import { useAnimateOnScroll } from "@/hooks/use-intersection-observer"
import { useTiltEffect } from "@/hooks/use-tilt-effect"
import { UserCheck, TriangleAlert, CheckCircle } from "lucide-react"

export function RulesSection() {
  const sectionHeaderRef = useAnimateOnScroll<HTMLDivElement>("fade-in-up")
  const rulesCategory1Ref = useAnimateOnScroll<HTMLDivElement>("slide-in-left")
  const rulesCategory2Ref = useAnimateOnScroll<HTMLDivElement>("slide-in-right")

  const tiltRef1 = useTiltEffect<HTMLDivElement>()
  const tiltRef2 = useTiltEffect<HTMLDivElement>()

  return (
    <section id="rules" className="rules section bg-background-light py-24 relative">
      <div className="container mx-auto px-8">
        <div ref={sectionHeaderRef} className="section-header text-center mb-16 animate-fade-in-up">
          <div className="section-badge bg-primary-gradient text-text-light px-6 py-2 rounded-[50px] text-sm font-semibold uppercase tracking-wider mb-6 inline-block animate-fade-in-down">
            Important Information
          </div>
          <h2 className="section-title font-poppins text-5xl font-extrabold text-text-dark mb-6 leading-tight animate-fade-in-up">
            Rules & Regulations
          </h2>
          <p className="section-subtitle text-xl text-text-gray max-w-[700px] mx-auto leading-relaxed animate-fade-in-up">
            Please read these carefully before participating in the marathon
          </p>
        </div>
        <div className="rules-content grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div
            ref={tiltRef1}
            className="rules-category tilt-effect bg-background-white p-12 rounded-[25px] shadow-light border-2 border-transparent transition-all duration-400 ease-DEFAULT relative overflow-hidden hover:translate-y-[-5px] hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[5px] before:bg-primary-gradient before:scale-x-0 before:transition-all before:duration-400 before:ease-DEFAULT hover:before:scale-x-100"
          >
            <h3 className="font-poppins text-3xl font-bold text-text-dark mb-8 flex items-center gap-4">
              <UserCheck className="text-primary-purple transition-all duration-400 ease-DEFAULT group-hover:scale-110 group-hover:rotate-10" />
              Eligibility & Registration
            </h3>
            <ul className="rules-list list-none p-0">
              <li className="mb-6 flex items-start gap-4 transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                <CheckCircle className="text-primary-purple text-xl mt-1 transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                <div>
                  <strong className="text-text-dark font-semibold">Age Requirements:</strong> Minimum age 14 years for
                  5K, 14 years for 10K. Participants under 18 must have signed parental consent form.
                </div>
              </li>
              <li className="mb-6 flex items-start gap-4 transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                <CheckCircle className="text-primary-purple text-xl mt-1 transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                <div>
                  <strong className="text-text-dark font-semibold">Medical Fitness:</strong> All participants must be
                  medically fit to run. Those with heart conditions, diabetes, or other chronic illnesses must provide
                  medical clearance.
                </div>
              </li>
              <li className="mb-6 flex items-start gap-4 transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                <CheckCircle className="text-primary-purple text-xl mt-1 transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                <div>
                  <strong className="text-text-dark font-semibold">Registration Deadline:</strong> Registration closes
                  48 hours before the event. No on-spot registrations accepted due to limited capacity.
                </div>
              </li>
              <li className="mb-6 flex items-start gap-4 transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                <CheckCircle className="text-primary-purple text-xl mt-1 transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                <div>
                  <strong className="text-text-dark font-semibold">Identity Verification:</strong> Valid
                  government-issued photo ID required for race kit collection and event entry.
                </div>
              </li>
              <li className="mb-6 flex items-start gap-4 transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                <CheckCircle className="text-primary-purple text-xl mt-1 transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                <div>
                  <strong className="text-text-dark font-semibold">Transfer Policy:</strong> Registration can be
                  transferred to another person up to 72 hours before the event with proper documentation.
                </div>
              </li>
            </ul>
          </div>
          <div
            ref={tiltRef2}
            className="rules-category tilt-effect bg-background-white p-12 rounded-[25px] shadow-light border-2 border-transparent transition-all duration-400 ease-DEFAULT relative overflow-hidden hover:translate-y-[-5px] hover:shadow-heavy hover:border-primary-purple before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[5px] before:bg-primary-gradient before:scale-x-0 before:transition-all before:duration-400 before:ease-DEFAULT hover:before:scale-x-100"
          >
            <h3 className="font-poppins text-3xl font-bold text-text-dark mb-8 flex items-center gap-4">
              <TriangleAlert className="text-primary-purple transition-all duration-400 ease-DEFAULT group-hover:scale-110 group-hover:rotate-10" />
              Race Day Guidelines
            </h3>
            <ul className="rules-list list-none p-0">
              <li className="mb-6 flex items-start gap-4 transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                <CheckCircle className="text-primary-purple text-xl mt-1 transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                <div>
                  <strong className="text-text-dark font-semibold">Reporting Time:</strong> Participants must report 45
                  minutes before their race start time. Late arrivals will not be permitted to start.
                </div>
              </li>
              <li className="mb-6 flex items-start gap-4 transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                <CheckCircle className="text-primary-purple text-xl mt-1 transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                <div>
                  <strong className="text-text-dark font-semibold">Race Route:</strong> Stay on designated route marked
                  by cones and marshals. Short-cutting results in immediate disqualification.
                </div>
              </li>
              <li className="mb-6 flex items-start gap-4 transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                <CheckCircle className="text-primary-purple text-xl mt-1 transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                <div>
                  <strong className="text-text-dark font-semibold">Time Limits:</strong> 45 minutes for 5K, 75 minutes
                  for 10K. Support vehicles will sweep the course after these times.
                </div>
              </li>
              <li className="mb-6 flex items-start gap-4 transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                <CheckCircle className="text-primary-purple text-xl mt-1 transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                <div>
                  <strong className="text-text-dark font-semibold">Safety Protocol:</strong> Follow all marshal
                  instructions. Report injuries immediately. Emergency medical support available throughout the route.
                </div>
              </li>
              <li className="mb-6 flex items-start gap-4 transition-all duration-400 ease-DEFAULT p-2 rounded-lg hover:bg-primary-purple/5 hover:translate-x-2">
                <CheckCircle className="text-primary-purple text-xl mt-1 transition-all duration-400 ease-DEFAULT group-hover:scale-110" />
                <div>
                  <strong className="text-text-dark font-semibold">Environmental Responsibility:</strong> No littering.
                  Use designated water stations and waste disposal points only.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
