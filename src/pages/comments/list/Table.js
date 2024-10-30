import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  MoreVertical,
  Archive,
  Trash2,
  FileText,
} from "react-feather";
import { selectThemeColors } from "@utils";
import {
  Row,
  Col,
  Card,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Badge,
  Tooltip,
} from "reactstrap";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
  useGetCommentsList,
  useAcceptCourseComment,
  useRejectCourseComment,
  useDeleteCourseComment,
} from "../../../@core/services/api/comments";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CustomHeader = ({
  store,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
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
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder={"جستجوی دوره..."}
            />
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
  const [store, setStore] = useState({
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
  });

  const { data } = useGetCommentsList(currentPage, rowsPerPage, searchTerm);

  useEffect(() => {
    if (data) {
      const newState = {
        data: data?.comments.map((item) => ({
          accept: item.accept,
          commentId: item.commentId,
          commentTitle: item.commentTitle,
          courseTitle: item.courseTitle,
          describe: item.describe,
          dislikeCount: item.dislikeCount,
          likeCount: item.likeCount,
          replyCommentId: item.replyCommentId,
          replyCount: item.replyCount,
          userFullName: item.userFullName,
          userId: item.userId,
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

  const handleFilter = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const CustomPagination = () => {
    const count = Number(Math.ceil(store.total / rowsPerPage));
    const handlePagination = (page) => setCurrentPage(page.selected + 1);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={handlePagination}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-pinate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  const dataToRender = () => {
    const filters = {
      currentPlan: "",
      status: "",
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some((k) => filters[k].length > 0);

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
    setRowsPerPage(value);
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  const columns = [
    {
      name: "نام کاربر",
      sortable: true,
      sortField: "fullName",
      selector: (row) => row?.userFullName,
      cell: (row) => (
        <Link to={`/users/${row?.userId}`}>
          <div className="d-flex justify-content-left align-items-center">
            {/* {renderClient(row)} */}
            <div className="d-flex flex-column">
              <span className="fw-bolder">{row?.userFullName}</span>
            </div>
          </div>
        </Link>
      ),
    },
    {
      name: "دوره",
      sortable: true,
      minWidth: "140px",
      // maxWidth: "120px",
      sortField: "courseTitle",
      selector: (row) => row?.courseTitle,
      cell: (row, index) => {
        const [tooltipOpen, setTooltipOpen] = useState({});

        const toggleTooltip = (id) => {
          setTooltipOpen((prev) => ({ ...prev, [id]: !prev[id] }));
        };
        const unId='tip'+index
        return (
          <>
            <h5 id={unId} className="text-truncate text-muted mb-0">
              {row?.courseTitle}
            </h5>
            <Tooltip
              isOpen={tooltipOpen[unId]}
              target={unId}
              toggle={() => toggleTooltip(unId)}
              placement="top"
              innerClassName="table-tooltip"
            >
              {row?.courseTitle}
            </Tooltip>
          </>
        );
      },
    },
    {
      name: "نمایش نظر",
      sortable: true,
      minWidth: "550px",
      // maxWidth: "650px",
      sortField: "commentTitle",
      selector: (row) => row?.describe,
      cell: (row) => (
        <span className="text-truncate text-danger mb-0">
          <span className="text-truncate text-muted mb-0">{row?.describe}</span>
        </span>
      ),
    },
    {
      name: "وضعیت نظر",
      sortable: true,
      minWidth: "80px",
      // maxWidth: "120px",
      sortField: "accept",
      selector: (row) => row?.accept,
      cell: (row) => (
        <h5 className="text-truncate text-muted mb-0">
          <Badge
            pill
            color={row?.accept ? "light-success" : "light-danger"}
            className="me-1"
          >
            {row?.accept ? "تایید شده" : "تایید نشده"}
          </Badge>
        </h5>
      ),
    },
    {
      name: "اقدامات",
      minWidth: "100px",
      cell: (row) => {
        const acceptComment = useAcceptCourseComment();
        const rejectComment = useRejectCourseComment();
        const queryClient = useQueryClient();
        const deleteComment = useDeleteCourseComment();
        console.log("row558877", row);
        return (
          <div className="column-action">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu style={{ zIndex: 8 }}>
                <DropdownItem
                  tag="a"
                  className="w-100"
                  onClick={() => {
                    acceptComment.mutate(
                      { CommentCourseId: row?.commentId },
                      {
                        onSuccess: () => {
                          toast.success("کامنت مورد نظر تایید شد");
                          queryClient.invalidateQueries({
                            mutationKey: ["AcceptCourseComment"],
                          });
                        },
                        onError: (error) => {
                          console.error("Error accepting comment:", error);
                        },
                      }
                    );
                  }}
                >
                  <FileText size={14} className="me-50" />
                  <span className="align-middle">تایید نظر</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  className="w-100"
                  onClick={() => {
                    rejectComment.mutate(
                      { CommentCourseId: row.commentId },
                      {
                        onSuccess: () => {
                          toast.success("کامنت مورد نظر رد شد");
                          queryClient.invalidateQueries({
                            mutationKey: ["RejectCourseComment"],
                          });
                        },
                        onError: (error) => {
                          console.error("Error rejecting comment:", error);
                        },
                      }
                    );
                  }}
                >
                  <Archive size={14} className="me-50" />
                  <span className="align-middle">رد نظر</span>
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  className="w-100"
                  onClick={() => {
                    deleteComment.mutate(row?.commentId, {
                      onSuccess: () => {
                        toast.success("کامنت مورد نظر حذف شد");
                        queryClient.invalidateQueries({
                          mutationKey: ["DeleteCourseComment"],
                        });
                      },
                      onError: (error) => {
                        console.error("Error deleting comment:", error);
                      },
                    });
                  }}
                >
                  <Trash2 size={14} className="me-50" />
                  <span className="align-middle">حذف نظر</span>
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
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable overflow-visible"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                store={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default UsersList;
