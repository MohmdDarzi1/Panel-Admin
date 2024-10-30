import { useQuery } from "@tanstack/react-query";
import http from "../interceptors/interceptors";
import { APIRoutes } from "./api/APIRoutes/APIRoutes";

const getLandingReports = async () => {
  try {
    const response = await http.get(APIRoutes.LandingReports);

    return response;
  } catch (error) {
    return false;
  }
};

export const useGetLandingReports = () => {
  return useQuery({
    queryKey: ["getLandingReports"],
    queryFn: () => getLandingReports(),
  });
};
