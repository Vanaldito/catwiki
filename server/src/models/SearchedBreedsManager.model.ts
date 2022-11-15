export default class SearchedBreedsManager {
  private static instance: null | SearchedBreedsManager = null;
  public searchedBreeds: { [key: string]: number };

  private constructor() {
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

  public static get() {
    if (this.instance === null) {
      this.instance = new SearchedBreedsManager();
    }

    return this.instance;
  }
}
