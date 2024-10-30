import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";

import http from "../../../../services/interceptor";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "./Table";

const ReserveManageTable = () => {
  const [dataToShow, setDataToShow] = useState();
  const [filter, setFilter] = useState({
    Query: "",
    SortingCol: "",
    SortType: "DESC",
    roleId: "all",
    RowsOfPage: 10,
    PageNumber: 1,
  });
  const params = useParams();

  const [query, setQuery] = useState("");
  const fetchUserListData = async (query) => {
    try {
      const res = await http(`/CourseReserve${query}`);
      // setDataToShow(res)

      // const promisArr = [];
      // for (let index = 0; index < res.roles.length; index++) {
      //   promisArr.push(http(`/User/UserMannage?roleId=${res.roles[index].id}`));
      //   // /User/UserMannage?roleId=1
      // }
      // const results = await Promise.all(promisArr);
      // results.forEach((result, index) => {
      //   res.roles[index]["userCount"] = result.listUser.length;
      //   res.roles[index]["userList"] = result.listUser;

      //   // console.log(result.listUser.length, res.roles[index].roleName);
      // });
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
  }, [query]);


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
      <div className="app-user-list">
        {dataToShow ? (
          <Table
            dataToShow={dataToShow}
            // onFilterChange={handleFilterChange}
            // filter={filter}
          />
        ) : (
          "loading..."
        )}
      </div>
    </>
  );
};

export default ReserveManageTable;
