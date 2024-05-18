export interface Profile {
  name: string;
  artists: Array<String>;
  album: string;
  genre: string;
  duration_ms: number;
  popularity: number | undefined;
}
