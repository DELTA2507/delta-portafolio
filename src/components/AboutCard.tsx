import Eyebrow from "./Eyebrow";

interface AboutCardProps {
	eyebrow: string;
	title: string;
	description: string;
	className?: string;
}

export default function AboutCard({
	eyebrow,
	title,
	description,
	className = "",
}: AboutCardProps) {
	return (
		<article
			className={[
				"flex flex-col gap-2",
				"rounded-xl border border-border bg-surface",
				"p-6 md:p-7",
				className,
			]
				.filter(Boolean)
				.join(" ")}
		>
			<Eyebrow>{eyebrow}</Eyebrow>

			<h3 className="m-0 text-heading font-semibold text-text">
				{title}
			</h3>

			<p className="m-0 max-w-[60ch] text-base leading-relaxed text-text-muted">
				{description}
			</p>
		</article>
	);
}