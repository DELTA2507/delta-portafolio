import { useMemo, useState } from "react";
import AnimatedStaggeredContainerCards from "./AnimatedStaggeredContainerCards";

interface FilterableCardsProps {
	type: "project" | "article";
	items: any[];
	/** Campo del frontmatter que define la categoría */
	categoryField?: string;
	/** Categoría para items que no la traen */
	fallbackCategory?: string;
}

const ALL = "__all__";

const norm = (value: string) => value.trim().toLowerCase();

const filterBase =
	"rounded-full border px-4 py-2 text-sm font-medium transition-colors";
const filterIdle =
	"border-border bg-surface text-text-muted hover:border-accent hover:text-text";
const filterActive = "border-accent bg-accent text-accent-contrast";

export default function FilterableCards({
	type,
	items,
	categoryField = "category",
	fallbackCategory = "Otros",
}: FilterableCardsProps) {
	const [active, setActive] = useState<string>(ALL);

	const getCategory = (item: any): string =>
		String(item?.[categoryField] ?? fallbackCategory);

	// Categorías únicas, en orden de aparición, con conteo
	const categories = useMemo(() => {
		const map = new Map<string, { label: string; count: number }>();

		for (const item of items) {
			const label = getCategory(item);
			const key = norm(label);
			const current = map.get(key);
			map.set(key, { label, count: (current?.count ?? 0) + 1 });
		}

		return Array.from(map, ([key, { label, count }]) => ({
			key,
			label,
			count,
		}));
	}, [items, categoryField, fallbackCategory]);

	const visible = useMemo(
		() =>
			active === ALL
				? items
				: items.filter((item) => norm(getCategory(item)) === active),
		[items, active, categoryField, fallbackCategory]
	);

	return (
		<div>
			{categories.length > 1 && (
				<div
					role="group"
					aria-label="Filtrar por categoría"
					className="mb-8 flex flex-wrap items-center gap-2 md:mb-10"
				>
					<button
						type="button"
						aria-pressed={active === ALL}
						onClick={() => setActive(ALL)}
						className={[filterBase, active === ALL ? filterActive : filterIdle].join(" ")}
					>
						Todos
						<span className="ms-2 opacity-70">{items.length}</span>
					</button>

					{categories.map(({ key, label, count }) => (
						<button
							key={key}
							type="button"
							aria-pressed={active === key}
							onClick={() => setActive(key)}
							className={[filterBase, active === key ? filterActive : filterIdle].join(" ")}
						>
							{label}
							<span className="ms-2 opacity-70">{count}</span>
						</button>
					))}
				</div>
			)}

			{visible.length > 0 ? (
				// key = remonta la grilla y vuelve a disparar la animación al filtrar
				<AnimatedStaggeredContainerCards
					key={active}
					{...(type === "project"
						? { projects: visible }
						: { articles: visible })}
				/>
			) : (
				<p className="m-0 py-12 text-center text-text-muted">
					No hay resultados en esta categoría.
				</p>
			)}
		</div>
	);
}