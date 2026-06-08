/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    // Makes describe/it/expect available without imports
    globals: true,

    // Node is fine for pure utils; jsdom is needed for component/hook tests
    // Increment 2: switched from 'node' to 'jsdom' once jsdom was installed
    environment: 'jsdom',

    // Where to find tests: co-located __tests__/ folders + top-level tests/
    include: ['src/**/*.test.{ts,tsx}', 'tests/**/*.test.{ts,tsx}'],

    // Global test setup (jest-dom matchers)
    setupFiles: ['./src/test/setup.ts'],

    // Coverage config (ready for when we run --coverage later)
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['src/test/**', 'src/main.tsx', 'src/routes.tsx'],
    },
  },
});
