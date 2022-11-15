import { Document, model, Schema } from "mongoose";

interface ISearchedBreeds extends Document {
  breed: string;
  searches: number;
}

const searchedBreedsSchema = new Schema<ISearchedBreeds>({
  breed: { type: String, required: true },
  searches: { type: Number, required: true },
});

const SearchedBreeds = model<ISearchedBreeds>(
  "SearchedBreeds",
  searchedBreedsSchema
);

export default SearchedBreeds;
