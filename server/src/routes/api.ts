import { Router } from "express";
import { searchBreedsByName } from "../services";

const apiRouter = Router();

apiRouter.get("/breeds", (req, res) => {
  const q = req.query.q;

  if (!q)
    return res
      .status(400)
      .json({ status: 400, error: "Query string not found" });

  if (typeof q !== "string") {
    return res
      .status(400)
      .json({ status: 400, error: "Query string not valid" });
  }

  searchBreedsByName(q)
    .then(data => res.json({ status: 200, info: data }))
    .catch(err => {
      console.log(err);

      res.status(500).json({ status: 500, error: "Internal Server Error" });
    });
});

export default apiRouter;
