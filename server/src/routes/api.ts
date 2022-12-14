import { Router } from "express";
import { SearchedBreedsManager } from "../models";
import { searchBreedsByName } from "../services";

const apiRouter = Router();

const searchedBreedsManager = SearchedBreedsManager.get();

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

apiRouter.get("/breed", async (req, res) => {
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

  try {
    const breeds = await searchBreedsByName(name);

    if (
      breeds.length == 0 ||
      breeds[0].name.toLowerCase() !== name.toLowerCase()
    )
      return res
        .status(404)
        .json({ status: 404, error: `Breed with name ${name} not found` });

    const breed = breeds[0];

    await searchedBreedsManager.addSearch(
      breed.name,
      breed.description,
      breed.reference_image_id
    );

    res.json({ status: 200, info: breed });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

apiRouter.get("/most-searched-breeds", async (_req, res) => {
  try {
    const mostSearchedBreeds =
      await searchedBreedsManager.getMostSearchedBreeds();

    res.json({ status: 200, info: mostSearchedBreeds });
  } catch (err) {
    console.log(err);

    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
});

export default apiRouter;
