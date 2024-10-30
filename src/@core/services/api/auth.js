import { useMutation } from "@tanstack/react-query";
import http from "../../interceptors/interceptors";
import { APIRoutes } from "./APIRoutes/APIRoutes";

export const loginAPI = async (user) => {
  try {
    const response = await http.post(APIRoutes.loginAPI, user);
    return response;
  } catch (error) {
    return false;
  }
};

export const useLoginApi = () => {
  return useMutation({
    mutationFn: (data) => {
      console.log("DataLogin", data);
      return loginAPI(data);
    },
  });
};
