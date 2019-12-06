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
