
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import remarkSlugRaw from "remark-slug";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const remarkSlug = /** @type {any} */ (remarkSlugRaw);

export default defineConfig({
  site: "https://delta-portafolio-dev.vercel.app/",
  markdown: {
    remarkPlugins: [remarkSlug],
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});