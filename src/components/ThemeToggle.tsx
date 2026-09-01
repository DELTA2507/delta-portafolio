import { useThemeStore } from "../store/theme";

export default function ThemeToggle() {
	const { theme, toggleTheme } = useThemeStore();

	return (
		<button
			onClick={toggleTheme}
			aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
			className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-full border-2 border-border text-text hover:scale-110 hover:border-accent transition-all"
		>
			<i className={`fa-solid ${theme === "dark" ? "fa-moon" : "fa-sun"}`}></i>
		</button>
	);
}