import { setEnv } from "../../lib/sys.mjs";

export default (cli) =>
  cli
    .command("[root]", "start server in development mode")
    .option("--host [host]", "[string] host to listen on", {
      default: "localhost",
    })
    .option("--port <port>", "[number] port to listen on", { default: 3000 })
    .option("--https", "[boolean] use HTTPS protocol", { default: false })
    .option("--open [url]", "[boolean|string] open browser on server start", {
      default: false,
    })
    .option("--cors", "enable CORS", { default: false })
    .option("--force", "force optimize deps", { default: false })
    .option("--clear-screen", "clear screen on server start", {
      default: false,
    })
    .option("--no-color", "disable color output", { default: false })
    .option("-e, --eval <code>", "evaluate code", { type: "string" })
    .action(async (...args) => {
      setEnv("NODE_ENV", "development");
      return (await import("../../lib/dev/action.mjs")).default(...args);
    });
