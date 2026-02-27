import { defineCollection, z } from "astro:content";

const lawyers = defineCollection({
    schema: ({ image }) =>
        z.object({
            name: z.string(),
            title: z.string(),
            education: z.array(z.string()).optional(),
            specialties: z.array(z.string()).optional(),
            experience: z.array(z.string()).optional(),
            bio: z.string(),
            image: z.object({
                url: image(),
                alt: z.string(),
            }),
            order: z.number().default(0),
        }),
});

const cases = defineCollection({
    schema: () =>
        z.object({
            title: z.string(),
            category: z.string(),
            summary: z.string(),
            status: z.string().default("已完成"),
            date: z.date(),
            highlights: z.array(z.string()).optional(),
        }),
});

export const collections = {
    lawyers,
    cases,
};
