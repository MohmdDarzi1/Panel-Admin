// ** React Imports
import { Fragment, useState } from "react";
import { Link, useFetcher } from "react-router-dom";

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
import UserAddRole from "../addRole/UserAddRole";

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
              placeholder={"جستجوی کاربر..."}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              {" "}
              اضافه کردن کاربر جدید
            </Button>
          </div>
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
  const [currentRole, setCurrentRole] = useState({
    value: "",
    label: "انتخاب نقش",
  });

  const [currentStatus, setCurrentStatus] = useState({
    value: true,
    label: "فعال",
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
  const { data, refetch } = useGetAllUsers(
    currentPage,
    rowsPerPage,
    searchTerm,
    currentRole?.value,
    currentStatus?.value
  );
  console.log("kdsjfkjdfk", data);
  // console.log("data23", data);
  useEffect(() => {
    if (data) {
      // create a new state based on recieved data
      // setState
      const newState = {
        data: data.listUser.map((item) => ({
          avatar: item.pictureAddress,
          fullName: item.fname + " " + item.lname,
          id: item.id,
          email: item.gmail,
          role: item.userRoles ? item.userRoles : "Student",
          active: item.active == "True" ? true : false,
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
    // dispatch(
    //   getData({
    //     sort,
    //     q: val,
    //     sortColumn,
    //     page: currentPage,
    //     perPage: rowsPerPage,
    //     role: currentRole.value,
    //     status: currentStatus.value,
    //   })
    // );
  };

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  // const toggleEditSidebar = () => setEditSidebarOpen(!editSidebarOpen);

  // ** User filter options
  const roleOptions = (data) => {
    // console.log("data", data);
    return data?.roles?.map((data) => ({
      value: data.id,
      label: data.roleName,
    }));
  };
  const statusOptions = () => {
    return [
      {
        value: true,
        label: "فعال",
      },
      {
        value: false,
        label: "غیرفعال",
      },
    ];
    // return data?.roles.map((data) => ({
    //   value: data.id,
    //   label: data.roleName, // undefined
    // }));
  };

  const planOptions = [
    { value: "", label: "Select Plan" },
    { value: "basic", label: "Basic" },
    { value: "company", label: "Company" },
    { value: "enterprise", label: "Enterprise" },
    { value: "team", label: "Team" },
  ];

  // const statusOptions = [
  //   { value: "", label: "Select Status", number: 0 },
  //   { value: "pending", label: "Pending", number: 1 },
  //   { value: "active", label: "Active", number: 2 },
  //   { value: "inactive", label: "Inactive", number: 3 },
  // ];

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
      role: currentRole.value,
      status: currentStatus?.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k]?.length > 0;
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
      name: "نام کاربر",
      sortable: true,
      minWidth: "300px",
      sortField: "fullName",
      selector: (row) => row.fullName,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            {renderClient(row)}
            <div className="d-flex flex-column">
              <Link
                to={`/users/${row.id}`}
                className="user_name text-truncate text-body"
                // onClick={() => store.dispatch(getUser(row.id))}
              >
                <span className="fw-bolder">{row.fullName}</span>
              </Link>
              <small className="text-truncate text-muted mb-0">
                {row.email}
              </small>
            </div>
          </div>
        );
      },
    },
    {
      name: "نقش کاربر",
      sortable: true,
      minWidth: "172px",
      sortField: "role",
      selector: (row) => row.role,
      cell: (row) => renderRole(row),
    },
    {
      name: "وضعیت کاربر",
      sortable: true,
      minWidth: "172px",
      sortField: "role",
      selector: (row) => row.active,
      cell: (row) => {
        console.log("rojkjkjw", row);
        return (
          // renderRole(row)

          <h5 className="text-truncate text-muted mb-0">
            <Badge
              pill
              color={row.active ? "light-success" : "light-danger"}
              className="me-1"
            >
              {row.active ? "فعال" : "غیرفعال"}
            </Badge>
          </h5>
        );
      },
    },
    {
      name: "اقدامات",
      minWidth: "100px",

      cell: (row) => {
        const deleteUserFn = useDeleteUser();
        const dispatch = useDispatch();
        const [modal, setModal] = useState(null);
        // console.log("rowuserRoles",row)

        const toggleModal = (id) => {
          if (modal !== id) {
            setModal(id);
          } else {
            setModal(null);
          }
        };
        const handleAddRoleClick = () => {
          toggleModal(row.id);
        };
        return (
          <div className="column-action">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu>
                {/* <DropdownItem
                  tag={Link}
                  className="w-100"
                  to={`${row.id}`}
                  // onClick={() => store.dispatch(getUser(row.id))}
                >
                  <FileText size={14} className="me-50" />
                  <span className="align-middle">جزئیات کاربر</span>
                </DropdownItem> */}
                <DropdownItem
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
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  href="/"
                  className="w-100"
                  onClick={(e) => {
                    console.log("row.id", row.id);
                    e.preventDefault();
                    // const params = {}
                    // store.dispatch(deleteUser(row.id));
                    deleteUserFn.mutate(
                      row.id
                      // {
                      //   onSuccess:()=> {useQueryClient(queryClient)}
                      // }
                    );
                  }}
                >
                  <Trash2 size={14} className="me-50" />
                  <span className="align-middle">حذف کاربر</span>
                </DropdownItem>
                <DropdownItem size="sm" onClick={handleAddRoleClick}>
                  <Archive size={14} className="me-50" />
                  <span className="align-middle">دسترسی</span>
                </DropdownItem>
                <UserAddRole
                  modal={modal}
                  id={row.id}
                  userName={row.fname + " " + row.lname}
                  toggleModal={toggleModal}
                  userRoles={row.role}
                  refetch={refetch}
                />
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلترها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="role-select">نقش</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions(data)}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(data) => {
                  // console.log("role data", data);
                  setCurrentRole(data);
                  // dispatch(
                  //   getData({
                  //     sort,
                  //     sortColumn,
                  //     q: searchTerm,
                  //     role: data.value,
                  //     page: currentPage,
                  //     perPage: rowsPerPage,
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
                options={statusOptions()}
                value={currentStatus}
                onChange={(data) => {
                  console.log("status", data);
                  setCurrentStatus(data);
                  // dispatch(
                  //   getData({
                  //     sort,
                  //     sortColumn,
                  //     q: searchTerm,
                  //     page: currentPage,
                  //     status: data.value,
                  //     perPage: rowsPerPage,
                  //     role: currentRole.value,
                  //   })
                  // );
                }}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
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
