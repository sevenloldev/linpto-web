import { defineCollection, z } from "astro:content";
const postsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()),
    }),
});
const team = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string().optional(),
      bio: z.string().optional(),
      experience: z.string().optional(),
      education: z.array(z.string()).optional(),
      barAdmissions: z.array(z.string()).optional(),
      specialties: z.array(z.string()).optional(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      contact: z
        .object({
          email: z.string().optional(),
          phone: z.string().optional(),
          location: z.string().optional(),
        })
        .optional(),
      socials: z
        .object({
          linkedin: z.string().optional(),
          website: z.string().optional(),
          twitter: z.string().optional(),
        })
        .optional(),
    }),
});
const practice = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().optional(),
      description: z.string().optional(),
      image: z
        .object({
          url: image(),
          alt: z.string(),
        })
        .optional(),
      icon: z.string().optional(),
    }),
});
const infopages = defineCollection({
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});
const careers = defineCollection({
  schema: z.object({
    title: z.string(),
    location: z.string(),
    type: z
      .enum(["Full-time", "Part-time", "Contract", "Internship"])
      .optional(),
    remote: z.string().optional(),
    postedDate: z.date(),
    salary: z.string().optional(),
    description: z.string().optional(),
    responsibilities: z.array(z.string()).optional(),
    requirements: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    applyUrl: z.string().optional(),
    applyEmail: z.string().optional(),

    tags: z.array(z.string()).optional(),
  }),
});
const cases = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().optional(),
      category: z.string().optional(),
      practice: z.string().optional(),
      attorneys: z.array(z.string()).optional(),
      client: z.string().optional(),
      jurisdiction: z.string().optional(),
      value: z.string().optional(),
      result: z.string().optional(),
      pubDate: z.date(),
      image: z.object({ url: image(), alt: z.string() }).optional(),
      tags: z.array(z.string()).optional(),
      testimonial: z
        .object({
          name: z.string(),
          quote: z.string(),
        })
        .optional(),
    }),
});
const pressReleases = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    category: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});
export const collections = {
  team,
  practice,
  careers,
  cases,
  infopages,
  posts: postsCollection,
  pressReleases,
};
