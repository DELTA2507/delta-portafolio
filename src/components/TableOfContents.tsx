import { useEffect, useState } from 'react';

export default function TableOfContents() {
  const [links, setLinks] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    setLinks(headings.map(h => ({ id: h.id, text: h.textContent || '' })));
  }, []);

  if (links.length === 0) return null;

  return (
    <nav className="flex flex-col gap-3 p-4 rounded-2xl bg-surface/80 backdrop-blur-xl shadow-lg border border-border">
      <h3 className="text-xl font-semibold text-text mb-2">
        Tabla de Contenidos
      </h3>

      {links.map(link => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="text-text-muted hover:text-accent transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-accent"
        >
          {link.text}
        </a>
      ))}
    </nav>
  );
}