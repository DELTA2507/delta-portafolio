interface ExperienceEventProps {
	role: string;
	place: string;
	placeLogo?: string;
	link?: string;
	date: string;
	stack: string[];
	description: string;
}

export default function ExperienceEvent({
	role,
	place,
	placeLogo,
	link,
	date,
	stack,
	description,
}: ExperienceEventProps) {
	const logoClass = "h-15 w-44 object-contain object-left";

	return (
		<article className="min-w-0">
			<div className="grid grid-cols-1 gap-5 md:grid-cols-[1.15fr_1fr] md:gap-14">
				<div className="flex min-w-0 flex-col items-start gap-4">
					<h3 className="m-0 break-words text-heading font-semibold text-text">
						{role}
					</h3>

					{placeLogo ? (
						link ? (
							<a
								href={link}
								aria-label={place}
								className="block w-fit transition-opacity hover:opacity-80"
							>
								<img
									src={placeLogo}
									alt={place}
									loading="lazy"
									decoding="async"
									className={logoClass}
								/>
							</a>
						) : (
							<img
								src={placeLogo}
								alt={place}
								loading="lazy"
								decoding="async"
								className={logoClass}
							/>
						)
					) : link ? (
						<a
							href={link}
							className="break-words text-base font-semibold text-text transition-colors hover:text-accent"
						>
							{place}
						</a>
					) : (
						<p className="m-0 break-words text-base font-semibold text-text">
							{place}
						</p>
					)}

					<time className="text-sm text-text-muted">{date}</time>

					{stack.length > 0 && (
						<ul
							aria-label="Tecnologías utilizadas"
							className="m-0 flex list-none flex-wrap items-center gap-3 p-0"
						>
							{stack.map((stackIcon) => (
								<li key={stackIcon} className="list-none">
									<img
										src={`/stack-icons/${stackIcon}.svg`}
										alt={stackIcon}
										title={stackIcon}
										loading="lazy"
										decoding="async"
										className="size-8 rounded-sm object-contain"
									/>
								</li>
							))}
						</ul>
					)}
				</div>

				<p className="m-0 max-w-[58ch] text-base leading-relaxed text-text-muted md:pt-0.5">
					{description}
				</p>
			</div>
		</article>
	);
}