// ** React Imports
import { forwardRef, Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown, Trash } from "react-feather";
import ReactPaginate from "react-paginate";
import { useRef } from "react";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Utility Imports
// import { useTimeOut } from "../../../utility/hooks/useTimeOut";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const DataTableServerSide = ({
  data,
  columns,
  renderTitle,
  currentPage,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
  setSearchValue,
  setSort,
  setSortColumn,
  setSelectedRows,
  handleDeleteData,
  isCourseCreateButtonShow,
  notFoundText,
  deleteSelectedRowsText,
  handleSearchFilter,
  selectableRows,
}) => {
  // ** States
  const [itemOffset, setItemOffset] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const endOffset = itemOffset + rowsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);
  const useTimeOut = () => {
    const ref = useRef();

    return (fn, ms) => {
      clearTimeout(ref.current);
      const timeOut = setTimeout(fn, ms);
      ref.current = timeOut;
    };
  };

  const textTimeOut = useTimeOut();

  const handlePageClick = (event, isFilter, currentPage) => {
    setCurrentPage(isFilter ? currentPage : event.selected + 1);
    const newOffset =
      (isFilter ? currentPage * rowsPerPage : event.selected * rowsPerPage) %
      data?.length;

    setItemOffset(newOffset);
  };

  // ** Function to handle filter
  const handleFilter = (e) => {
    handlePageClick(undefined, true, 0);

    textTimeOut(() => {
      setSearchValue(e.target.value);
    }, 800);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(data.length / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePageClick(page)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };

  // ** Handle sort
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const onSelectedRows = async (e) => {
    setSelectedRows(e.selectedRows);
    setIsDeleting(e.selectedRows);
    if (e.selectedRows?.length !== 0) setIsDeleting(true);
    else setIsDeleting(false);
  };

  return (
    <Fragment>
      <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
        <Row className="mx-2 mb-1">
          <Col xl="6" className="d-flex align-items-center p-0">
            <div className="d-flex align-items-center w-100">
              <label htmlFor="sort-select">نمایش</label>
              <Input
                className="mx-50"
                type="select"
                id="sort-select"
                value={rowsPerPage}
                onChange={(e) => handlePerPage(e)}
                style={{ width: "5rem" }}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
              <label htmlFor="sort-select">تعداد</label>
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
                placeholder={"جستجوی رزرو کننده ..."}
                type="text"
                // bsSize="sm"
                id="search-input"
                onChange={
                  handleSearchFilter ? handleSearchFilter : handleFilter
                }
              />
            </div>
          </Col>
        </Row>
        <div className="react-dataTable">
          {!currentItems || currentItems?.length === 0 ? (
            <h5 className="text-center">{notFoundText}</h5>
          ) : (
            <DataTable
              noHeader
              pagination
              paginationServer
              className="react-dataTable overflow-visible"
              columns={columns}
              onSort={handleSort}
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              data={currentItems}
              selectableRows={selectableRows}
              selectableRowsComponent={BootstrapCheckbox}
              onSelectedRowsChange={onSelectedRows}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default memo(DataTableServerSide);
