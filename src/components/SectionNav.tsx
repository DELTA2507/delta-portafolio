import { useEffect, useState, useRef } from "react";

const sections = [
	{ id: "hero", label: "Inicio" },
	{id: "about", label: "Acerca de mí" },
	{ id: "experience", label: "Experiencia" },
	{ id: "projects", label: "Proyectos" },
	{ id: "articles", label: "Blog" },
	{ id: "contact", label: "Contacto" },
];

export default function SectionNav() {
	const [activeId, setActiveId] = useState("hero");
	const tickingRef = useRef(false);

	useEffect(() => {
		const updateActiveSection = () => {
			// Línea de referencia: un poco debajo del tope de la pantalla
			const referenceY = window.innerHeight * 0.3;

			let closestId = sections[0].id;
			let closestDistance = Infinity;

			for (const { id } of sections) {
				const el = document.getElementById(id);
				if (!el) continue;

				const rect = el.getBoundingClientRect();

				// Solo consideramos secciones que ya cruzaron la línea de referencia
				// (su top está arriba o en la línea) o que la contienen
				if (rect.top <= referenceY) {
					const distance = referenceY - rect.top;
					if (distance < closestDistance) {
						closestDistance = distance;
						closestId = id;
					}
				}
			}

			setActiveId(closestId);
			tickingRef.current = false;
		};

		const handleScroll = () => {
			if (!tickingRef.current) {
				tickingRef.current = true;
				requestAnimationFrame(updateActiveSection);
			}
		};

		// Calcular estado inicial al montar (por si cargás con scroll ya hecho, ej. F5)
		updateActiveSection();

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, []);

	return (
		<nav
			className="flex fixed right-5 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5"
			aria-label="Navegación de secciones"
		>
			{sections.map((section) => {
				const isActive = activeId === section.id;
				return (
					<a
						key={section.id}
						href={`#${section.id}`}
						className="group flex items-center gap-3"
						aria-label={section.label}
						aria-current={isActive ? "true" : undefined}
					>
						<span
							className={`text-xs font-semibold tracking-wide transition-all ${
								isActive
									? "text-accent opacity-100 translate-x-0"
									: "text-text-muted opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
							}`}
						>
							{section.label}
						</span>
						<span
							className={`block h-[2px] transition-all ${
								isActive ? "w-8 bg-accent" : "w-4 bg-text-muted group-hover:w-6 group-hover:bg-accent"
							}`}
						></span>
					</a>
				);
			})}
		</nav>
	);
}