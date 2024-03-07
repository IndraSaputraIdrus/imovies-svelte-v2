
export type MovieType = "season" | "tvseries" | "movie" | "tv" | null

export type Movie = {
  title: string,
  image?: string,
  slug?: string,
  type: MovieType
}

export type Series = {
  title: string,
  episodeList: { episode: number, season: number, link: string }[]
}

export type MovieDetails = Omit<Movie, "type"> & {
  episode: string
}
