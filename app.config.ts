export default defineAppConfig({
  myLayer: {
    name: 'HikkaHost'
  }
})

declare module '@nuxt/schema' {
  interface AppConfigInput {
    myLayer?: {
      /** Project name */
      name?: string
    }
  }
}
