// ** React Imports
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

// ** Store & Actions
import { getAllData, getData } from "../store";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  MoreVertical,
  Archive,
  Trash2,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Badge,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useNavigate } from "react-router-dom";

// slidebar
import Sidebar from "./Sidebar";
import EditSidebar from "./EditSidebar";
import {
  useDeleteUser,
  useGetAllUsers,
} from "../../../@core/services/api/user";
import { useEffect } from "react";
import { renderClient, renderRole } from "./columns";
import { useDispatch } from "react-redux";
import { toggleEditSidebar } from "../../../redux/slices/sideBarEdit";
import { useGetCourseList } from "../../../@core/services/api/courses";

// ** Table Header
const CustomHeader = ({
  store,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(store.data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const navigate = useNavigate();

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <label htmlFor="rows-per-page">تعداد</label>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            {/* <label className="mb-0" htmlFor="search-invoice">
              جستجو:
            </label> */}
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder={"جستجوی دوره..."}
            />
          </div>

          {/* <div className="d-flex align-items-center table-header-actions">
            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              {" "}
              اضافه کردن کاربر جدید
            </Button>
          </div> */}
        </Col>
      </Row>
    </div>
  );
};

const UsersList = () => {
  // ** States
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [editSidebarOpen, setEditSidebarOpen] = useState(false);

  const [currentPlan, setCurrentPlan] = useState({
    value: "",
    label: "سطح دوره",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: "",
    label: "وضعیت دوره ",
    number: 0,
  });

  // call api
  // name incoming data as store
  const [store, setStore] = useState({
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
  });
  const { data } = useGetCourseList(currentPage, rowsPerPage, searchTerm);
  console.log("CourseData", data);

  useEffect(() => {
    if (data) {
      // create a new state based on recieved data
      // setState
      const newState = {
        data: data.courseDtos.map((item) => ({
          classRoomName: item.classRoomName,
          cost: item.cost,
          courseId: item.courseId,
          isActive: item.isActive,
          levelName: item.levelName,
          title: item.title,
          isActive: item.isActive,
          lastUpdate: item.lastUpdate,
          statusName: item.statusName,
        })),
        total: data.totalCount,
        params: {},
        allData: [],
        selectedUser: null,
      };
      setStore(newState);
    }
  }, [data]);

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  // const toggleEditSidebar = () => setEditSidebarOpen(!editSidebarOpen);

  // ** User filter options

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage));

    const handlePagination = (page) => {
      // call api and change state data
      // safhe
      setCurrentPage(page.selected + 1);
    };

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        
        
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      currentPlan: currentPlan.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0;
    });

    if (store.data.length > 0) {
      return store.data;
    } else if (store.data.length === 0 && isFiltered) {
      return [];
    } else {
      return store.allData.slice(0, rowsPerPage);
    }
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    // call api and change state data
    // tedad dar har safhe
    setRowsPerPage(value);
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };
  const [data2, setData2] = useState(undefined);
  const columns = [
    {
      name: "نام دوره",
      sortable: true,
      minWidth: "300px",
      sortField: "fullName",
      selector: (row) => row.title,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            {renderClient(row)}
            <div className="d-flex flex-column">
              <Link
                to={`${row.courseId}`}
                className="user_name text-truncate text-body"
                // onClick={() => store.dispatch(getUser(row.id))}
              >
                <span className="fw-bolder">{row.title}</span>
              </Link>
              {/* <small className="d-flex flex-column">
                {row.levelName}
              </small> */}
              {/* <small className="text-truncate text-muted mb-0">
                {row.statusName}
              </small> */}
            </div>
          </div>
        );
      },
    },
    {
      name: "وضعیت دوره",
      sortable: true,
      minWidth: "172px",
      sortField: "role",
      selector: (row) => row.isActive,
      cell: (row) => (
        // renderRole(row)

        <h5 className="text-truncate text-muted mb-0">
          <Badge
            pill
            color={row.isActive ? "light-success" : "light-danger"}
            className="me-1"
          >
            {row.isActive ? "فعال" : "غیرفعال"}
          </Badge>
        </h5>
      ),
    },
    {
      name: "سطح دوره",
      sortable: true,
      minWidth: "172px",
      sortField: "role",
      selector: (row) => row.statusName,
      cell: (row) => (
        // renderRole(row)

        <h5 className="text-truncate text-muted mb-0">{row.levelName}</h5>
      ),
    },
    {
      name: "قیمت دوره",
      sortable: true,
      minWidth: "172px",
      sortField: "role",
      selector: (row) => row.cost,
      cell: (row) => (
        // renderRole(row)

        <h5 className="text-truncate text-danger mb-0">
          {" "}
          {new Intl.NumberFormat("fa-IR", {}).format(row.cost)}{" "}
          <span className="text-truncate text-muted mb-0">تومان</span>
        </h5>
      ),
    },

    {
      name: "اقدامات",
      minWidth: "100px",

      cell: (row) => {
        const deleteUserFn = useDeleteUser();
        const dispatch = useDispatch();

        return (
          <div className="column-action">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  tag={Link}
                  className="w-100"
                  to={`${row.courseId}`}
                  // onClick={() => store.dispatch(getUser(row.id))}
                >
                  <FileText size={14} className="me-50" />
                  <span className="align-middle">جزئیات دوره</span>
                </DropdownItem>
                {/* <DropdownItem
                  tag="a"
                  // href="/"
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(dispatch(toggleEditSidebar));
                    setData2(row);
                    console.log("row", row);
                  }}
                >
                  <Archive size={14} className="me-50" />
                  <span className="align-middle">ویرایش کاربر</span>
                </DropdownItem> */}
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => {
                    // console.log("row.id", row.id);
                    e.preventDefault();
                    // const params = {}
                    // store.dispatch(deleteUser(row.id));
                    deleteUserFn.mutate(
                      row.courseId
                      // {
                      //   onSuccess:()=> {useQueryClient(queryClient)}
                      // }
                    );
                  }}
                >
                  <Trash2 size={14} className="me-50" />
                  <span className="align-middle">حذف دوره</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      {/* <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلترها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col className="my-md-0 my-1" md="4">
              <Label for="plan-select">سطح</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={planOptions}
                value={currentPlan}
                onChange={(data) => {
                  setCurrentPlan(data);
                  // dispatch(
                  //   getData({
                  //     sort,
                  //     sortColumn,
                  //     q: searchTerm,
                  //     page: currentPage,
                  //     perPage: rowsPerPage,
                  //     role: currentRole.value,
                  //     currentPlan: data.value,
                  //     status: currentStatus.value,
                  //   })
                  // );
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            // onChangePage={(data) => {
            //   console.log("data", data);
            //   return data;
            // }}
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable overflow-visible"
            paginationComponent={CustomPagination}
            // console.log("data2ok",row)}}

            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      {data2 && <EditSidebar data2={data2} />}
    </Fragment>
  );
};

export default UsersList;
