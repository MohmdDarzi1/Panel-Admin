// ** React Imports
import { useState, useEffect, forwardRef } from "react";

// ** Table Columns
import { columns } from "./columns";
import http from "../../../@core/interceptors/interceptors";

// ** Store & Actions
// import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Reactstrap Imports
import { Card, Input, Row, Col, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
// import { getAllData, getData } from "../../../../../views/apps/user/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

// ** Table Header
const CustomHeader = ({
  rowsPerPage,
  handleFilter,
  searchTerm,
  toggleSidebar,
}) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row className="d-flex justify-content-between">
        <Col xl="5" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">نمایش</label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={(event) =>
                handleFilter({ RowsOfPage: event.target.value })
              }
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
          xl="5"
          className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pe-lg-1 p-0 mt-lg-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            {/* <label className="mb-0" htmlFor="search-invoice">
              جستجو:
            </label> */}
            <Input
              type="text"
              value={searchTerm}
              id="search-invoice"
              className="ms-50 w-100"
              onChange={(e) => handleFilter({ Query: e.target.value })}
              placeholder={"جستجوی گروه ها..."}

            />
          </div>
        </Col>
     
      </Row>
    </div>
  );
};

const Table = ({ dataToShow, onFilterChange, filter }) => {
  // ** Store Vars
  const dispatch = useDispatch();
  // const store = useSelector((state) => state.users);

  // ** States
  const [plan, setPlan] = useState("");
  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("id");

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const toggleSidebar = () => {
    setShowEditModal(!showEditModal);
  };

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    toggleEditModal();
  };

  const handleSort = (column, sortDirection) => {
    onFilterChange({
      SortingCol: sortDirection.toUpperCase(),
      SortType: column.sortField,
    });
    console.log("sort", column.sortField, sortDirection.toUpperCase());
  };
  // ** Function in get data on page change
  const handlePagination = (page) => {
    console.log("handlePagination", page);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    console.log("handlePerPage", e);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    onFilterChange(val);
  };

  const handlePlanChange = (val) => {
    console.log("handlePlanChange", val);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    //alakie
    const count = 4;
    console.log(
      "pagination",
      filter.PageNumber,
      dataToShow.totalCount,
      filter.RowsOfPage
    );
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={Math.ceil(dataToShow.totalCount / filter.RowsOfPage) || 1}
        activeClassName="active"
        forcePage={filter.PageNumber - 1}
        onPageChange={(page) => handleFilter({ PageNumber: page.selected + 1 })}
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

  return (
    <Card>
      <div className="react-dataTable react-dataTable-selectable-rows">
        <DataTable
          noHeader
          subHeader
          pagination
          responsive
          // selectableRows
          paginationServer
          columns={columns}
          onSort={handleSort}
          data={dataToShow.courseGroupDtos}
          sortIcon={<ChevronDown />}
          paginationComponent={CustomPagination}
          selectableRowsComponent={BootstrapCheckbox}
          className="react-dataTable overflow-visible"
          subHeaderComponent={
            <CustomHeader
              // roles={dataToShow.roles}
              searchTerm={filter.Query}
              // selectedRole={filter.roleId}
              rowsPerPage={filter.RowsOfPage}
              handleFilter={handleFilter}
              handlePerPage={handlePerPage}
              // toggleSidebar={toggleSidebar}
            />
          }
        />
      </div>
    </Card>
  );
};

export default Table;
