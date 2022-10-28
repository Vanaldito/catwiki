import { Router } from "express";

const apiRouter = Router();

apiRouter.get("/breeds", (req, res) => {
  const q = req.query.q;

  if (!q)
    return res
      .status(400)
      .json({ status: 400, error: "Query string not found" });

  fetch(`https://api.thecatapi.com/v1/breeds/search?q=${q}`, {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY as string,
    },
  })
    .then(res => res.json())
    .then(data => res.json({ status: 200, info: data }));
});

export default apiRouter;
