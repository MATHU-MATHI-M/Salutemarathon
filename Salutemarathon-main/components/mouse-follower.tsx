import { useMouseFollower } from "@/hooks/use-mouse-follower"

export function MouseFollower() {
  const mouseFollowerRef = useMouseFollower<HTMLDivElement>()

  return (
    <div
      ref={mouseFollowerRef}
      id="mouse-follower"
      className="fixed w-5 h-5 bg-primary-purple/30 rounded-full pointer-events-none mix-blend-difference z-[9998] transition-transform duration-100 ease-in-out"
    ></div>
  )
}
