import { useRef } from "react";

interface Props {
    title: string,
    slug: string,
    cover: string,
    author: string,
    date: string,
    summary: string,
}

export default function ArticleCard({ author, date, title, slug, summary, cover }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 10; 
    const rotateX = ((0.5 - y / rect.height)) * 10;

    card.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `translateY(0px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div style={{ perspective: '1200px' }} className="group block select-none">
        <div
            ref={cardRef}
            className="neon-card relative rounded-2xl p-[2px] [transform-style:preserve-3d]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-inner overflow-hidden bg-white/5 backdrop-blur-xl rounded-t-2xl flex flex-col">
                <a href={`/blog/${slug}`}>
                    <img src={cover} alt={title} className="w-full h-44 object-cover" />
                </a>
                <div className="p-4 card-content flex flex-col">
                    <div>
                        {/* meta info */}
                        <div className="flex items-center gap-3 text-sm text-neutral-400 mb-2">
                            <span className="font-medium text-neutral-200">{author}</span>
                            <span className="w-1 h-1 rounded-full bg-neutral-500"></span>
                            <span>
                                {new Date(date).toLocaleDateString("es-CR", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                })}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold tracking-wide text-neutral-100 drop-shadow break-words overflow-hidden">
                        {title}
                        </h3>

                        <p className="text-neutral-300/90 text-sm leading-relaxed description mt-5">
                            {summary}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer separado pero con mismo fondo para no quedar huérfano */}
            <div className="card-footer bg-white/5 backdrop-blur-xl rounded-b-2xl p-4 mt-[-1px]">
                <a
                    href={`/blog/${slug}`}
                    className="text-red-300 hover:text-red-200 inline-flex items-center gap-2 text-sm font-medium tracking-wide w-full h-full"
                    >
                    Ver artículo completo
                    <i className="fa-solid fa-external-link transition-transform group-hover:translate-x-0.5"></i>
                </a>
            </div>

            <span className="pointer-events-none absolute inset-0 -z-[1] blur-2xl neon-glow opacity-60 group-hover:opacity-90 transition-opacity"></span>
        </div>
    </div>
  );
}
