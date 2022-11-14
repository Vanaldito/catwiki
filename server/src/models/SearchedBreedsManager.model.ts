export default class SearchedBreedsManager {
  public searchedBreeds: { [key: string]: number };

  public constructor() {
    this.searchedBreeds = {};
  }

  public addSearch(breedName: string) {
    const key = breedName.toLowerCase();

    if (!(key in this.searchedBreeds)) {
      this.searchedBreeds[key] = 0;
    }

    this.searchedBreeds[key]++;
  }

  public get mostSearchedBreeds() {
    const mostSearchedBreeds = Object.keys(this.searchedBreeds)
      .sort((a, b) => this.searchedBreeds[b] - this.searchedBreeds[a])
      .splice(0, 10);

    return mostSearchedBreeds;
  }
}
