import * as api from "./api";

export async function getartistsWithMostBand() {
  let url = "/artist/member/count/band";
  return await api.get(url);
}
