import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import ArticleCard from "./ArticleCard";

interface ProjectsAnimatedContainerProps {
	projects?: any[];
	articles?: any[];
}

export default function AnimatedStaggeredContainerCards({
	projects,
	articles,
}: ProjectsAnimatedContainerProps) {
	const elementsRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const container = elementsRef.current;
			if (!container) return;

			gsap.registerPlugin(ScrollTrigger);

			// Hijos directos: no depende del markup interno de las cards
			const items = container.querySelectorAll(":scope > *");
			if (!items.length) return;

			gsap.fromTo(
				items,
				{ autoAlpha: 0, y: 24 },
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.6,
					ease: "power2.out",
					stagger: 0.1,
					scrollTrigger: {
						trigger: container,
						start: "top 85%",
						toggleActions: "play none none none",
					},
				}
			);
		},
		{ scope: elementsRef }
	);

	return (
		<div
			ref={elementsRef}
			className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
		>
			{projects?.map((project, index) => (
				<ProjectCard key={project.slug ?? index} {...project} />
			))}

			{articles?.map((article, index) => (
				<ArticleCard key={article.slug ?? index} {...article} />
			))}
		</div>
	);
}