import { defineConfig } from 'vite'
import { resolve } from 'path'
import handlebars from '@vituum/vite-plugin-handlebars'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
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
})
