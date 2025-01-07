// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxthub/core'],
  plugins: ["~/plugins/flyonui.client.ts"],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL
    }
  },

  hub: {
    database: true,

  },

  $development: {
    hub: {
      remote: "production"
    }
  }
})