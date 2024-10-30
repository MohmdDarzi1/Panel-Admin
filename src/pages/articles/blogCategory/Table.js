// ** React Imports
import { forwardRef, useState } from "react";

// ** Table Columns
import { columns } from "./columns";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";

// ** Reactstrap Imports
import { Card, Col, Input, Label, Row } from "reactstrap";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import AddNewsCategory from "./AddNewsCategory";
import EditNewsCategory from "./EditNewsCategory";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

// ** Table Header
const CustomHeader = ({ handleFilter, handleAddCatClick }) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col sm="6">
          <div className="d-flex align-items-center w-100">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleAddCatClick();
              }}
            >
              دسته بندی جدید
            </button>
          </div>
        </Col>
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            {/* <Label className="me-1 mt-one" for="search-input">
            جستجو
          </Label> */}
            <Input
              className="ms-50 w-100"
              // style={{ width: "5rem" }}
              type="text"
              id="search-input"
              onChange={handleFilter}
              placeholder="جستجوی دسته بندی"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const Table = ({ dataToShow, onFilterChange, filter }) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedCatId, setSelectedCatId] = useState(null);

  const toggleShowModal = () => setShow(!show);
  const toggleEditModal = () => setEdit(!edit);
  const handleEditCatClick = (id) => {
    setSelectedCatId(id);

    toggleEditModal();
  };
  const handleAddCatClick = () => {
    setShow();
    toggleShowModal();
  };
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const endOffset = itemOffset + rowsPerPage;
  const currentItems = dataToShow?.slice(itemOffset, endOffset);

  const handlePageClick = (event, isFilter, currentPage) => {
    setCurrentPage(isFilter ? currentPage : event.selected + 1);
    const newOffset =
      (isFilter ? currentPage * rowsPerPage : event.selected * rowsPerPage) %
      dataToShow?.length;

    setItemOffset(newOffset);
  };

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = dataToShow.filter((category) => {
        const startsWith = category.categoryName
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = category.categoryName
          .toLowerCase()
          .includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(dataToShow.length / rowsPerPage);
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={
          searchValue.length
            ? Math.ceil(filteredData.length / rowsPerPage)
            : count || 1
        }
        onPageChange={(page) => handlePageClick(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        activeClassName="active"
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
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };
  // ** Table data to render

  return (
    <Card>
      <div className="react-dataTable react-dataTable-selectable-rows">
        <DataTable
          noHeader
          subHeader
          paginationComponent={CustomPagination}
          data={searchValue.length ? filteredData : currentItems}
          pagination
          responsive
          paginationServer
          columns={columns(handleEditCatClick)}
          onSort={handleSort}
          sortIcon={<ChevronDown />}
          selectableRowsComponent={BootstrapCheckbox}
          className="react-dataTable overflow-visible"
          subHeaderComponent={
            <CustomHeader
              handleFilter={handleFilter}
              handleAddCatClick={handleAddCatClick}
            />
          }
        />
      </div>
      <AddNewsCategory
        category={dataToShow}
        isOpen={show}
        toggle={() => setShow(!show)}
      />
      <EditNewsCategory
        isOpen={edit}
        toggle={toggleEditModal}
        catId={selectedCatId}
      />
    </Card>
  );
};

export default Table;
