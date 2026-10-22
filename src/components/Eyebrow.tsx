import type { HTMLAttributes, ReactNode } from "react";

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
	children: ReactNode;
}

export default function Eyebrow({
	children,
	className = "",
	...props
}: EyebrowProps) {
	return (
		<span
			className={[
				"block w-fit",
				"font-mono text-eyebrow font-medium uppercase tracking-[0.1em]",
				"text-accent-text",
				className,
			]
				.filter(Boolean)
				.join(" ")}
			{...props}
		>
			{children}
		</span>
	);
}