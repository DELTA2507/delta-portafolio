import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useRef } from "react"
import ProjectCard from "./ProjectCard"


interface ProyectsAnimatedContainerProps {
    proyects: any[]
}

export default function ProyectsAnimatedContainer({ proyects }: ProyectsAnimatedContainerProps) {
    const proyectRef = useRef<HTMLDivElement>(null)
    
    useGSAP(() => {
        if (!proyectRef.current) return
        gsap.registerPlugin(ScrollTrigger)
        const items = proyectRef.current.querySelectorAll("div.select-none") // cada card
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
            trigger: proyectRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
            }
        }
        )
  }, [])

  return (
    <section
      ref={proyectRef}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
    >
      {proyects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </section>
  )
}
