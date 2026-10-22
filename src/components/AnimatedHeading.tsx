import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import {
	Briefcase,
	Mail,
	Code2,
	User,
	Newspaper,
	type LucideIcon,
} from "lucide-react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Eyebrow from "../components/Eyebrow";

interface AnimatedTitleProps {
	title: string;
	description: string;
	icon: string;
	eyebrow?: string;
	className?: string;
	as?: "h1" | "h2";
}

const icons: Record<string, LucideIcon> = {
	experience: Briefcase,
	contact: Mail,
	projects: Code2,
	about: User,
	blog: Newspaper,
};

export default function AnimatedHeading({
	title,
	description,
	icon,
	eyebrow,
	className,
	as: Tag = "h2",
}: AnimatedTitleProps) {
	const titleRef = useRef<HTMLHeadingElement>(null);
	const Icon = icons[icon] ?? Code2;

	useGSAP(() => {
		if (!titleRef.current) return;

		gsap.registerPlugin(ScrollTrigger);

		gsap.fromTo(
			titleRef.current,
			{ x: 30, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				duration: 0.5,
				delay: 0.2,
				ease: "power3.out",
				scrollTrigger: {
					trigger: titleRef.current,
					start: "top 80%",
					toggleActions: "play none none none",
				},
			}
		);
	}, []);

	return (
		<div
			className={[
				"flex flex-col items-start",
				"gap-0 mb-10 md:mb-14",
				className ?? "",
			]
				.filter(Boolean)
				.join(" ")}
		>
			{eyebrow && (
				<div className="mb-3">
					<Eyebrow>{eyebrow}</Eyebrow>
				</div>
			)}

			<Tag
				ref={titleRef}
				className="m-0 flex items-center gap-3 text-title font-semibold tracking-tight text-text"
			>
				<Icon
					className="hidden shrink-0 text-accent sm:block"
					size={32}
					strokeWidth={2}
					aria-hidden="true"
				/>

				<span>{title}</span>
			</Tag>

			{description && (
				<p className="mt-4 mb-0 max-w-[62ch] text-base leading-relaxed text-text-muted sm:text-lg">
					{description}
				</p>
			)}
		</div>
	);
}