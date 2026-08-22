import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

/**
 * Vitest configuration.
 *
 * The project's source uses the `@/*` path alias declared in `tsconfig.json`.
 * Vitest does not read `tsconfig` paths on its own, so the alias is mirrored
 * here — otherwise tests would have to import through brittle relative paths
 * such as `../src/lib/pricing/tiers`.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});
