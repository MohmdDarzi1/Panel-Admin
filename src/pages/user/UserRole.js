import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../@core/interceptors/interceptors";
import RoleCards from "./RoleCards";

const UserRole = () => {
  const [dataToShow, setDataToShow] = useState();
  const [refetch, setRefetch] = useState(1);

  const [filter, setFilter] = useState({
    Query: "",
    SortingCol: "",
    SortType: "DESC",
    roleId: "all",
    RowsOfPage: 10,
    PageNumber: 1,
  });

  const [query, setQuery] = useState("");
  const fetchUserListData = async () => {
    try {
      const res = await http(`/User/UserMannage`);
      console.log("resdata", res.roles);
      // setDataToShow(res)

      const promisArr = [];
      for (let index = 0; index < 10; index++) {
        promisArr.push(
          http(
            `/User/UserMannage?roleId=${res.roles[index].id}&PageNumber=1&RowsOfPage=${res.totalCount}`
          )
        );

        // /User/UserMannage?roleId=1
      }
      const results = await Promise.all(promisArr);
      results.forEach((result, index) => {
        res.roles[index]["userCount"] = result.listUser.length;
        res.roles[index]["userList"] = result.listUser;
      });
      console.log(res);
      setDataToShow(res);
    } catch (error) {
      console.log("test", error);
    }
    useEffect(() => {
      console.log(dataToShow);
    }, [dataToShow]);
  };

  useEffect(() => {
    fetchUserListData(query);
  }, [query, refetch]);

  const serialize = (obj) => {
    var str = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        let q = `${p}=${obj[p]}`;
        str.push(q);
      }
    }
    return "?" + str.join("&");
  };
  const handleFilterChange = (obj) => {
    console.log(obj);
    setFilter({ ...filter, ...obj });
  };

  useEffect(() => {
    if (filter.roleId == "all") {
      const { roleId, ...rest } = filter;
      setQuery(serialize(rest));
      return;
    }
    setQuery(serialize(filter));
  }, [filter]);
  return (
    <>
      <h3 className="navbar align-items-center px-4    container-xxl navbar-shadow navbar navbar-expand-lg navbar-light">
        {" "}
        لیست نقش ها
      </h3>
      <p className="mb-2">یک نقش دسترسی شما به صفحات مختلف را مشخص میکند</p>
      {dataToShow ? <RoleCards dataToShow={dataToShow.roles} /> : "loading..."}
    </>
  );
};

export default UserRole;
