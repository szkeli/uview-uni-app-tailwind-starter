import { createSSRApp } from 'vue'
// @ts-expect-error uview
import uviewPlus from 'uview-plus'
import * as Pinia from 'pinia'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  app.use(Pinia.createPinia())
  app.use(uviewPlus)
  return {
    app,
    Pinia
  }
}
