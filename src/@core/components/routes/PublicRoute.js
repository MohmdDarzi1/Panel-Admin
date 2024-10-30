//  React Imports
import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-Decode";

//  Utils
import { getUserData, getHomeRouteForLoggedInUser } from "@utils";

const PublicRoute = ({ children, route }) => {
  // console.log("routeData", route);
  let flag = false;
  if (route) {
    if (!route.access) {
      return <Suspense fallback={null}>{children}</Suspense>;
    } else {
      const userData =
        localStorage.getItem("token") &&
        jwtDecode(localStorage.getItem("token"));
      // console.log("userData", userData);
      const userRoles =
        userData[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      const accessRoles = route.access;

      accessRoles.map((role) => {
        if (userRoles.includes(role)) {
          flag = true;
        }
      });
      if (!flag) {
        // alert
      }
    }
  }

  return (
    <>
      {flag ? (
        <Suspense fallback={null}>{children}</Suspense>
      ) : (
        <Navigate to={"/home"} />
      )}
    </>
  );
};

export default PublicRoute;
