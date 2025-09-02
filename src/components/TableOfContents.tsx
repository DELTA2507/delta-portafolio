// TOC.tsx
import { useEffect, useState } from 'react';

export default function TableOfContents() {
  const [links, setLinks] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    setLinks(headings.map(h => ({ id: h.id, text: h.textContent || '' })));
  }, []);

  if (links.length === 0) return null;

  return (
    <nav className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-xl shadow-lg border border-white/10">
      <h3 className="text-xl font-semibold text-neutral-100 mb-2">Tabla de Contenidos</h3>
      {links.map(link => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="text-red-300 hover:text-red-200 transition-colors duration-200 pl-2 border-l-2 border-transparent hover:border-red-300"
        >
          {link.text}
        </a>
      ))}
    </nav>
  );
}