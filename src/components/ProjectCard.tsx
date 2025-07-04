interface Props {
    title: string;
    description: string;
    image: string;
    stack: string[];
    link: string;
}

export default function ProjectCard({ title, description, image, stack, link }: Props) {
    return (
        <div className="select-none">
            <a 
                href={link} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-center w-full h-full bg-neutral-800 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-3 hover:shadow-lg hover:shadow-primary"
            >
                <img
                    src={image} 
                    alt={title} 
                    className="w-full h-40 object-cover rounded-t-xl" 
                />
                <div className="p-4 text-left space-y-2">
                    <h3 className="text-2xl font-bold text-neutral-200">{title}</h3>
                    <div className="flex gap-2 mt-2">
                        {stack.map(stackIcon => (
                            <img 
                                className="w-8 h-8 rounded-full" 
                                src={`/stackIcons/${stackIcon}.svg`} 
                                alt="Rounded icon" 
                            />
                        ))}
                    </div>
                    <p className="text-neutral-300 text-sm mt-5">
                        {description}
                    </p>
                </div>
            </a>
        </div>
    )
}