import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import { useRef } from "react"
import ProjectCard from "./ProjectCard"


interface ProjectsAnimatedContainerProps {
  projects: any[]
}

export default function ProjectsAnimatedContainer({ projects }: ProjectsAnimatedContainerProps) {
    const projectsRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        if (!projectsRef.current) return
        gsap.registerPlugin(ScrollTrigger)
        const items = projectsRef.current.querySelectorAll("div.select-none") // cada card
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
            trigger: projectsRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
            }
        }
        )
  }, [])

  return (
    <section
      ref={projectsRef}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
    >
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </section>
  )
}
