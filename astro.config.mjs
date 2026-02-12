import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  compressHTML: true, // Kompres HTML
  prefetch: true, // Navigasi instan
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp' // Gunakan Sharp untuk gambar tajam & ringan
    }
  }
});