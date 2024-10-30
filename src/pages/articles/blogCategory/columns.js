// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
// import { store } from '@store/store'
// import { getUser } from "@src/views/apps/user/store";

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  Eye,
  MoreVertical,
  FileText,
  Archive,
  Trash2,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { convertDateToPersian } from "../../../@core/utils/date-helper.utils";

// ** Renders Client Columns
const renderClient = (row) => {
  if (row.iconAddress) {
    return (
      <img className="me-1" src={row.iconAddress} width="32" height="32" />
    );
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        content={row.iconAddress || "John Doe"}
        color={"light-primary"}
      />
    );
  }
};

const statusObj = {
  pending: "light-warning",
  True: "light-success",
  False: "light-secondary",
};

export const columns = (handleEditCatClick) => [
  {
    name: " دسته بندی  ",
    sortable: false,
    minWidth: "80px",
    maxWidth: "140px",
    sortField: "categoryName",
    selector: (row) => row.categoryName,
    cell: (row) => (
      <div>
        <span className="fw-bold">{row.categoryName}</span>
      </div>
    ),
  },
  {
    name: "عنوان گوگل",
    sortable: false,
    minWidth: "420px",
    sortField: "googleTitle",
    selector: (row) => row.googleTitle,
    // cell: (row) => renderRole(row),
  },
  {
    name: "تاریخ ایجاد",
    sortable: false,
    minWidth: "80px",
    maxWidth: "140px",
    sortField: "insertDate",
    selector: (row) => row.insertDate,
    cell: (row) => (
      <span className="text-capitalize">
        {convertDateToPersian(row.insertDate)}
      </span>
    ),
  },
  {
    name: "توضیحات گوگل ",
    sortable: false,
    minWidth: "300px",
    maxWidth: "400px",
    sortField: "googleDescribe",
    selector: (row) => row.googleDescribe,
    cell: (row) => (
      <span
        // className="text-capitalize"
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          // maxWidth: "150px",
        }}
      >
        {row.googleDescribe}
      </span>
    ),
  },

  {
    name: "عملیات",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            {/* <DropdownItem
              tag={Link}
              className='w-100'
              // to={`/apps/user/view/${row.id}`}
              // onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>جزییات</span>
            </DropdownItem> */}
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();

                handleEditCatClick(row.id);
              }}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
