import { ExternalLink } from "lucide-react";
import { useRef, type ReactNode } from "react";
import "../styles/card.css";

interface BaseCardProps {
	image: string;
	imageAlt: string;
	imageHref: string;
	footerHref: string;
	footerText: string;
	badge?: ReactNode;
	children: ReactNode;
}

export default function BaseCard({
	image,
	imageAlt,
	imageHref,
	footerHref,
	footerText,
	badge,
	children,
}: BaseCardProps) {
	const cardRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent) => {
		const card = cardRef.current;
		if (!card) return;

		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const rotateY = (x / rect.width - 0.5) * 10;
		const rotateX = (0.5 - y / rect.height) * 10;

		card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	};

	const handleMouseLeave = () => {
		const card = cardRef.current;
		if (!card) return;

		card.style.transform = `translateY(0px) rotateX(0deg) rotateY(0deg)`;
	};

	return (
		<div
			style={{ perspective: "1200px" }}
			className="group block select-none"
		>
			<div
				ref={cardRef}
				className="neon-card [transform-style:preserve-3d]"
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				{badge}

				<div className="card-inner">
					<a href={imageHref}>
						<img
							src={image}
							alt={imageAlt}
							className="w-full h-44 object-cover"
						/>
					</a>

					<div className="card-content">
						{children}
					</div>
				</div>

				<div className="card-footer">
					<a
						href={footerHref}
						className="text-accent hover:brightness-125 inline-flex items-center gap-2 text-sm font-medium tracking-wide w-full h-full"
					>
						{footerText}

						<ExternalLink
							size={16}
							strokeWidth={2}
							className="transition-transform group-hover:translate-x-0.5"
							aria-hidden="true"
						/>
					</a>
				</div>
			</div>
		</div>
	);
}