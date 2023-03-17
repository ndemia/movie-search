export interface movieResult {
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
  imdbID: string
}

export interface searchResults {
  Response: string,
  Search: movieResult[],
  totalResults: number
}