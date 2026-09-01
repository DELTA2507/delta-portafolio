import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import ScrollTrigger from "gsap/ScrollTrigger"

interface AnimatedTitleProps {
  title: string
  description: string
  icon: string
  className?: string
}

export default function AnimatedHeading({ title, description, icon, className }: AnimatedTitleProps) {
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
    <div className={`flex flex-col gap-2 py-10 ${className}`}>
      <h1 ref={titleRef} className="flex items-center gap-2 m-0 text-text">
        <i className={`fa-solid ${icon} text-accent`} aria-hidden="true" />
        <span>{title}</span>
      </h1>

      {description && (
        <p className="text-text-muted text-base m-0">
          {description}
        </p>
      )}
    </div>
  )
}