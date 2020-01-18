import * as api from "./api";

export async function getArtistsWithMostBand(signal = null) {
  let url = "/artist/member/count/band";
  let result;
  if (signal == null) {
    result = await api.get(url);
  } else {
    result = await api.get(url, signal);
  }
  return result;
}

export async function getArtistsWithMostAlbums(
  signal = null,
  indexPage,
  limit
) {
  let url = "/artist/count/album?skip=" + indexPage + "&limit=" + limit;
  console.log(url);
  let result;
  if (signal == null) {
    result = await api.get(url);
  } else {
    result = await api.get(url, signal);
  }
  return result;
}

export async function getArtistById(signal = null, id) {
  let url = "https://wasabi.i3s.unice.fr/api/v1/artist/id/" + id;
  console.log(url);
  let result;
  if (signal == null) {
    result = await api.get(url);
  } else {
    result = await api.get(url, signal);
  }
  return result;
}
