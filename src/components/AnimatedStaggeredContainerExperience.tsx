import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useRef } from "react"
import ExperienceEvent from "./ExperienceEvent"


interface ProjectsAnimatedContainerProps {
    experience: any[]
}

export default function ProjectsAnimatedContainer({ experience }: ProjectsAnimatedContainerProps) {
    const eventRef = useRef<HTMLOListElement>(null)
    
    useGSAP(() => {
        if (!eventRef.current) return
        gsap.registerPlugin(ScrollTrigger)
        const items = eventRef.current.querySelectorAll("div")
        gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.2,
            scrollTrigger: {
            trigger: eventRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
            }
        }
        )
  }, [])

  return (
    <ol
      ref={eventRef}
      className="relative border-s border-neutral-700"
    >
      {experience.map((event, index) => (
        <ExperienceEvent key={index} {...event} />
      ))}
    </ol>
  )
}
