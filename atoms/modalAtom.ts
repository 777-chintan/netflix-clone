import { DocumentData } from "firebase/firestore";
import { Movie } from "../typing";
import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const modalMovieState = atom<Movie | DocumentData | null>({
  key: "modalMovie",
  default: null,
});
