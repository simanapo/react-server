import { resolve } from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "playground/utils": resolve(__dirname, "./utils.mjs"),
    },
  },
  test: {
    include: ["**/__test__/**/*.spec.mjs"],
    setupFiles: ["./vitestSetup.mjs"],
    globalSetup: ["./vitestGlobalSetup.mjs"],
    onConsoleLog(log, type) {
      if (
        type === "stderr" &&
        (log.match(/websocket server error/i) ||
          log.match(/error: (redirect|test)/i) ||
          log.match(/generated an empty chunk/i))
      )
        return false;
    },
    testTimeout: 60000,
    reporters: process.env.GITHUB_ACTIONS
      ? ["verbose", "github-actions"]
      : ["default"],
    pool: "forks",
    fileParallelism: !process.env.CI,
    retry: 3,
  },
  publicDir: false,
});
