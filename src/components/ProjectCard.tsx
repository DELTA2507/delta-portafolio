import { useRef } from "react";

interface Props {
    ownerLogo: string;
    ownerLink: string;
    title: string;
    slug: string;
    shortDescription: string;
    images: string[];
    stack: string[];
    link: string;
}

export default function ProjectCard({ ownerLogo, ownerLink, title, slug, shortDescription, images, stack, link }: Props) {
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
            {/* Badge flotante */}
            {ownerLogo && (
                <a
                    href={ownerLink}
                    className="absolute top-2 left-2 w-11 h-11 z-100 rounded-full overflow-hidden bg-black border-2 transition-all duration-300 flex items-center justify-center"
                    style={{ borderColor: 'transparent' }}
                    onMouseEnter={(e) => {
                        const badge = e.currentTarget;
                        badge.style.borderColor = '#ff4d6d';
                    }}
                    onMouseLeave={(e) => {
                        const badge = e.currentTarget;
                        badge.style.borderColor = 'transparent';
                    }}
                >
                    <img
                        src={ownerLogo}
                        alt="Owner Logo"
                        className="w-full h-full object-contain"
                    />
                </a>
            )}

            <div className="card-inner overflow-hidden bg-white/5 backdrop-blur-xl rounded-t-2xl flex flex-col">
                <a href={link}>
                    <img src={images[0]} alt={title} className="w-full h-44 object-cover" />
                </a>
                <div className="p-4 card-content flex flex-col">
                    <div>
                    <h3 className="text-2xl font-bold tracking-wide text-neutral-100 drop-shadow break-words overflow-hidden">
                        {title}
                    </h3>
                    <div className="flex gap-2 mt-3">
                        {stack.map((stackIcon) => (
                        <img
                            key={stackIcon}
                            className="w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-105"
                            src={`/stack-icons/${stackIcon}.svg`}
                            alt={stackIcon}
                        />
                        ))}
                    </div>
                    <p className="text-neutral-300/90 text-sm leading-relaxed description mt-5">
                        {shortDescription}
                    </p>
                    </div>
                </div>
            </div>

            {/* Footer separado pero con mismo fondo para no quedar huérfano */}
            <div className="card-footer bg-white/5 backdrop-blur-xl rounded-b-2xl p-4 mt-[-1px]">
                <a
                    href={`/project/${slug}`}
                    className="text-red-300 hover:text-red-200 inline-flex items-center gap-2 text-sm font-medium tracking-wide w-full h-full"
                    >
                    Ver más
                    <i className="fa-solid fa-external-link transition-transform group-hover:translate-x-0.5"></i>
                </a>
            </div>

            <span className="pointer-events-none absolute inset-0 -z-[1] blur-2xl neon-glow opacity-60 group-hover:opacity-90 transition-opacity"></span>
        </div>
    </div>
  );
}
