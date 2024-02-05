export type ButtonType = 'delete' | 'watch' | '';

export interface IMovie {
  id: number;
  title?: string;
  overview?: string;
  poster_path?: string;
  release_date?: string;
  isWatched: boolean;
}

export enum ActiveTabEnum {
  Favorite = 'Favorite',
  Search = 'Search',
  Watched = 'Watched',
}
