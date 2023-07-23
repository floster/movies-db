import { defineConfig } from 'vite'
import { resolve } from 'path'
import handlebars from '@vituum/vite-plugin-handlebars'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    handlebars({
      partials: {
        directory: resolve(__dirname, 'src', 'partials'),
        extname: false
      },
      data: resolve(__dirname, 'src', 'data.json'),
      helpers: {
        removeDot: (num: number) => num.toString().replace('.', '')
      }
    })
  ],
  build: {
    rollupOptions: {
      input: ['index.hbs']
    }
  }
})
