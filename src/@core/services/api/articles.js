import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../../interceptors/interceptors";
import { APIRoutes } from "./APIRoutes/APIRoutes";

const getArticleList = async (PageNumber, RowsOfPage, Query) => {
  try {
    const response = await http.get(APIRoutes.getArticleList, {
      params: { PageNumber, RowsOfPage, Query },
    });
    console.log("articlesRes", response?.news[0].id);
    return response;
  } catch (error) {
    return false;
  }
};

export const useGetArticleList = (PageNumber, RowsOfPage, Query) => {
  return useQuery({
    queryKey: ["getArticleList", PageNumber, RowsOfPage, Query],
    queryFn: () => getArticleList(PageNumber, RowsOfPage, Query),
  });
};

const ArticleDetails = async (id) => {
  try {
    const response = await http.get(APIRoutes.ArticleDetails, {
      params: { id },
    });
    // console.log("articlesRes", response?.news[0].id);
    return response;
  } catch (error) {
    return false;
  }
};
export const useArticleDetails = (id) => {
  return useQuery({
    queryKey: ["ArticleDetails", id],
    queryFn: () => ArticleDetails(id),
  });
};

const getListNewsCategory = async () => {
  try {
    const response = await http.get(APIRoutes.GetListNewsCategory);
    return response;
  } catch (error) {
    return false;
  }
};
export const useGetListNewsCategory = () => {
  return useQuery({
    queryKey: ["getListNewsCategory"],
    queryFn: () => {
      return getListNewsCategory();
    },
  });
};

export const updateNewsCategoryAPI = async (data) => {
  try {
    const response = await http.put(APIRoutes.UpdateNewsCategory, data);

    return response;
  } catch (error) {
    return false;
  }
};
const createNews = async (formData) => {
  try {
    const response = await http.post(APIRoutes.CreateNews, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const useCreateNews = () => {
  return useMutation({
    mutationFn: (formData) => {
      console.log("createNews", formData);
      return createNews(formData);
    },
  });
};

export const createNewsCategoryAPI = async (data) => {
  try {
    const response = await http.post(APIRoutes.CreateNewsCategory, data);

    return response;
  } catch (error) {
    return false;
  }
};


// 
export const getNewsDetail = async (id) => {
  try {
    const res = await http.get(`/News/${id}`);
    return res;
  } catch (error) {
    console.error("USER DETAIL API Error:", error);
    return false;
  }
};

export const deleteBlogAPI = async ( id) => {
  try {
    const response = await http.delete("/News/DeleteNewsFile", {
      data: {
        id,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const convertDateToPersian = (date) => {
  const dateObj = new Date(date);

  const persianDate = dateObj.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return persianDate;
};

export const activeAndInactiveBlogAPI = async (active, id) => {
  try {
    const formData = new FormData();
    formData.append('active', active);
    formData.append('id', id);

    const response = await http.put("/News/ActiveDeactiveNews", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const getCreateCourse = async () => {
  try {
    const res = await http.get("/Course/GetCreate");
    return res;
  } catch (error) {
    console.error(" GET CREATE COURSE API Error:", error);
    return false;
  }
};

export const getNewsCategoryListsAPI = async () => {
  try {
    const response = await http.get("/News/GetListNewsCategory");

    return response;
  } catch (error) {
    return false;
  }
};

export const updateNewsAPI = async (data) => {
  try {
    const response = await http.put("/News/UpdateNews", data);

    return response;
  } catch (error) {
    return false;
  }
};

export const getAdminNewsCommentsAPI = async (newsId) => {
  try {
    const response = await http.get("/News/GetAdminNewsComments", {
      params: {
        newsId,
      },
    });

    return response;
  } catch (error) {
    return false;
  }
};

export const addNewsReplyCommentAPI = async (
  newsId,
  userIpAddress,
  title,
  describe,
  userId,
  parentId
) => {
  try {
    const response = await http.post("/News/CreateNewsReplyComment", {
      newsId,
      userIpAddress,
      title,
      describe,
      userId,
      parentId,
    });

    return response;
  } catch (error) {
    return false;
  }
};