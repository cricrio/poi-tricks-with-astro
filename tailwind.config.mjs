import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  integrations: [react()],
  plugins: [require('daisyui'), require('@tailwindcss/container-queries')],
});
