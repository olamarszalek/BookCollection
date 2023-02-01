import { AlertColor } from "@mui/material";

export interface BookInterface {
  id?: number;
  title: string;
  author: string;
  desc: string;
  years?: number;
  rating: number[];
  url?: string;
}

export interface AuthorInterface {
  name: string;
  books?: string[];
  bio: string;
}

export enum PathNav {
  HOME = "/",
  ALL = "/all",
  ADD = "/add",
}

export interface navElements {
  path: PathNav;
  name: string;
}

export interface AlertInfoSnackbar {
  severity: AlertColor | undefined;
  message: string;
  addBook?: boolean;
}
