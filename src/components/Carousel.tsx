import { useRef, useState } from "react";

interface CarouselProps {
  projectImages: string[];
}

export default function Carousel({ projectImages }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const THUMBS_PER_PAGE = 5;
  const thumbsRef = useRef<HTMLDivElement>(null);
  const length = projectImages.length;

  const prevSlide = () => setCurrentIndex((currentIndex - 1 + length) % length);
  const nextSlide = () => setCurrentIndex((currentIndex + 1) % length);

  const scrollThumbs = (direction: "left" | "right") => {
    if (!thumbsRef.current) return;
    const thumbWidth = thumbsRef.current.children[0]?.clientWidth || 100;
    const gap = parseInt(getComputedStyle(thumbsRef.current).gap) || 8;
    const scrollAmount = (thumbWidth + gap) * THUMBS_PER_PAGE;

    thumbsRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!length) return null;

  return (
    <div className="relative w-full group">
        {/* Main Image */}
        <div className="relative rounded-2xl overflow-hidden h-[400px]">
            {projectImages.map((img, idx) => (
                <img
                    key={idx}
                    src={img}
                    alt="media"
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ease-in-out transform ${
                        idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                />
            ))}

            <button onClick={prevSlide} className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white p-2 px-4 rounded-full hover:bg-black/50 transition lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer">
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white p-2 px-4 rounded-full hover:bg-black/50 transition lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer">
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>

      {/* Thumbnails */}
        <div className="hidden lg:flex items-center mt-4 relative">
            <div className="relative w-full px-20"> {/* px-8 gives space for arrows */}
                <button
                onClick={() => scrollThumbs("left")}
                className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 px-4 rounded-full hover:bg-white/30 cursor-pointer`}
                >
                <i className="fa-solid fa-chevron-left"></i>
                </button>

                <div
                ref={thumbsRef}
                className="flex overflow-hidden gap-2"
                style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
                >
                {projectImages.map((img, idx) => (
                    <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`flex-shrink-0 w-24 h-14 object-cover rounded cursor-pointer border-2 brightness-70 hover:brightness-100 transition-all ease-in-out ${
                        idx === currentIndex ? "border-red-400 brightness-100" : "border-transparent"
                    }`}
                    style={{ scrollSnapAlign: "start" }}
                    onClick={() => setCurrentIndex(idx)}
                    />
                ))}
                </div>

                <button
                onClick={() => scrollThumbs("right")}
                className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 px-4 rounded-full hover:bg-white/30 cursor-pointer`}
                >
                <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>
  );
}
