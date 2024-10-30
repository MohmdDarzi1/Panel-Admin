import { Card, CardHeader, CardBody, CardTitle, CardText } from "reactstrap";

import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "./Table";
import http from "../../../@core/interceptors/interceptors";

const ListOfGroup = () => {
  const [dataToShow, setDataToShow] = useState();
  const [filter, setFilter] = useState({
    Query: "",
    SortingCol: "DESC",
    SortType: "Expire",
    // roleId: "all",
    RowsOfPage: 10,
    PageNumber: 1,
  });
  const params = useParams();

  const [query, setQuery] = useState("");
  const fetchCourseGroupData = async (query) => {
    try {
      const res = await http(`/CourseGroup${query}`);
   
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
    fetchCourseGroupData(query);
  }, [query]);
  // const queryParamHandler =() => {
  //   setFilter(prev =>{return{...prev}})
  // }

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
            onFilterChange={handleFilterChange}
            filter={filter}
          />
        ) : (
          "loading..."
        )}
      </div>
    </>
  );
};

export default ListOfGroup;
