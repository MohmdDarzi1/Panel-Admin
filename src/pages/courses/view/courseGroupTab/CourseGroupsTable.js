// ** React Imports
import { forwardRef, useState } from "react";

// ** Table Columns
import { columns } from "./columns";

// ** Store & Actions
// import { useDispatch, useSelector } from "react-redux";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";

// ** Reactstrap Imports
import { Card, Col, Input, Row } from "reactstrap";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
// import { getAllData, getData } from "../../../../../views/apps/user/store";
import { useDispatch } from "react-redux";
import AddGroupDetails from "./AddGroupDetails";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

// ** Table Header
const CustomHeader = ({
  // rowsPerPage,
  // handleFilter,
  // searchTerm,
  // roles,
  // selectedRole,
  toggleSidebar,
}) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="3" className="d-flex p-0">
          <button
            type="button"
            className="btn btn-primary"
            // onClick={() => toggleSidebar(CourseId)}
            onClick={toggleSidebar}
          >
            افزودن گروه جدید
          </button>
        </Col>
      </Row>
    </div>
  );
};

const CourseGroupsTable = ({ dataToShow, CourseId }) => {
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
      "pagination"
      // filter.PageNumber,
      // dataToShow.totalCount,
      // filter.RowsOfPage
    );
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        // pageCount={Math.ceil(dataToShow.totalCount / filter.RowsOfPage) || 1}
        activeClassName="active"
        // forcePage={ filter.PageNumber - 1 }
        // onPageChange={(page) => handleFilter({ PageNumber: page.selected+1 })}
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
          // pagination
          responsive
          // selectableRows
          paginationServer
          columns={columns}
          // onSort={handleSort}
          data={dataToShow}
          sortIcon={<ChevronDown />}
          paginationComponent={CustomPagination}
          // selectableRowsComponent={BootstrapCheckbox}
          className="react-dataTable overflow-visible"
          subHeaderComponent={
            <CustomHeader
              // roles={dataToShow.roles}
              // searchTerm={filter.Query}
              // selectedRole={filter.roleId}
              // rowsPerPage={filter.RowsOfPage}
              // handleFilter={handleFilter}
              // handlePerPage={handlePerPage}
              toggleSidebar={toggleSidebar}
            />
          }
        />
      </div>
      <AddGroupDetails
        isOpen={showEditModal}
        toggle={toggleSidebar}
        CourseId={CourseId}
        TeacherId={dataToShow?.teacherId}
      />
    </Card>
  );
};

export default CourseGroupsTable;
