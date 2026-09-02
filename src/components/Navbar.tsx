import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
	name: string;
	href: string;
	isAnchor?: boolean;
}

const links: NavLink[] = [
	{ name: "Inicio", href: "/" },
	{ name: "Proyectos", href: "/projects" },
	{ name: "Blog", href: "/blog" },
];

interface Props {
	pathname: string;
}

export default function Navbar({ pathname }: Props) {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		let lastScrollY = window.scrollY;

		const handleScroll = () => {
			const currentScrollY = window.scrollY;

			if (currentScrollY <= 20) {
				setVisible(true);
			} else if (currentScrollY < lastScrollY) {
				setVisible(true);
			} else if (currentScrollY > lastScrollY) {
				setVisible(false);
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 z-50 w-full px-5 py-4 flex items-center justify-between transition-all duration-300 ${
                visible
                    ? "translate-y-0 bg-background/40"
                    : "-translate-y-full"
            }`}
		>
			<ul className="flex items-center gap-6 md:gap-10">
				{links.map((link) => {
					const isHome = pathname === "/";

					const resolvedHref =
						link.isAnchor && !isHome ? `/${link.href}` : link.href;

					const isActive =
						link.href === "/"
							? pathname === "/"
							: pathname.startsWith(link.href);

					return (
						<li key={link.name}>
							<a
								className={`relative text-sm sm:text-base font-semibold transition-colors after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:bg-accent after:transition-all ${
									isActive
										? "text-accent after:w-full"
										: "text-text hover:text-accent after:w-0 hover:after:w-full"
								}`}
								href={resolvedHref}
								aria-label={link.name}
							>
								{link.name}
							</a>
						</li>
					);
				})}
			</ul>

			<ThemeToggle />
		</nav>
	);
}