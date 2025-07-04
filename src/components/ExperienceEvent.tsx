interface ExperienceEventProps {
    role: string;
    place: string;
    link?: string;
    date: string;
    stack: string[];
    description: string;
}

export default function ExperienceEvent({role, place, link, date, stack, description}: ExperienceEventProps) {
  return (
    <li className="mb-10 ms-4">
      <div className="absolute w-3 h-3 rounded-full mt-3.5 -start-1.5 border border-neutral-900 bg-secondary"></div>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="md:flex-1">
            <h3 className="text-2xl whitespace-nowrap font-semibold text-secondary">
              {role}
            </h3>
            <a href={link} className="text-xl font-semibold text-white">
              {place}
            </a>
            <br/>
            <time className="mb-1 text-sm font-normal leading-none text-neutral-400">
              {date}
            </time>
            <div className="flex gap-2 mt-2">
                {stack.map(stackIcon => (
                    <img 
                        className="w-8 h-8 rounded-full" 
                        src={`/stackIcons/${stackIcon}.svg`} 
                        alt="Rounded icon" 
                    />
                ))}
            </div>
          </div>
          <div className="md:w-1/2">
            <p className="text-base font-normal text-neutral-400">
              {description}
            </p>
          </div>
        </div>
    </li>
  );
}
  