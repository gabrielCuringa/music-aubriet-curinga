import * as api from "./api";

export async function getStatsAboutLyricsLanguages() {
  let url = "/api/v1/song/lyrics/language/popularity";
  return await api.get(url);
}

export async function getGenresByPopularity(limit = 20) {
  let url = "/api/v1/artist/genres/popularity?limit=" + limit;
  return await api.get(url);
}
