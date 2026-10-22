import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import ExperienceEvent from "./ExperienceEvent";

interface ExperienceItem {
	id?: string | number;
	role: string;
	place: string;
	placeLogo?: string;
	link?: string;
	date: string;
	stack: string[];
	description: string;
}

interface ExperienceAnimatedContainerProps {
	experience: ExperienceItem[];
}

export default function AnimatedStaggeredContainerExperience({
	experience,
}: ExperienceAnimatedContainerProps) {
	const eventRef = useRef<HTMLOListElement>(null);

	useGSAP(
		() => {
			const list = eventRef.current;
			if (!list) return;

			gsap.registerPlugin(ScrollTrigger);

			const items = list.querySelectorAll(":scope > li");
			if (!items.length) return;

			gsap.fromTo(
				items,
				{ autoAlpha: 0, y: 18 },
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.55,
					stagger: 0.12,
					ease: "power2.out",
					scrollTrigger: {
						trigger: list,
						start: "top 80%",
						toggleActions: "play none none none",
					},
				}
			);
		},
		{ scope: eventRef }
	);

	return (
		<ol
			ref={eventRef}
			className={[
				"relative m-0 list-none p-0",
				// Línea única: arranca bajo el primer triángulo
				"before:absolute before:start-[7.5px]",
				"before:top-6 before:bottom-0",
				"before:w-px before:bg-border before:content-['']",
			].join(" ")}
		>
			{experience.map((event, index) => {
				const isLast = index === experience.length - 1;

				return (
					<li
						key={event.id ?? `${event.place}-${event.role}-${index}`}
						className={[
							"relative min-w-0 ps-11",
							isLast ? "" : "pb-12 md:pb-16",
						].join(" ")}
					>
						{/* Triángulo delta (equilátero, apunta a la derecha) */}
						<span
							aria-hidden="true"
							className={[
								"absolute start-1 top-[5px] z-10 block h-[18px] w-4",
								"bg-accent",
								"[clip-path:polygon(0_0,100%_50%,0_100%)]",
							].join(" ")}
						/>

						<ExperienceEvent {...event} />
					</li>
				);
			})}
		</ol>
	);
}