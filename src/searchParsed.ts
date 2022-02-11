import qs from "query-string";

type SearchQueryData = {
  playerId: string;
  dark?: boolean;
};

const searchParsed = qs.parse(window.location.search) as unknown as SearchQueryData;

// killswitch
if (!searchParsed.playerId) {
  document.body.innerHTML = "Please provide playerId in search query";
}

searchParsed.dark = searchParsed.dark !== undefined;

console.log("Config:");
console.log(searchParsed);

export { searchParsed };

