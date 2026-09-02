import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../store/theme";

export default function ThemeToggle() {
	const { theme, toggleTheme } = useThemeStore();

	return (
		<button
			onClick={toggleTheme}
			aria-label={
				theme === "dark"
					? "Cambiar a modo claro"
					: "Cambiar a modo oscuro"
			}
			className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border-2 border-border text-text hover:scale-110 hover:border-accent transition-all"
		>
			{theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
		</button>
	);
}