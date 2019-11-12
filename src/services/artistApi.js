import * as api from "./api";
import { loader } from "../components/loader/loader";

export async function getartistsWithMostBand() {
  loader();
  let url = "/artist/member/count/band";
  return await api.get(url);
}
