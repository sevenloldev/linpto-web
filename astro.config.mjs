import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
export default defineConfig({
  devToolbar: { enabled: false },

  vite: {
      plugins: [tailwindcss()],
  },

  markdown: {
      drafts: true,
      shikiConfig: {
          theme: "css-variables",
      },
  },

  site: "https://hanlin-law.com",
  integrations: [sitemap()],
  adapter: cloudflare(),
});