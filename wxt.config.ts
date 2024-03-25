import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'


// See https://wxt.dev/api/config.html
export default defineConfig({
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  vite: () => ({
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        // targets to transform
        include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],

        // global imports to register
        imports: [
          // vue auto import
          'vue',
        ]
      }),
    ],
  }),
});
