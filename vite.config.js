import { defineConfig } from 'vite';

export default defineConfig({
  // Relatieve paden, zodat de build ook werkt onder https://<user>.github.io/<repo>/
  base: './',
  test: {
    include: ['tests/unit/**/*.test.js'],
    coverage: {
      provider: 'v8',
      include: ['src/tasks.js'],
      reporter: ['text', 'html', 'lcov'],
      thresholds: { lines: 90, functions: 90, branches: 90, statements: 90 },
    },
  },
});
