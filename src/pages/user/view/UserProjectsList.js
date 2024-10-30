// ** Reactstrap Imports
import { Card, CardHeader, Row, Col, Badge } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import moment from "moment-jalaali";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Link } from "react-router-dom";

// ** Helper functions
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};

const formatDate = (date) => {
  moment.loadPersian({ usePersianDigits: true });
  return moment(date).format("jYYYY/jMM/jDD HH:mm");
};

// ** Columns for courses and coursesReserves
const coursesColumns = [
  {
    name: "عنوان دوره",
    selector: (row) => row.title,
    sortable: true,
    minWidth: "200px",
    cell: (row) => (
      <span className="fw-bolder text-primary">
        <Link to={`/courses/${row?.courseId}`}>{row.title}</Link>
      </span>
    ),
  },
  {
    name: "توضیحات",
    selector: (row) => row.describe,
    minWidth: "300px",
    cell: (row) => (
      <span className="text-muted">{truncateText(row.describe, 50)}</span>
    ),
  },
  {
    name: "آخرین بروزرسانی",
    selector: (row) => row.lastUpdate,
    sortable: true,
    cell: (row) => (
      <span className="text-secondary">{formatDate(row.lastUpdate)}</span>
    ),
  },
];

const coursesReservesColumns = [
  {
    name: "نام دوره",
    selector: (row) => row.courseName,
    sortable: true,
    minWidth: "200px",
    cell: (row) => (
      <span className="fw-bolder text-primary">
        <Link to={`/courses/${row?.courseId}`}>{row.courseName}</Link>
      </span>
    ),
  },
  {
    name: "تاریخ رزرو",
    selector: (row) => row.reserverDate,
    sortable: true,
    cell: (row) => (
      <span className="text-secondary">{formatDate(row.reserverDate)}</span>
    ),
  },
  {
    name: "پذیرفته شده",
    selector: (row) => row.accept,
    sortable: true,
    cell: (row) => (
      <Badge color={row.accept ? "success" : "danger"}>
        {row.accept ? "پذیرفته شده" : "پذیرفته نشده"}
      </Badge>
    ),
  },
];

const UserProjectsList = ({ data }) => {
  return (
    <Card>
      <CardHeader
        tag={"div"}
        style={{ marginBottom: "-4%" }}
        className="bg-light text-dark mt-1  text-center justify-content-center "
      >
        <h3 style={{ fontWeight: "600" }}>
          {" "}
          لیست دوره های کاربر {data?.fName} {data?.lName}
        </h3>
      </CardHeader>
      <Row>
        <Col sm="12">
          <h5
            style={{ backgroundColor: "#E8E7F7" }}
            className="mt-3 mb-2 text-success text-center py-2"
          >
            {data?.courses?.length || 0} دوره تایید شده
          </h5>
          <div className="react-dataTable user-view-account-projects bg-success">
            <DataTable
              noHeader
              responsive
              columns={coursesColumns}
              data={data?.courses}
              className="react-dataTable overflow-visible"
              sortIcon={<ChevronDown size={10} />}
            />
          </div>
        </Col>
        <Col sm="12" className="mt-4">
          <h5
            style={{ backgroundColor: "#E8E7F7" }}
            className="mb-2 text-warning text-center py-2"
          >
            {data?.coursesReseves?.length || 0} دوره‌ رزرو شده
          </h5>
          <div className="react-dataTable user-view-account-projects bg-warning">
            <DataTable
              noHeader
              responsive
              columns={coursesReservesColumns}
              data={data?.coursesReseves}
              className="react-dataTable overflow-visible"
              sortIcon={<ChevronDown size={10} />}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default UserProjectsList;
