import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../interceptors/interceptors";
import { APIRoutes } from "./APIRoutes/APIRoutes";

const getCommentsList = async (PageNumber, RowsOfPage, Query) => {
  const queryObj = {
    PageNumber: PageNumber,
    RowsOfPage: RowsOfPage,
    Query: Query,
  };
  try {
    const response = await http.get(APIRoutes.getCommentsList, {
      params: queryObj,
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const useGetCommentsList = (PageNumber, RowsOfPage, Query) => {
  return useQuery({
    queryKey: ["getCommentsList", PageNumber, RowsOfPage, Query],
    queryFn: () => getCommentsList(PageNumber, RowsOfPage, Query),
  });
};

const AcceptCourseComment = async (CommentCourseId) => {
  console.log("CommentCourseId", CommentCourseId);

  try {
    const response = await http.post(
      APIRoutes.AcceptCourseComment + "?CommentCourseId=" + CommentCourseId
    );

    return response;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};
export const useAcceptCourseComment = (CommentCourseId) => {
  return useMutation({
    mutationKey: ["AcceptCourseComment"],
    mutationFn: (data) => {
      return AcceptCourseComment(data.CommentCourseId);
    },
  });
};

const RejectCourseComment = async (CommentCourseId) => {
  // console.log("CommentCourseId", CommentCourseId);

  try {
    const response = await http.post(
      `${APIRoutes.RejectCourseComment}?CommentCourseId=${CommentCourseId}`
    );

    return response;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};
export const useRejectCourseComment = () => {
  return useMutation({
    mutationKey: ["RejectCourseComment"],
    mutationFn: (data) => {
      return RejectCourseComment(data.CommentCourseId);
    },
  });
};

// DeleteCourseComment: "/Course/DeleteCourseComment",

// const DeleteCourseComment = async (CourseCommandId) => {
//   try {
//     const response = await http.delete(
//       `${APIRoutes.DeleteCourseComment}?CourseCommandId=`,
//       { data: CourseCommandId }
//     );
//     return response;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to delete user");
//   }
// };

// export const useDeleteCourseComment = () => {
//   return useMutation({
//     mutationKey: ["DeleteCourseComment"],
//     mutationFn: (data) => {
//       return DeleteCourseComment(data);
//     },
//   });
// };

const DeleteCourseComment = async (CommentCourseId) => {
  try {
    const response = await http.delete(
      `${APIRoutes.DeleteCourseComment}?CourseCommandId=${CommentCourseId}`
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete comment"
    );
  }
};

export const useDeleteCourseComment = () => {
  return useMutation({
    mutationKey: ["DeleteCourseComment"],
    mutationFn: (data) => {
      return DeleteCourseComment(data);
    },
  });
};

//userComments
const userComments = async (PageNumber, RowsOfPage, userId) => {
  const queryObj = {
    PageNumber: PageNumber,
    RowsOfPage: RowsOfPage,
    userId: userId,
  };
  try {
    const response = await http.get(APIRoutes.userComments, {
      params: queryObj,
    });

    return response;
  } catch (error) {
    return false;
  }
};
export const useUserComments = (PageNumber, RowsOfPage, userId) => {
  return useQuery({
    queryKey: ["comments",  userId],
    queryFn: () => userComments(PageNumber, RowsOfPage, userId),
  });
};

//AddReplyCourseComment
const AddReplyCourseComment = async (formData) => {
  try {
    const response = await http.post(APIRoutes.AddReplyCourseComment, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const useAddReplyCourseComment = () => {
  return useMutation({
    mutationFn: (formData) => {
      console.log("AddReplyCourseComment", formData);
      return AddReplyCourseComment(formData);
    },
  });
};