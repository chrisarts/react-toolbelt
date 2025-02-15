import * as path from 'node:path';
import {
  type TestProjectConfiguration,
  type UserWorkspaceConfig,
  defineWorkspace,
} from 'vitest/config';

// Remaining issues:
// - Random failures (browser): https://github.com/vitest-dev/vitest/issues/4497
// - Alias resolution (browser, has workaround): https://github.com/vitest-dev/vitest/issues/4744
// - Workspace optimization: https://github.com/vitest-dev/vitest/issues/4746

// TODO: Once https://github.com/vitest-dev/vitest/issues/4497 and https://github.com/vitest-dev/vitest/issues/4746
// are resolved, we can create specialized workspace groups in separate workspace files to better control test groups
// with different dependencies (e.g. playwright browser) in CI.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const project = (
  config: UserWorkspaceConfig['test'] & { name: `${string}|${string}` },
  root = config.root ?? path.join(__dirname, `packages/${config.name.split('|').at(0)}`),
): TestProjectConfiguration => ({
  extends: 'vitest.config.ts',
  test: { root, logHeapUsage: true, ...config },
});

export default defineWorkspace([
  // Add the default configuration for all packages.
  project({ name: 'arc-parser|browser' }),
  project({ name: 'arc-parser|node', environment: 'node' }),
  project({ name: 'helpers|browser' }),
  project({ name: 'builder|browser' }),
  project({ name: 'store|node', environment: 'node' }),
  project({
    name: 'store|browser',
    environment: 'happy-dom',
    disableConsoleIntercept: true,
    logHeapUsage: true,
  }),
]);
