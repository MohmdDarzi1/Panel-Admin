import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";
import RoleCards from "../@core/layouts/components/users/userManagment/RoleCards";
import Table from "../list/Table";

import http from "../@core/services/interceptor";
import { useState } from "react";
import { useEffect } from "react";

const UserManagment = () => {
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
  const fetchUserListData = async (query) => {
    try {
      const res = await http(`/User/UserMannage${query}`);
      console.log("resdata", res);
      // setDataToShow(res)

      const promisArr = [];
      for (let index = 0; index < res.roles.length; index++) {
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

        // console.log(result.listUser.length, res.roles[index].roleName);
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
      <h3
        className="mt-50  navbar align-items-center px-4 container-xxl navbar-shadow navbar navbar-expand-lg navbar-light bg-primary text-white"
        // style={{ backgroundColor: "#6f42c1" }}
      >
        لیست کاربران دارای نقش
      </h3>

      <div className="app-user-list">
        {dataToShow ? (
          <Table
            dataToShow={dataToShow}
            onFilterChange={handleFilterChange}
            filter={filter}
            setRefetch={setRefetch}
            refetch={refetch}
          />
        ) : (
          "loading..."
        )}
      </div>
    </>
  );
};

export default UserManagment;
