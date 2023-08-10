import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    passWithNoTests: true,
    globals: true,
    watch: false,
    environment: 'jsdom',
    setupFiles: './src/setupTest.js',
    coverage: {
      exclude: ['src/**/*.{test, stories}.{js,jsx,ts,tsx}'],
      include: ['src/**/*.{js,jsx,ts,tsx}']
    }
  }
});
