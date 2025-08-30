import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // Your test configuration goes here
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
});