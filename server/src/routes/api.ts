import { Router } from "express";
import { searchBreedsByName } from "../services";

const apiRouter = Router();

apiRouter.get("/search/breeds", (req, res) => {
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

apiRouter.get("/breed", (req, res) => {
  const name = req.query.name;

  if (!name)
    return res
      .status(400)
      .json({ status: 400, error: "Query string not found" });

  if (typeof name !== "string") {
    return res
      .status(400)
      .json({ status: 400, error: "Query string not valid" });
  }

  searchBreedsByName(name)
    .then(data => {
      if (data.length == 0 || data[0].name.toLowerCase() !== name.toLowerCase())
        return res
          .status(404)
          .json({ status: 404, error: `Breed with name ${name} not found` });

      res.json({ status: 200, info: data[0] });
    })
    .catch(err => {
      console.log(err);

      res.status(500).json({ status: 500, error: "Internal Server Error" });
    });
});

export default apiRouter;
