// @ts-check
import { defineConfig } from "astro/config";
import react from '@astrojs/react';
import remarkSlugRaw from 'remark-slug';
import sitemap from '@astrojs/sitemap';
const remarkSlug = /** @type {any} */ (remarkSlugRaw);

// https://astro.build/config
export default defineConfig({
  site: 'https://delta-portafolio-dev.vercel.app/',
  markdown: {
    remarkPlugins: [remarkSlug],
  },
  integrations: [react(), sitemap()],
});