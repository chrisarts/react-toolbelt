import type { ViteUserConfig } from 'vitest/config';

// const alias = (name: string) => {
//   const target = process.env.TEST_DIST !== undefined ? 'build/esm' : 'src';
//   return {
//     [`${name}/test`]: path.join(__dirname, 'packages', name, 'test'),
//     [`${name}`]: path.join(__dirname, 'packages', name, target),
//   };
// };

// This is a workaround, see https://github.com/vitest-dev/vitest/issues/4744
const config: ViteUserConfig = {
  esbuild: {
    target: 'es2020',
  },
  optimizeDeps: {
    exclude: ['react-native', 'react-native-web', 'effect'],
  },
  build: {
    reportCompressedSize: true,
  },
  test: {
    // setupFiles: [path.join(__dirname, 'setupTests.ts')],
    server: {
      deps: {
        external: [/^effect\/*/],
      },
    },
    coverage: {
      provider: 'istanbul',
      clean: true,
    },
    include: ['test/**/*.test.ts'],
    pool: 'forks',
    logHeapUsage: true,
    reporters: 'html',
    poolOptions: {
      forks: {
        execArgv: [
          '--cpu-prof',
          '--cpu-prof-dir=test-runner-profile',
          '--heap-prof',
          '--heap-prof-dir=test-runner-profile',
        ],

        // To generate a single profile
        singleFork: true,
      },
    },
  },
};

export default config;
