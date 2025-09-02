// @ts-check
import { defineConfig } from "astro/config";
import react from '@astrojs/react';
import remarkSlugRaw from 'remark-slug';
const remarkSlug = /** @type {any} */ (remarkSlugRaw);

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkSlug],
  },
  integrations: [react()],
});