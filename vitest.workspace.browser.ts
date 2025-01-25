import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vite.config.ts',
  {
    extends: "vite.config.ts",
    test: {
      browser: {
        enabled: true,
        provider: "webdriverio",
        instances: [
          {
            browser: "edge",
            headless: false,
          },
        ],
      },
    },
  },
]);
