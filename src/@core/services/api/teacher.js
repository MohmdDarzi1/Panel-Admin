import { useQuery } from "@tanstack/react-query";
import http from "../../interceptors/interceptors";
import { APIRoutes } from "../api/APIRoutes/APIRoutes";

export const getAllteacher = async () => {
  try {
    const result = await http.get(APIRoutes.Allteacher);
    // if (result) {
    return result;
    // } else {
    //   return console.log("دوره ها دریافت نشد");
    // }
  } catch (error) {
    console.log("allerror", error);
  }
};

export const useGetAllTeachers = () => {
  return useQuery({
    queryKey: ["getAllTeacher"],
    queryFn: (data) => {
      console.log("Data", data);
      return getAllteacher();
    },
  });
};
