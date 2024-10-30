// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Card } from "reactstrap";

// ** Icon Imports

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import TableServerSide from "./reserveManage/TableServerSide";
import { courseReservedColumns } from "./reserveManage/courseReservedColumns";
import {
  getCourseReserveAPI,
  useGetCourseReserveAPI,
} from "../../@core/services/api/courses";

const CourseReserved = () => {
  // ** States
  const [allReserves, setAllReserves] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState("");
  const [acceptedReserves, setAcceptedReserves] = useState();
  const [notAcceptedReserves, setNotAcceptedReserves] = useState();
  const [isAllReserves, setIsAllReserves] = useState(true);
  const [acceptReserves, setAcceptReserves] = useState(false);
  const [isNotAcceptedReserves, setIsNotAcceptedReserves] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const dataToRender = () => {
    if (isAllReserves) {
      return allReserves;
    } else if (acceptReserves) {
      return acceptedReserves;
    } else if (isNotAcceptedReserves) {
      return notAcceptedReserves;
    }
  };

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchText(value);

    if (value.length) {
      updatedData = allReserves.filter((reserve) => {
        if (reserve.studentName === null) return null;
        const startsWith = reserve?.studentName.startsWith(value.toLowerCase());

        const includes = reserve?.studentName.includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchText(value);
    }
  };
  const { data: getCourseReserves } = useGetCourseReserveAPI();
  console.log("getCourseReserves", getCourseReserves);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // const getCourseReserves = await getCourseReserveAPI();
        const getAcceptedReserves = getCourseReserves.filter((course) => {
          return course.accept === true;
        });
        const getNotAcceptedReserves = getCourseReserves.filter((course) => {
          return course.accept === false;
        });

        setAllReserves(getCourseReserves);
        setAcceptedReserves(getAcceptedReserves);
        setNotAcceptedReserves(getNotAcceptedReserves);
      } catch (error) {
        // toast.error("مشکلی در دریافت رزرو ها به وجود آمد !");
      }
    };

    fetchCourses();
  }, [getCourseReserves]);

  return (
    <div className="invoice-list-wrapper">
      <div className="app-user-list w-100"></div>
      <Card className="rounded">
        {/* <h3 className="mt-50  navbar align-items-center px-4 container-xxl navbar-shadow navbar navbar-expand-lg navbar-light bg-primary text-white">
          رزرو ها
        </h3> */}
        <TableServerSide
          data={searchText.length ? filteredData : dataToRender()}
          columns={courseReservedColumns}
          // renderTitle={renderTitle()}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchValue={setSearchText}
          notFoundText="رزروی پیدا نشد !"
          handleSearchFilter={handleFilter}
        />
      </Card>
    </div>
  );
};

export default CourseReserved;
