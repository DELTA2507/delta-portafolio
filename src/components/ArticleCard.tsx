import BaseCard from "./BaseCard";

interface Props {
  title: string;
  slug: string;
  cover: string;
  author: string;
  date: string;
  summary: string;
}

export default function ArticleCard({
  author,
  date,
  title,
  slug,
  summary,
  cover,
}: Props) {
  return (
    <BaseCard
      image={cover}
      imageAlt={title}
      imageHref={`/blog/${slug}`}
      footerHref={`/blog/${slug}`}
      footerText="Ver artículo completo"
    >
      <div className="flex items-center gap-3 text-sm text-text-muted mb-2">
        <span className="font-medium text-text">{author}</span>

        <span className="w-1 h-1 rounded-full bg-border"></span>

        <span>
          {new Date(date).toLocaleDateString("es-CR", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      <h3 className="text-2xl font-bold tracking-wide text-text break-words overflow-hidden">
        {title}
      </h3>

      <p className="text-text-muted text-sm leading-relaxed description mt-5">
        {summary}
      </p>
    </BaseCard>
  );
}