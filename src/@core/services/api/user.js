import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../interceptors/interceptors";
import { APIRoutes } from "./APIRoutes/APIRoutes";

const getProfile = async (user) => {
  try {
    const response = await http.get(APIRoutes.getProfile);

    return response;
  } catch (error) {
    return false;
  }
};
const userDetails = async (id) => {
  try {
    const response = await http.get(`${APIRoutes.UserDetails}/${id}`);

    return response;
  } catch (error) {
    return false;
  }
};
export const useUserDetails = (id) => {
  return useQuery({
    queryKey: ["userDetails", id],
    queryFn: () => userDetails(id),
  });
};

const createUser = async (user) => {
  try {
    const response = await http.post(APIRoutes.CreateUser, user);

    return response;
  } catch (error) {
    return false;
  }
};
const updateUser = async (user) => {
  try {
    const response = await http.put(APIRoutes.UpdateUser, user);

    return response;
  } catch (error) {
    return false;
  }
};
const deleteUser = async (userId) => {
  try {
    const response = await http.delete(APIRoutes.DeleteUser, {
      data: { userId },
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};
const getAllUsers = async (
  PageNumber,
  RowsOfPage,
  Query,
  roleId,
  IsActiveUser
) => {
  const queryObj = {
    PageNumber: PageNumber,
    RowsOfPage: RowsOfPage,
    Query: Query,
    roleId: roleId,
    IsActiveUser: IsActiveUser,
  };
  try {
    const response = await http.get(APIRoutes.AllUsers, {
      params: queryObj,
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const useGetAllUsers = (
  PageNumber,
  RowsOfPage,
  Query,
  roleId,
  IsActiveUser
) => {
  return useQuery({
    queryKey: [
      "getAllUsers",
      PageNumber,
      RowsOfPage,
      Query,
      roleId,
      IsActiveUser,
    ],
    queryFn: () =>
      getAllUsers(PageNumber, RowsOfPage, Query, roleId, IsActiveUser),
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data) => {
      console.log("CreateUserData", data);
      return createUser(data);
    },
  });
};
export const useUpdateUser = () => {
  return useMutation({
    queryKey: ["updateUser"],
    mutationFn: (data) => {
      return updateUser(data);
    },
  });
};
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (data) => {
      console.log("DeleteUserData", data);
      return deleteUser(data);
    },
  });
};
// /User/UserMannage?roleId=${res.roles[index].id}&PageNumber=1&RowsOfPage=${res.totalCount}

