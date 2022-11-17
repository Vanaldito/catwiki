import express from "express";
import path from "path";

import { apiRouter } from "./src/routes";
import { getImageById } from "./src/services";

async function main() {
  const app = express();

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
  app.get("/most-searched-breeds", (_req, res) => {
    res.sendFile(path.join(__dirname, process.env.VEREX_HTML_PATH as string));
  });

  app.get("/images/:imageId", (req, res) => {
    const imageId = req.params.imageId;

    if (!imageId)
      return res.status(400).json({ status: 400, error: "Image id not found" });

    getImageById(imageId)
      .then(data => {
        if ("url" in data) {
          res.redirect(data.url);
        } else {
          res.status(404).json({
            status: 404,
            error: `Image with id ${imageId} not found`,
          });
        }
      })
      .catch(err => {
        console.log(err);

        res.status(500).json({ status: 500, error: "Internal server error" });
      });
  });

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
