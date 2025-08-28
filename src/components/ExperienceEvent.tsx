interface ExperienceEventProps {
  role: string;
  place: string;
  placeLogo?: string;
  link?: string;
  date: string;
  stack: string[];
  description: string;
}

export default function ExperienceEvent({role, place, placeLogo, link, date, stack, description}: ExperienceEventProps) {
  return (
    <li className="mb-10 ms-6">
      {/*TRIANGLE*/}
      <div className="absolute w-0 h-0 mt-1.5 -start-1.5 
        border-l-[10px] border-l-transparent 
        border-r-[10px] border-r-transparent 
        border-b-[18px] border-b-secondary
        rotate-90">
      </div>
      {/*TRIANGLE*/}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="md:flex-1">
          <h3 className="text-2xl whitespace-nowrap font-semibold text-secondary">
            {role}
          </h3>
          {placeLogo ? (
            <a href={link} className="block w-36 max-w-full aspect-[3/1] mt-2 hover:brightness-150">
              <img
                src={placeLogo}
                alt={place}
                className="w-full h-full object-contain"
              />
            </a>
          ) : (
            <a href={link} className="text-xl font-semibold text-white">
              {place}
            </a>
          )}
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
  