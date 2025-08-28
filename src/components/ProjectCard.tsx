interface Props {
  title: string
  description: string
  image: string
  stack: string[]
  link: string
}

export default function ProjectCard({ title, description, image, stack, link }: Props) {
  return (
    <div
      style={{ perspective: '1200px' }}
      className="group block select-none"
    >
      <div
        className="neon-card relative rounded-2xl p-[2px] transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]
        [transform-style:preserve-3d] hover:-translate-y-2 hover:skew-y-3
        hover:[transform:rotateX(6deg)_rotateY(-6deg)]
        "
      >
        <div className="relative z-[2] rounded-[inherit] overflow-hidden bg-white/5 backdrop-blur-xl">
          <img src={image} alt={title} className="w-full h-44 object-cover" />
          <div className="p-4 text-left space-y-3">
            <h3 className="text-2xl font-bold tracking-wide text-neutral-100 drop-shadow">{title}</h3>
            <div className="flex gap-2">
              {stack.map((stackIcon) => (
                <img
                  key={stackIcon}
                  className="w-8 h-8 rounded-full transition-transform duration-300 group-hover:scale-105"
                  src={`/stackIcons/${stackIcon}.svg`}
                  alt={stackIcon}
                />
              ))}
            </div>
            <p className="text-neutral-300/90 text-sm leading-relaxed">{description}</p>
            <a className="pt-2">
              <span
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide
                text-red-300/90 group-hover:text-red-200 transition-colors"
              >
                Visitar
                <svg width="18" height="18" viewBox="0 0 24 24" className="transition-transform group-hover:translate-x-0.5">
                  <path fill="currentColor" d="M14 3h7v7h-2V6.41l-9.29 9.3l-1.42-1.42l9.3-9.29H14V3Z" />
                  <path fill="currentColor" d="M5 5h5v2H7v10h10v-3h2v5H5z" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <span className="pointer-events-none absolute inset-0 -z-[1] blur-2xl neon-glow opacity-60 group-hover:opacity-90 transition-opacity"></span>
      </div>
    </div>
  )
}
