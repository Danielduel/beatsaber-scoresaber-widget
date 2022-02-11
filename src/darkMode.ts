import { searchParsed } from "./searchParsed";

export const darkMode = (light: string, dark: string) => {
  return searchParsed.dark
    ? () => dark
    : () => light;
}

