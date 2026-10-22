import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
	name: string;
	href: string;
	/** Prefijos de ruta que marcan este link como activo */
	match: string[];
}

const links: NavLink[] = [
	{ name: "Inicio", href: "/", match: ["/"] },
	{ name: "Proyectos", href: "/projects", match: ["/projects", "/project/"] },
	{ name: "Blog", href: "/blog", match: ["/blog"] },
];

interface Props {
	pathname: string;
}

export default function Navbar({ pathname }: Props) {
	const [visible, setVisible] = useState(true);
	const lastScrollY = useRef(0);

	useEffect(() => {
		lastScrollY.current = window.scrollY;

		const handleScroll = () => {
			const current = Math.max(0, window.scrollY);
			const diff = current - lastScrollY.current;

			if (current < 40) setVisible(true);
			else if (Math.abs(diff) > 6) setVisible(diff < 0);

			lastScrollY.current = current;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const isActive = (link: NavLink) =>
		link.href === "/"
			? pathname === "/"
			: link.match.some((prefix) => pathname.startsWith(prefix));

	return (
		<header
			onFocus={() => setVisible(true)}
			className={[
				"fixed inset-x-0 top-0 z-50",
				"border-b border-border bg-background/60 backdrop-blur-xl backdrop-saturate-150",
				"transition-transform duration-300 ease-out motion-reduce:transition-none",
				visible ? "translate-y-0" : "-translate-y-full",
			].join(" ")}
		>
			<nav
				aria-label="Principal"
				className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:h-16 sm:px-8 lg:px-10"
			>
				{/* 1. Marca */}
				<a
					href="/"
					aria-label="Dev Portafolio, inicio"
					className="shrink-0 whitespace-nowrap font-mono text-eyebrow font-semibold uppercase tracking-[0.12em] text-text transition-colors hover:text-accent-text sm:text-sm"
				>
					Dev Portafolio<span className="text-accent">.</span>
				</a>

				{/* 2. Links */}
				<ul className="m-0 flex h-full list-none items-stretch p-0">
					{links.map((link) => {
						const active = isActive(link);

						return (
							<li key={link.name} className="flex">
								<a
									href={link.href}
									aria-current={active ? "page" : undefined}
									className={[
										"group relative flex w-[4.75rem] items-center justify-center px-1",
										"text-sm font-medium transition-colors duration-200 sm:w-28 sm:text-base",
										"focus-visible:outline-offset-[-4px]",
										active
											? "text-text"
											: "text-text-muted hover:text-text",
									].join(" ")}
								>
									{link.name}

									<span
										aria-hidden="true"
										className={[
											"absolute inset-x-3 bottom-0 h-0.5 origin-center rounded-full bg-accent",
											"transition-transform duration-300 ease-out motion-reduce:transition-none",
											active
												? "scale-x-100"
												: "scale-x-0 group-hover:scale-x-100",
										].join(" ")}
									/>
								</a>
							</li>
						);
					})}
				</ul>

				{/* 3. Toggle */}
				<div className="flex shrink-0 justify-end">
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}