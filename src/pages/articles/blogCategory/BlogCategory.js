import { Card, CardHeader, CardBody, CardTitle, CardText} from "reactstrap";
import Spinner from "../../../@core/components/spinner/Fallback-spinner";


import http from "../../../@core/interceptors/interceptors";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "./Table";
import AddNewsCategory from "./AddNewsCategory";

const BlogCategory = () => {
  const [dataToShow, setDataToShow] = useState();
  const [filter, setFilter] = useState({
    // Query: "",
    // SortingCol: "",
    // SortType: "DESC",
    // roleId: "all",
    // RowsOfPage: 10,
    // PageNumber: 1,
  });
  const params = useParams();

  const [query, setQuery] = useState("");
  const fetchUserListData = async (query) => {
    try {
      const res = await http(`/News/GetListNewsCategory${query}`);

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


  return (
    <>
      {/* <h3 className="mt-50  navbar align-items-center px-4 container-xxl navbar-shadow navbar navbar-expand-lg navbar-light bg-primary text-white">
        دسته بندی اخبار
      </h3> */}
      <div className="app-user-list">
        {dataToShow ? (
          <Table
            dataToShow={dataToShow}
            onFilterChange={handleFilterChange}
            filter={filter}
          />
        ) : (
          <Spinner />
          // <div> sfsdfsdfdss</div>
        )}
      </div>
    </>
  );
};

export default BlogCategory;
