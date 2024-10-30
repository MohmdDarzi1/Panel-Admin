import http from "../../interceptors/interceptors";

export const getActiveUserManagement = async () => {
  try {
    const response = await http.get("/User/UserMannage?IsActiveUser=true");

    return response;
  } catch (error) {
    return false;
  }
};

export const getDeActiveUserManagement = async () => {
  try {
    const response = await http.get("/User/UserMannage?IsActiveUser=false");

    return response;
  } catch (error) {
    return false;
  }
};

export const getUserCourseReserve = async () => {
  try {
    const res = await http.get("/CourseReserve");
    return res;
  } catch (error) {
    console.error("COURSE RESERVE  API Error:", error);
    return false;
  }
};

export const getCourseReserve = async (courseId) => {
  try {
    const res = await http.get(`/CourseReserve/${courseId}`);
    return res;
  } catch (error) {
    console.error("COURSE RESERVE API Error:", error);
    return false;
  }
};
