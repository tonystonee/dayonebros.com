import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'dayone',
      themes: {
        dayone: {
          dark: false,
          colors: {
            barColor: '#F44336',
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107'
          }
        },
        dayoneDark: {
          dark: true,
          colors: {
            barColor: '#E53935',
            primary: '#90CAF9',
            secondary: '#B0BEC5',
            accent: '#82B1FF',
            error: '#FF8A80',
            info: '#64B5F6',
            success: '#81C784',
            warning: '#FFD54F',
            background: '#0F1115',
            surface: '#171A21'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
