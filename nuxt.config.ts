import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', 'nuxt-icon', '@vueuse/nuxt'],

  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 700],
      'JetBrains Mono': [300, 400, 500, 700],
    },
  },

  css: [join(currentDir, './assets/telegram.css')],
  app: {
    head: {
      script: [{ src: 'https://telegram.org/js/telegram-web-app.js' }],
    },
  },

})
