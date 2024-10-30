import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../interceptors/interceptors";
import { APIRoutes } from "./APIRoutes/APIRoutes";

export const getCourseTop = async (count) => {
  try {
    const result = await http.get(APIRoutes.getCourseTop, {
      params: count,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getCourseList = async (PageNumber, RowsOfPage, Query) => {
  const queryObj = {
    PageNumber: PageNumber,
    RowsOfPage: RowsOfPage,
    Query: Query,
  };
  try {
    const response = await http.get(APIRoutes.getCourseList, {
      params: queryObj,
    });

    return response;
  } catch (error) {
    return false;
  }
};

// start Create Course Api
const getCreateCourse = async () => {
  try {
    const response = await http.get(APIRoutes.GetCreateCourse);

    return response;
  } catch (error) {
    return false;
  }
};
export const useGetCreateCourse = () => {
  return useQuery({
    queryKey: ["getCreateCourse"],
    queryFn: () => {
      return getCreateCourse();
    },
  });
};

const createCourse = async (formData) => {
  try {
    const response = await http.post(APIRoutes.CreateCourse, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: (formData) => {
      console.log("createCourse", formData);
      return createCourse(formData);
    },
  });
};

const CourseTech = async (courseId, data) => {
  console.log("courseId", courseId);

  try {
    const response = await http.post(
      APIRoutes.CourseTech + "?courseId=" + courseId,
      data,
      {
        // params: courseId,
        // "Content-Type": "application/json",
      }
    );

    return response;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};
export const useCourseTech = () => {
  return useMutation({
    mutationKey: ["CourseTech"],
    mutationFn: (data) => {
      return CourseTech(data.courseId, data.techIds);
    },
  });
};

export const getCourseByIdAPI = async (id) => {
  try {
    const response = await http.get(`/Course/${id}`);

    return response;
  } catch (error) {
    return false;
  }
};
export const getCourseReserveAPI = async () => {
  try {
    const response = await http.get("/CourseReserve");

    return response;
  } catch (error) {
    return false;
  }
};

export const useGetCourseReserveAPI = () => {
  return useQuery({
    queryKey: ["getCourseReserveAPI"],
    queryFn: getCourseReserveAPI,
  });
};

export const deleteCourseReserveAPI = async (id) => {
  try {
    const response = await http.delete("/CourseReserve", {
      data: {
        id,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
// end Create Course Api

export const useGetCourseList = (PageNumber, RowsOfPage, Query) => {
  return useQuery({
    queryKey: ["getCourseList", PageNumber, RowsOfPage, Query],
    queryFn: () => getCourseList(PageNumber, RowsOfPage, Query),
  });
};
export const useGetCourseTop = (count) => {
  return useQuery({
    queryKey: ["getCourseList"],
    queryFn: (data) => {
      console.log("Data", data);
      return getCourseTop(count);
    },
  });
};

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: ["getAllCourses"],
    queryFn: (data) => {
      console.log("Data", data);
      return getAllCourses();
    },
  });
};

const courseDetails = async (CourseId) => {
  try {
    const response = await http.get(`${APIRoutes.CourseDetails}/${CourseId}`);

    return response;
  } catch (error) {
    return false;
  }
};

export const useCourseDetails = (CourseId) => {
  return useQuery({
    queryKey: ["courseDetails", CourseId],
    queryFn: () => courseDetails(CourseId),
  });
};

// ChangeCourseActive
const ChangeCourseActive = async (id) => {
  try {
    const response = await http.put(APIRoutes.ChangeCourseActive, id);

    return response;
  } catch (error) {
    return false;
  }
};

export const useChangeCourseActive = () => {
  return useMutation({
    mutationFn: (id) => {
      console.log("ChangeCourseActive", id);
      return ChangeCourseActive(id);
    },
  });
};

//GetCourseCommnets

const GetCourseCommnets = async (CourseId) => {
  try {
    const response = await http.get(
      `${APIRoutes.GetCourseCommnets}/${CourseId}`
    );

    return response;
  } catch (error) {
    return false;
  }
};

export const useGetCourseCommnets = (CourseId) => {
  return useQuery({
    queryKey: ["GetCourseCommnets", CourseId],
    queryFn: () => GetCourseCommnets(CourseId),
  });
};

//CourseReserve

const CourseReserve = async (CourseId) => {
  try {
    const response = await http.get(`${APIRoutes.CourseReserve}/${CourseId}`);

    return response;
  } catch (error) {
    return false;
  }
};

export const useCourseReserve = (CourseId) => {
  return useQuery({
    queryKey: ["CourseReserve", CourseId],
    queryFn: () => CourseReserve(CourseId),
  });
};

//CourseEdit

const updateCourse = async (formData) => {
  try {
    const response = await http.put(APIRoutes.CourseEdit, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const useUpdateCourse = () => {
  return useMutation({
    mutationFn: (formData) => {
      console.log("updateCourse", formData);
      return updateCourse(formData);
    },
  });
};

const AddCourseGroup = async (formData) => {
  try {
    const result = await http.post(APIRoutes.AddCourseGroup, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("API result:", result);
    return result;
  } catch (error) {
    console.log("API error:", error.response);
    return false;
  }
};

export const useAddCourseGroup = () => {
  return useMutation({
    mutationFn: (formData) => {
      console.log("AddCourseGroup", formData);
      return AddCourseGroup(formData);
    },
  });
};

//GetCourseGroup
const GetCourseGroup = async (TeacherId, CourseId) => {
  try {
    const response = await http.get(APIRoutes.GetCourseGroup, {
      params: {
        TeacherId,
        CourseId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};
export const useGetCourseGroup = (TeacherId,CourseId) => {
  return useQuery({
    queryKey: ["GetCourseGroup",TeacherId, CourseId],
    queryFn: () => GetCourseGroup(TeacherId, CourseId),
  });
};

// const acceptCourseReserveAPI = async (courseId, courseGroupId, studentId) => {
//   const queryObj = {
//     courseId,
//     courseGroupId,
//     studentId,
//   }
//   try {
//     const response = await http.post(APIRoutes.acceptCourseReserveAPI, {
//       params: queryObj,
//     });

//     return response;
//   } catch (error) {
//     return false;
//   }
// };

const acceptCourseReserveAPI = async (courseId, courseGroupId, studentId) => {
  const body = {
    courseId,
    courseGroupId,
    studentId,
  };
  try {
    const response = await http.post(APIRoutes.acceptCourseReserveAPI, body);
    return response;
  } catch (error) {
    return false;
  }
};


// export const useAcceptCourseReserveAPI = (
//   courseId,
//   courseGroupId,
//   studentId
// ) => {
//   return useMutation({
//     mutationFn: () =>
//       acceptCourseReserveAPI(courseId, courseGroupId, studentId),
//   });
// };

export const useAcceptCourseReserveAPI = () => {
  return useMutation({
    mutationFn: ({ courseId, courseGroupId, studentId }) =>
      acceptCourseReserveAPI(courseId, courseGroupId, studentId),
  });
};
