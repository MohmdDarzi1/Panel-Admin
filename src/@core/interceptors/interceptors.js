import axios from "axios";
import {
  getItem,
  removeItem,
} from "../../@core/services/storage/storage.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const baseURL = import.meta.env.VITE_BASE_URL;

const http = axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  // console.log("interceptor", response);
  if (response.data.success != undefined && !response.data.success) {
    toast(response.data.message);
  } else if (response.data.success != undefined && response.data.success) {
    // toast(response.data.message);
  }
  return response.data;
};

const onError = (err) => {
  const navigate = useNavigate();
  // console.log("interceptor", err);
  if (err.response.status === 401) {
    removeItem("token");
    navigate("/login");
  }
  if (err.response.status >= 400 && err.response.status < 500) {
    alert("Client error: " + err.response.ErrorMessage[0]);
    alert(
      "Client error: " +
        !(err.response.ErrorMessage && err.response.ErrorMessage.length > 0) &&
        err.response.status
    );
  }

  return Promise.reject(err);
};

http.interceptors.response.use(onSuccess, onError);

http.interceptors.request.use((opt) => {
  const token = getItem("token");
  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export default http;
