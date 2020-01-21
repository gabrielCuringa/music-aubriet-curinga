import * as api from "./api";

export async function getArtistsWithMostBand() {
  let url = "/api/v1/artist/member/count/band";
  let result = await api.get(url);
  return result;
}

export async function getArtistsSearch(searchText) {
  let encoded = encodeURIComponent(searchText);
  let url = "/search/fulltext/" + encoded;
  return await api.get(url);
}

export async function getArtistByName(name) {
  let encoded = encodeURIComponent(name);
  let url = "/api/v1/artist/name/" + encoded;
  let result = await api.get(url);
  return result;
}

export async function getSongsOfAlbumsByArtistName(name) {
  let encoded = encodeURIComponent(name);
  let url = "/api/v1/artist_all/name/" + encoded;
  let result = await api.get(url);
  return result;
}

export async function getArtistsWithMostAlbums(indexPage, limit) {
  let url = "/api/v1/artist/count/album?skip=" + indexPage + "&limit=" + limit;
  let result = await api.get(url);

  return result;
}

export async function getArtistById(id) {
  let url = "/api/v1/artist_all/id/" + id;
  let result = await api.get(url);

  return result;
}
