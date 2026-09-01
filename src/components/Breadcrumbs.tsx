interface BreadcrumbProps {
  paths: { name: string; href?: string }[];
}

export default function Breadcrumbs({ paths }: BreadcrumbProps) {
  return (
    <nav className="text-lg text-text-muted mb-4" aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">
        {paths.map((path, idx) => (
          <li key={idx} className="flex items-center">
            {path.href ? (
              <a
                href={path.href}
                className="underline underline-offset-4 text-accent hover:opacity-80 transition-opacity"
              >
                {path.name}
              </a>
            ) : (
              <span className="font-bold text-text">
                {path.name}
              </span>
            )}

            {idx < paths.length - 1 && (
              <span className="mx-2 text-text-muted">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}