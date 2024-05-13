// export interface Profile {
//     id: string;
//     name: string;
//     nickname: string | undefined;
//     home: string;
//     airports: Array<String>;
//     avatar: string | undefined;
//     color: string | undefined;
//   }

export interface Profile {
  name: string;
  artists: Array<String>;
  album: string;
  genre: string;
  duration_ms: number;
  popularity: number | undefined;
}
