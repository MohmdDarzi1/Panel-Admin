// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import { useSelector } from "react-redux";
import { selectgettoken } from "../../redux/slices/token";
import { getItem } from "../../@core/services/storage/storage.services";
import { useEffect } from "react";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route

const DefaultRoute = "/login";
// const token = getItem("token");

// let DefaultRoute;
// if (!!token) {
//   DefaultRoute = "/login";
// } else if (!token) {
//   DefaultRoute = "/home";
// }

const Home = lazy(() => import("../../pages/Home"));
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));
const Courses = lazy(() => import("../../pages/courses/courses"));
const CourseDetails = lazy(() => import("../../pages/courses/view/index"));
const CreateCourse = lazy(() => import("../../pages/courses/index"));
const Users = lazy(() => import("../../pages/user/Users"));
const UserDetails = lazy(() => import("../../pages/user/view/index"));
const Logout = lazy(() => import("../../pages/logout"));
const Articles = lazy(() => import("../../pages/articles/articles"));
const BlogDetails = lazy(() =>
  import("../../pages/articles/blogDetails/BlogDetails")
);
const CreateArticle = lazy(() => import("../../pages/articles/CreateArticle"));
const Comments = lazy(() => import("../../pages/comments/Comments"));
const UserRole = lazy(() => import("../../pages/user/UserRole"));
const BlogCategory = lazy(() =>
  import("../../pages/articles/blogCategory/BlogCategory")
);
const CourseGroupManage = lazy(() =>
  import("../../pages/courses/CourseGroupManage")
);
const CourseReserved = lazy(() => import("../../pages/courses/CourseReserved"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
    access: ["Teacher", "Administrator"],
  },
  {
    path: "/home",
    element: <Home />,
    access: ["Teacher", "Administrator"],
  },
  {
    path: "/courses",
    element: <Courses />,
    access: ["Teacher", "Administrator"],
  },
  {
    path: "/courses/:CourseId",
    element: <CourseDetails />,
    access: ["Administrator"],
  },
  {
    path: "/CreateCourse",
    element: <CreateCourse />,
    access: ["Administrator"],
  },
  {
    path: "/CourseGroupManage",
    element: <CourseGroupManage />,
    access: ["Administrator"],
  },
  {
    path: "/CourseReserved",
    element: <CourseReserved />,
    access: ["Administrator"],
  },

  {
    path: "/articles",
    element: <Articles />,
    access: ["Teacher", "Administrator"],
  },
  {
    path: "/articles/:id",
    element: <BlogDetails />,
    access: ["Administrator"],
  },
  {
    path: "/CreateArticle",
    element: <CreateArticle />,
    access: ["Administrator"],
  },
  {
    path: "/BlogCategory",
    element: <BlogCategory />,
    access: ["Administrator"],
  },
  {
    path: "/comments",
    element: <Comments />,
    access: ["Administrator"],
  },

  {
    path: "/logout",
    element: <Logout />,
    // access: ["Teacher", "Administrator"],
  },
  {
    path: "/users",
    element: <Users />,
    access: ["Teacher", "Administrator"],
  },
  {
    path: "/userRole",
    element: <UserRole />,
    access: ["Administrator"],
  },

  {
    path: "/users/:id",
    element: <UserDetails />,
    access: ["Administrator"],
  },
  {
    path: "/sample",
    element: <Sample />,
    access: ["Teacher", "Administrator"],
  },
  {
    path: "/second-page",
    element: <SecondPage />,
    access: ["Teacher", "Administrator"],
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },

  {
    path: "/error",
    element: <Error />,
    access: ["Teacher", "Administrator"],

    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    access: ["Teacher", "Administrator"],

    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getItem("token");
    {
      !token && navigate("/login");
    }
  }, []);
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
