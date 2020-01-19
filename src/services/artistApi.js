import * as api from "./api";

export async function getArtistsWithMostBand() {
  let url = "/api/v1/artist/member/count/band";
  let result = await api.get(url);
  return result;
}

export async function getArtistsSearch(serachText) {
  let url = "/search/fulltext/" + serachText;
  return await api.get(url);
}

export async function getArtistByName(name) {
  let url = "/api/v1/artist/name/" + name;
  let result = await api.get(url);
  return result;
}

export async function getSongsOfAlbumsByArtistName(name) {
  let url = "/api/v1/artist_all/name/" + name;
  let result = await api.get(url);
  return result;
}

export async function getArtistsWithMostAlbums(indexPage, limit) {
  let url = "/api/v1/artist/count/album?skip=" + indexPage + "&limit=" + limit;
  let result = await api.get(url);

  return result;
}

export async function getArtistById(id) {
  let url = "/api/v1/artist/id/" + id;
  let result = await api.get(url);

  return result;
}
