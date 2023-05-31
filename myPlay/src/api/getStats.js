import { axios } from "./axios";

export const getStats = () => {
  return axios({
    method: "get",
    url: "/",
  });
};
