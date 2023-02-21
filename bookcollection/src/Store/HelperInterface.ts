// export interface BookInterface {
//   id?: number;
//   title: string;
//   author: string;
//   description: string;
//   years?: number;
//   rating: number[];
//   url?: string
// }

// export interface AuthorInterface {
//   author: string;
//   books: string[];
//   bio?: string;
// }

// export type GlobalStateInterface = {
//   globalBooks: BookInterface[],
//   globalAuthors: AuthorInterface[],
//   globalGetBooks: (data: BookInterface[]) => void,
//   globalGetAuthors: (data: AuthorInterface[]) => void
// }

export interface GlobalStoreInterface {
  children: JSX.Element | JSX.Element
}
export enum PathNav {
  HOME = '/',
  ALL = '/all',
  ADD = '/add'
}

export interface navElements {
  path: PathNav,
  name: string
}

// export interface Payload {
//   author: string,
//   title: string,
//   description: string,
//   years: number | undefined,
//   rating: number[],
//   url: string,
// }