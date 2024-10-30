import React, { useEffect, useState } from "react";
import { Card, CardHeader, Badge } from "reactstrap";
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Columns for DataTable
export const columns = [
  {
    name: "نام دانشجو",
    selector: (row) => row.studentName,
    sortable: true,
  },
  {
    name: "تاریخ رزرو",
    selector: (row) => row.reserverDate,
    sortable: true,
    cell: (row) => {
      const date = new Date(row.reserverDate);
      return date.toLocaleDateString('fa-IR');
    },
  },
  {
    name: "وضعیت",
    selector: (row) => row.accept,
    sortable: true,
    cell: (row) => (
      <Badge color={row.accept ? "success" : "danger"}>
        {row.accept ? "پذیرفته شده" : "پذیرفته نشده"}
      </Badge>
    ),
  },
];

const UserProjectsList = ({ courseReserves }) => {
  const [projectsArr, setProjectsArr] = useState([]);

  useEffect(() => {
    const formattedData = courseReserves?.map((item) => ({
      studentName: item.studentName,
      reserverDate: item.reserverDate,
      accept: item.accept,
    }));
    setProjectsArr(formattedData);
  }, [courseReserves]);

  return (
    <Card>
      <CardHeader tag="h4">لیست رزرو دوره</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className="react-dataTable overflow-visible"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserProjectsList;
