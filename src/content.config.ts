// src/content.config.ts
import { defineCollection, z } from "astro:content";

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    projectLogo: z.string().optional(),
    ownerLogo: z.string(),
    images: z.array(z.string()),
    ownerLink: z.string().optional(),
    link: z.string().optional(),
    stack: z.array(z.string()).optional(),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
  }),
});

const articlesCollection = defineCollection({
  schema: z.object({
    slug: z.string().optional(),
    title: z.string(),
    cover: z.string(),
    date: z.date(),
    author: z.string(),
    summary: z.string(),
  }),
})

export const collections = {
  projects: projectsCollection,
  articles: articlesCollection
};