import { connect } from "mongoose";
import env from "../../environment";
import SearchedBreeds from "./SearchedBreeds.model";

export default class SearchedBreedsManager {
  private static instance: null | SearchedBreedsManager = null;

  private constructor() {
    connect(env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }).catch(err => console.error(err));
  }

  public async addSearch(breedName: string) {
    const name = breedName.toLowerCase();

    const doc =
      (await SearchedBreeds.findOne({ breed: name })) ??
      new SearchedBreeds({ breed: name, searches: 0 });

    doc.searches++;
    doc.save();
  }

  public async getMostSearchedBreeds() {
    const docs = await SearchedBreeds.find({})
      .sort({ searches: "desc" })
      .limit(10);

    return docs;
  }

  public static get() {
    if (this.instance === null) {
      this.instance = new SearchedBreedsManager();
    }

    return this.instance;
  }
}
