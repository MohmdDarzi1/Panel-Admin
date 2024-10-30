import http from "../../../@core/interceptors/interceptors";

export const addUserAccessAPI = async (enable, roleId, userId) => {
  try {
    const response = await http.post(
      `/User/AddUserAccess`,
      {
        roleId,
        userId,
      },
      {
        params: {
          Enable: enable,
        },
      }
    );

    return response;
  } catch (error) {
    return false;
  }
};