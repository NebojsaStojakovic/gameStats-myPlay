import { getStats } from "../api/getStats";
import { useQuery } from "react-query";

export const useGetStats = () => {
  return useQuery("getStats", () => getStats());
};
