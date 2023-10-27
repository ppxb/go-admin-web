import { createApp } from 'vue'

import { setupRouter } from '~/router'

import App from './App.vue'

import 'ant-design-vue/dist/reset.css'
import 'uno.css'
import '~/styles/global.css'

const bootstrap = async () => {
  const app = createApp(App)

  await setupRouter(app)

  app.mount('#app')
}

bootstrap()
