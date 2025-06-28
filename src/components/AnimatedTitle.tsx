import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import ScrollTrigger from "gsap/ScrollTrigger"

interface AnimatedTitleProps {
  title: string
  icon: string
  className?: string
}

export default function AnimatedTitle({ title, icon, className }: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  
  useGSAP(() => {
    if (!titleRef.current) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.fromTo(
      titleRef.current,
        { 
            x: 30, 
            opacity: 0
        },
        { 
            x: 0, 
            opacity: 1, 
            duration: 0.5, 
            delay: 0.2, 
            ease: "power3.out", 
            scrollTrigger: { 
                trigger: titleRef.current, 
                start: "top 80%", 
                toggleActions: "play none none none"
            } 
        }
    )
  }, [])

  return (
    <h1 ref={titleRef} className={`flex items-center gap-2 py-10 ${className}`}>
      <i className={`fa-solid ${icon} text-secondary`} />
      {title}
    </h1>
  )
}