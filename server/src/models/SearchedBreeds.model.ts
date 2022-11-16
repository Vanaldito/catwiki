import { Document, model, Schema } from "mongoose";

interface SearchedBreedsDocument extends Document {
  breedName: string;
  breedDescription?: string;
  breedImageId?: string;
  searches: number;
}

const searchedBreedsSchema = new Schema<SearchedBreedsDocument>({
  breedName: { type: String, required: true },
  breedDescription: String,
  breedImageId: String,
  searches: { type: Number, required: true },
});

const SearchedBreeds = model<SearchedBreedsDocument>(
  "SearchedBreeds",
  searchedBreedsSchema
);

export default SearchedBreeds;
