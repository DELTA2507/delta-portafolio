import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";

interface ThemeState {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

function applyThemeToDOM(theme: Theme) {
	document.documentElement.setAttribute("data-theme", theme);
}

export const useThemeStore = create<ThemeState>()(
	persist(
		(set, get) => ({
			theme: "dark",
			setTheme: (theme) => {
				applyThemeToDOM(theme);
				set({ theme });
			},
			toggleTheme: () => {
				const next = get().theme === "dark" ? "light" : "dark";
				applyThemeToDOM(next);
				set({ theme: next });
			},
		}),
		{
			name: "theme-storage",
			onRehydrateStorage: () => (state) => {
				if (state) applyThemeToDOM(state.theme);
			},
		}
	)
);