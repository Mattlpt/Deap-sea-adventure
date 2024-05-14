import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

import sveltekitApiGenerator from 'vite-plugin-sveltekit-api-generator'
// serves OpenAPI schema to /swagger-ui.json

export default defineConfig({
  // @ts-expect-error TS2769 because api-generator has vite 4 as dependency which conflicts with vite 5
  plugins: [sveltekit(), sveltekitApiGenerator()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
})
