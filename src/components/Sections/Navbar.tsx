import { useEffect, useState } from 'react';

const links = [
	{ name: 'Inicio', href: '#hero' },
	{ name: 'Experiencia', href: '#experience' },
	{ name: 'Proyectos', href: '#projects' },
	{ name: 'Contacto', href: '#contact' },
];

export default function Navbar () {
	const [currentSection, setCurrentSection] = useState('');

	useEffect(() => {
		const handleScroll = () => {
			let current = '';
			for (const link of links) {
				const id = link.href.substring(1);
				const section = document.getElementById(id);
				if (section) {
					const rect = section.getBoundingClientRect();
					if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
						current = id;
						break;
					}
				}
			}
			setCurrentSection(current);
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className='w-full fixed p-5 transition-all navbar-glass z-50'>
			<ul className="w-full flex justify-evenly md:justify-center md:gap-10">
				{links.map(link => (
					<li key={link.name}>
						<a 
							className={`hover:text-secondary hover:underline hover:underline-offset-8 transition-all text-neutral-300 font-semibold ${currentSection === link.href.substring(1) ? 'text-secondary' : ''}`}
							aria-label={link.name} 
							aria-current={link.href === `#${currentSection}` ? 'page' : undefined}
							href={link.href}
						>
							{link.name}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
};