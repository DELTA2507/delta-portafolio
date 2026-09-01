import BaseCard from "./BaseCard";

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

export default function ProjectCard({
  ownerLogo,
  ownerLink,
  title,
  slug,
  shortDescription,
  images,
  stack,
  link,
}: Props) {
  return (
    <BaseCard
      image={images[0]}
      imageAlt={title}
      imageHref={link}
      footerHref={`/project/${slug}`}
      footerText="Ver más"
      badge={
        ownerLogo ? (
          <a
            href={ownerLink}
            className="card-badge"
            aria-label="Visitar sitio del propietario"
          >
            <img
              src={ownerLogo}
              alt="Owner Logo"
              className="w-full h-full object-contain"
            />
          </a>
        ) : undefined
      }
    >
      <h3 className="text-2xl font-bold tracking-wide text-text break-words overflow-hidden">
        {title}
      </h3>

      <div className="flex gap-2 mt-3">
        {stack.map((stackIcon) => (
          <img
            key={stackIcon}
            className="w-8 h-8 rounded-sm transition-transform duration-300 group-hover:scale-105"
            src={`/stack-icons/${stackIcon}.svg`}
            alt={stackIcon}
          />
        ))}
      </div>

      <p className="text-text-muted text-sm leading-relaxed description mt-5">
        {shortDescription}
      </p>
    </BaseCard>
  );
}