import express from "express";
import path from "path";
import dotenv from "dotenv";

import { apiRouter } from "./src/routes";

async function main() {
  const app = express();

  dotenv.config({ path: path.join(__dirname, ".env.local") });

  if (process.env.VEREX_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "static")));
  }

  app.use("/api/v1", apiRouter);

  app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });
  app.get("/breed", (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  /* Add your routes here */

  if (process.env.VEREX_ENV === "development") {
    const { Assets } = await import("verex");
    new Assets().useRouter(app);
  }

  app.get("/*", (_req, res) => {
    res
      .status(404)
      .sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  const PORT = 5000;

  app.listen(PORT, () => {
    console.log();
    console.log(`  App running in port ${PORT}`);
    console.log();
    console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
  });
}

main();
