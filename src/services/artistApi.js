import * as api from "./api";

export async function getartistsWithMostBand() {
  let url = "/api/v1/artist/member/count/band";
  return await api.get(url);
}
