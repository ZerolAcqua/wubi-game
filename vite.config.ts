import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'


// for github action
const isGithubAction = process.env.GITHUB_ACTIONS === "true";
let basePath;

if (isGithubAction) {
  // 去掉 `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY!.replace(/.*?\//, '');
  basePath = `/${repo}`
} else {
  basePath = '/c/wubi/';
}

// https://vite.dev/config/
export default defineConfig({
  base: basePath,
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
