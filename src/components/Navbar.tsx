import ThemeToggle from "./ThemeToggle";

interface NavLink {
	name: string;
	href: string;
	isAnchor?: boolean;
}

const links: NavLink[] = [
	{ name: 'Inicio', href: '/' },
	{ name: 'Proyectos', href: '/projects' },
	{ name: 'Blog', href: '/blog' },
];

interface Props {
	pathname: string;
}

export default function Navbar({ pathname }: Props) {
	const isHome = pathname === '/';

	return (
		<nav className="sticky top-0 w-full px-5 py-3 flex items-center justify-between transition-all navbar-glass z-50 backdrop-blur-md">
            <ul className="flex items-center gap-6 md:gap-10">
                {links.map((link) => {
                    // Si es un ancla y NO estamos en home, la redirigimos a "/#seccion"
                    const resolvedHref =
                        link.isAnchor && !isHome ? `/${link.href}` : link.href;

                    return (
                        <li key={link.name}>
                            <a
                                className="hover:text-accent hover:underline hover:underline-offset-8 transition-all text-text-muted sm:text-lg font-semibold"
                                href={resolvedHref}
                                aria-label={link.name}
                            >
                                {link.name}
                            </a>
                        </li>
                    );
                })}
            </ul>

            <ThemeToggle/>
        </nav>
	);
}