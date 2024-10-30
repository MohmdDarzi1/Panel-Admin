import {
  Mail,
  Home,
  Airplay,
  Circle,
  LogOut,
  Users,
  Book,
  Info,
} from "react-feather";
import { removeItem } from "../../@core/services/storage/storage.services";

const handleLogout = () => {
  removeItem("token");
  // window.location.href = "/login";
  // بازگشت به صفحه ورود پس از خروج
};
export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "مدیریت کاربران",
    icon: <Users size={20} />,
    // navLink: "/users",
    children: [
      {
        id: "coursesList",
        title: "لیست  کاربران",
        icon: <Circle size={12} />,
        navLink: "/users",
      },
      {
        id: "createCourse",
        title: " مدیریت دسترسی کاربران",
        icon: <Book size={12} />,
        navLink: "/userRole",
      },
    ],
  },

  {
    id: "coursesManage",
    title: "مدیریت دوره ها",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "coursesList",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: "/courses",
      },
      {
        id: "createCourse",
        title: "ایجاد دوره",
        icon: <Book size={12} />,
        navLink: "/createCourse",
      },
      {
        id: "CourseGroupManage",
        title: " مدیریت گروه ها",
        icon: <Book size={12} />,
        navLink: "/CourseGroupManage",
      },
      {
        id: "CourseReserved",
        title: " دوره های رزرو شده",
        icon: <Book size={12} />,
        navLink: "/CourseReserved",
      },
    ],
  },
  {
    id: "articlesPage",
    title: " مدیریت اخبار",
    icon: <Info size={20} />,
    // navLink: "/second-page",
    children: [
      {
        id: "newsList",
        title: "لیست اخبار",
        icon: <Circle size={12} />,
        navLink: "/articles",
      },
      {
        id: "createNews",
        title: " ایجاد خبر",
        icon: <Circle size={12} />,
        navLink: "/createArticle",
      },
      {
        id: "BlogCategory",
        title: " دسته بندی اخبار",
        icon: <Circle size={12} />,
        navLink: "/BlogCategory",
      },
    ],
  },
  {
    id: "commentsPage",
    title: " مدیریت نظرات",
    icon: <Mail size={20} />,
    // navLink: "/second-page",
    children: [
      {
        id: "commentsList",
        title: "لیست نظرات",
        icon: <Circle size={12} />,
        navLink: "/comments",
      },
      // {
      //   id: "createCourse",
      //   title: " ایجاد خبر",
      //   icon: <Circle size={12} />,
      //   navLink: "/createArticle",
      // },
    ],
  },
  {
    id: "logOut",
    title: "خروج از حساب",
    icon: <LogOut size={20} />,
    navLink: "/logout",
  },
];
