import { useCallback, useEffect, useRef, useState } from "react";

const sections = [
	{ id: "hero", label: "Inicio" },
	{ id: "about", label: "Acerca de mí" },
	{ id: "experience", label: "Experiencia" },
	{ id: "projects", label: "Proyectos" },
	{ id: "articles", label: "Blog" },
	{ id: "contact", label: "Contacto" },
];

const HIDE_DELAY = 1500;
const EDGE_ZONE = 80;

export default function SectionNav() {
	const [activeId, setActiveId] = useState(sections[0].id);
	const [visible, setVisible] = useState(false);

	const tickingRef = useRef(false);
	const hideTimerRef = useRef<number | undefined>(undefined);
	const holdRef = useRef(false); // true mientras hay hover o foco dentro del nav

	const reveal = useCallback(() => {
		setVisible(true);
		window.clearTimeout(hideTimerRef.current);
		hideTimerRef.current = window.setTimeout(() => {
			if (!holdRef.current) setVisible(false);
		}, HIDE_DELAY);
	}, []);

	useEffect(() => {
		const updateActiveSection = () => {
			tickingRef.current = false;

			const nearBottom =
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 4;

			if (nearBottom) {
				setActiveId(sections[sections.length - 1].id);
				return;
			}

			const referenceY = window.innerHeight * 0.3;
			let current = sections[0].id;
			let closest = Infinity;

			for (const { id } of sections) {
				const el = document.getElementById(id);
				if (!el) continue;

				const top = el.getBoundingClientRect().top;
				if (top <= referenceY && referenceY - top < closest) {
					closest = referenceY - top;
					current = id;
				}
			}

			setActiveId(current);
		};

		const handleScroll = () => {
			reveal();
			if (!tickingRef.current) {
				tickingRef.current = true;
				requestAnimationFrame(updateActiveSection);
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (e.clientX >= window.innerWidth - EDGE_ZONE) reveal();
		};

		updateActiveSection();
		reveal(); // se muestra un momento al cargar, para que se note que existe

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);
		window.addEventListener("mousemove", handleMouseMove, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
			window.removeEventListener("mousemove", handleMouseMove);
			window.clearTimeout(hideTimerRef.current);
		};
	}, [reveal]);

	const hold = () => {
		holdRef.current = true;
		window.clearTimeout(hideTimerRef.current);
		setVisible(true);
	};

	const release = () => {
		holdRef.current = false;
		reveal();
	};

	return (
		<nav
			aria-label="Navegación de secciones"
			onMouseEnter={hold}
			onMouseLeave={release}
			onFocus={hold}
			onBlur={release}
			className={[
				"fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block",
				"rounded-2xl border border-border bg-background/70 px-2.5 py-2.5 backdrop-blur-md",
				"transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none",
				visible
					? "translate-x-0 opacity-100"
					: "pointer-events-none translate-x-6 opacity-0",
			].join(" ")}
		>
			<ul className="m-0 flex list-none flex-col items-end gap-0.5 p-0">
				{sections.map((section) => {
					const isActive = activeId === section.id;

					return (
						<li key={section.id}>
							<a
								href={`#${section.id}`}
								aria-label={section.label}
								aria-current={isActive ? "true" : undefined}
								className="group relative flex h-7 w-9 items-center justify-end"
							>
								{/* Etiqueta flotante: no afecta el ancho del nav */}
								<span
									className={[
										"pointer-events-none absolute right-full mr-6 whitespace-nowrap",
										"rounded-md border border-border bg-background/90 px-2.5 py-1.5 backdrop-blur-md",
										"font-mono text-eyebrow font-medium uppercase tracking-[0.1em]",
										"transition-all duration-200 motion-reduce:transition-none",
										isActive
											? "translate-x-0 text-accent-text opacity-100"
											: "translate-x-1 text-text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
									].join(" ")}
								>
									{section.label}
								</span>

								<span
									className={[
										"block h-[2px] rounded-full transition-all duration-200 motion-reduce:transition-none",
										isActive
											? "w-8 bg-accent"
											: "w-4 bg-text-muted group-hover:w-6 group-hover:bg-accent",
									].join(" ")}
								/>
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}