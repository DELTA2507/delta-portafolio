interface BreadcrumbProps {
  paths: { name: string; href?: string }[];
}

export default function Breadcrumbs({ paths }: BreadcrumbProps) {
  return (
    <nav className="text-lg text-white mb-4" aria-label="breadcrumb">
      <ol className="flex items-center space-x-2">
        {paths.map((path, idx) => (
          <li key={idx} className="flex items-center">
            {path.href ? (
              <a href={path.href} className="underline underline-offset-4 text-secondary">
                {path.name}
              </a>
            ) : (
              <span className="font-bold">{path.name}</span>
            )}
            {idx < paths.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}