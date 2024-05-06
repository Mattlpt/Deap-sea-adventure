import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

import sveltekitApiGenerator from 'vite-plugin-sveltekit-api-generator'
// serves OpenAPI schema to /swagger-ui.json

export default defineConfig({
  plugins: [sveltekit(), sveltekitApiGenerator()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})
