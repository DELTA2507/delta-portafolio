const links = [
	{ name: 'Inicio', href: '#hero' },
	{ name: 'Experiencia', href: '#experience' },
	{ name: 'Proyectos', href: '#projects' },
	{ name: 'Contacto', href: '#contact' },
];

export default function Navbar () {
	return (
		<nav className="sticky top-0 w-full p-5 transition-all navbar-glass z-50 backdrop-blur-md">
			<ul className="w-full flex justify-evenly md:justify-center md:gap-10">
				{links.map(link => (
					<li key={link.name}>
						<a
							className="hover:text-secondary hover:underline hover:underline-offset-8 transition-all text-neutral-300 sm:text-lg font-semibold"
							href={link.href}
							aria-label={link.name}
						>
							{link.name}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
