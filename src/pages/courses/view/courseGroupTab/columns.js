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
  Archive,
  Trash2,
} from "react-feather";
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// ** Reactstrap Imports

// ** Renders Client Columns
const renderClient = (row) => {
  if (row.pictureAddress) {
    return (
      <img className="me-1" src={row.pictureAddress} width="32" height="32" />
    );
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        content={row.fname || "John Doe"}
        color={"light-primary"}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    Student: {
      class: "text-primary",
      icon: User,
    },
    CourseAssistance: {
      class: "text-success",
      icon: Database,
    },
    TournamentAdmin: {
      class: "text-info",
      icon: Edit2,
    },
    Teacher: {
      class: "text-warning",
      icon: Settings,
    },
    Administrator: {
      class: "text-danger",
      icon: Slack,
    },
    Referee: {
      class: "text-danger",
      icon: Slack,
    },
    TournamentMentor: {
      class: "text-danger",
      icon: Slack,
    },
    Support: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.userRoles] ? roleObj[row.userRoles].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${
          roleObj[row.userRoles] ? roleObj[row.userRoles].class : ""
        } me-50`}
      />
      {row.userRoles}
    </span>
  );
};

const statusObj = {
  pending: "light-warning",
  True: "light-success",
  False: "light-secondary",
};

export const columns = [
  {
    name: "نام گروه  ",
    sortable: true,
    minWidth: "297px",
    sortField: "groupName",
    selector: (row) => row.groupName,
  },
  {
    name: "ظرفیت دوره",
    sortable: true,
    minWidth: "172px",
    sortField: "groupCapacity",
    selector: (row) => row.groupCapacity,
    // cell: (row) => renderRole(row),
  },
  {
    name: "نام استاد  ",
    sortable: true,
    minWidth: "138px",
    sortField: "teacherName",
    selector: (row) => row.teacherName,
    // cell: row => <span className='text-capitalize'>{row.profileCompletionPercentage}</span>
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
            <DropdownItem
              // tag={Link}
              // to={`/Courses/CourseDetails/${row.courseId}`}
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">جزییات</span>
            </DropdownItem>
            <DropdownItem
              // tag='a'
              // href='/'
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                console.log(row)
                // store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
