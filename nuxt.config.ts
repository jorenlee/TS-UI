// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Tech Savvy Code Camp",
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-G6MZR024YE",
          async: true,
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
      ],
    },
  },

  css: ["~/assets/css/main.css", "~/assets/fontawesome/css/all.min.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["nuxt-gtag"],
  gtag: {
    id: "G-G6MZR024YE",
  },

  runtimeConfig: {
    // Server-only (never exposed to client)
    apiBase: (process.env.API_BASE || "http://127.0.0.1:8000").replace(
      /\/$/,
      "",
    ),

    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

    public: {
      // Client-safe - Base API URL without path
      apiBase: (
        process.env.NUXT_PUBLIC_API_BASE || "http://127.0.0.1:8000"
      ).replace(/\/$/, ""),

      googleClientId: process.env.GOOGLE_CLIENT_ID,
    },
  },
});
