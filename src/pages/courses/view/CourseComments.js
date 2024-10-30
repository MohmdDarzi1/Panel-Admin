// ** Reactstrap Imports
import { Card, CardHeader } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import moment from 'moment-jalaali';

moment.loadPersian({usePersianDigits: true});

const CourseComments = ({ courseComments }) => {
  const columns = [
    {
      name: "نویسنده",
      selector: (row) => row.author,
      sortable: true,
    },
    {
      name: "عنوان",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "توضیحات",
      selector: (row) => row.describe,
      sortable: true,
      minWidth: '400px', // تغییر اندازه ستون
    },
    {
      name: "تاریخ درج",
      selector: (row) => moment(row.insertDate).format('jYYYY/jM/jD HH:mm:ss'),
      sortable: true,
      minWidth: '180px',
    },
  ];

  return (
    <Card>
      <CardHeader tag="h4">لیست نظرات کاربران</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={courseComments}
          className="react-dataTable overflow-visible"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default CourseComments;
