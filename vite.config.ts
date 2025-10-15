import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import vitePluginSvgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    vitePluginSvgr({
      include: '**/*.svg?react',
      svgrOptions: { titleProp: true, exportType: 'default', dimensions: true, ref: true },
    }),
    tailwindcss(),
  ],
});
