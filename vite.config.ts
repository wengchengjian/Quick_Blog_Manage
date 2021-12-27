import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const { resolve } = require('path');
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus()
  ],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }]
  },
  server: {
    host: "127.0.0.1",
    port: 3000,
    proxy: {
      //接口拦截器
      '^/api/.*': {
        target: "http://localhost:8080/quick_blog/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      //资源拦截器
      '^/resource/.*': {
        target: "http://localhost:8080/quick_blog/",
        changeOrigin: true,
      }
    },
    hmr: {
      overlay: false,
    }

  }
})
