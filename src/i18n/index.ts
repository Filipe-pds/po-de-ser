import pt from "./pt";
import en from "./en";

export const dictionary = {
  pt,
  en,
} as const;

export type Dictionary = typeof pt;