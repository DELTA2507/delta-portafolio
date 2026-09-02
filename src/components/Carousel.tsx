import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

interface CarouselProps {
	projectImages: string[];
}

export default function Carousel({ projectImages }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const THUMBS_PER_PAGE = 5;
	const thumbsRef = useRef<HTMLDivElement>(null);
	const length = projectImages.length;

	const prevSlide = () =>
		setCurrentIndex((currentIndex - 1 + length) % length);

	const nextSlide = () =>
		setCurrentIndex((currentIndex + 1) % length);

	const scrollThumbs = (direction: "left" | "right") => {
		if (!thumbsRef.current) return;

		const thumbWidth =
			thumbsRef.current.children[0]?.clientWidth || 100;

		const gap =
			parseInt(getComputedStyle(thumbsRef.current).gap) || 8;

		const scrollAmount =
			(thumbWidth + gap) * THUMBS_PER_PAGE;

		thumbsRef.current.scrollBy({
			left: direction === "left" ? -scrollAmount : scrollAmount,
			behavior: "smooth",
		});
	};

	if (!length) return null;

	return (
		<div className="relative w-full group">
			<div className="relative rounded-2xl overflow-hidden h-[400px]">
				{projectImages.map((img, idx) => (
					<img
						key={idx}
						src={img}
						alt="media"
						className={`absolute top-0 left-0 w-full h-full object-contain transition-all duration-500 ease-in-out transform ${
							idx === currentIndex
								? "opacity-100 scale-100"
								: "opacity-0 scale-95"
						}`}
					/>
				))}

				<button
					type="button"
					onClick={prevSlide}
					aria-label="Imagen anterior"
					className="absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-surface/50 text-text border border-border hover:bg-accent hover:text-white hover:border-accent transition lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer"
				>
					<ChevronLeft size={22} strokeWidth={2} />
				</button>

				<button
					type="button"
					onClick={nextSlide}
					aria-label="Siguiente imagen"
					className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-surface/50 text-text border border-border hover:bg-accent hover:text-white hover:border-accent transition lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer"
				>
					<ChevronRight size={22} strokeWidth={2} />
				</button>
			</div>

			<div className="hidden lg:flex items-center mt-4 relative">
				<div className="relative w-full px-20">
					<button
						type="button"
						onClick={() => scrollThumbs("left")}
						aria-label="Desplazar miniaturas a la izquierda"
						className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-surface backdrop-blur-sm text-text border border-border hover:bg-accent hover:text-white hover:border-accent transition cursor-pointer"
					>
						<ChevronLeft size={22} strokeWidth={2} />
					</button>

					<div
						ref={thumbsRef}
						className="flex overflow-hidden gap-2"
						style={{
							scrollSnapType: "x mandatory",
							scrollBehavior: "smooth",
						}}
					>
						{projectImages.map((img, idx) => (
							<img
								key={idx}
								src={img}
								alt={`thumb-${idx}`}
								className={`shrink-0 w-24 h-14 object-cover rounded cursor-pointer border-2 brightness-70 hover:brightness-100 transition-all ease-in-out ${
									idx === currentIndex
										? "border-accent brightness-100"
										: "border-transparent"
								}`}
								style={{ scrollSnapAlign: "start" }}
								onClick={() => setCurrentIndex(idx)}
							/>
						))}
					</div>

					<button
						type="button"
						onClick={() => scrollThumbs("right")}
						aria-label="Desplazar miniaturas a la derecha"
						className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-surface backdrop-blur-sm text-text border border-border hover:bg-accent hover:text-white hover:border-accent transition cursor-pointer"
					>
						<ChevronRight size={22} strokeWidth={2} />
					</button>
				</div>
			</div>
		</div>
	);
}