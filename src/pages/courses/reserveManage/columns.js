// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
// import { store } from '@store/store'
import { getUser } from "@src/views/apps/user/store";

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, Eye, MoreVertical, FileText, Archive, Trash2 } from "react-feather";


// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


// ** Renders Client Columns
// const renderClient = (row) => {
//   if (row.pictureAddress) {
//     return (
//       <img className="me-1"  width="32" height="32" />
//     );
//   } else {
//     return (
//       <Avatar
//         initials
//         className="me-1"
//         content={"John Doe"}
//         color={"light-primary"}
//       />
//     );
//   }
// };

// ** Renders Role Columns
// const renderRole = (row) => {
//   const roleObj = {
//     Student: {
//       class: "text-primary",
//       icon: User,
//     },
//     CourseAssistance: {
//       class: "text-success",
//       icon: Database,
//     },
//     TournamentAdmin: {
//       class: "text-info",
//       icon: Edit2,
//     },
//     Teacher: {
//       class: "text-warning",
//       icon: Settings,
//     },
//     Administrator: {
//       class: "text-danger",
//       icon: Slack,
//     },
//     Referee: {
//       class: "text-danger",
//       icon: Slack,
//     },
//     TournamentMentor: {
//       class: "text-danger",
//       icon: Slack,
//     },
//     Support: {
//       class: "text-danger",
//       icon: Slack,
//     },
//   };
// }
//   const Icon = roleObj[row.userRoles] ? roleObj[row.userRoles].icon : Edit2;

//   return (
//     <span className="text-truncate text-capitalize align-middle">
//       <Icon
//         size={18}
//         className={`${roleObj[row.userRoles] ? roleObj[row.userRoles].class : ""} me-50`}
//       />
//       {row.userRoles}
//     </span>
//   );
// };

const statusObj = {
  pending: "light-warning",
  True: "light-success",
  False: "light-secondary",
};

export const columns = [
  {
    name: " نام دوره  ",
    sortable: true,
    minWidth: "297px",
    // sortField: "courseName",
    selector: (row) => row.courseName,
    // cell: (row) => (
    //   <div className="d-flex justify-content-left align-items-center">
    //     {/* {renderClient(row)} */}
    //     <div className="d-flex flex-column">
    //       {/* <Link
    //         to={`/apps/user/view/${row.id}`}
    //         className="user_name text-truncate text-body"
    //         onClick={() => store.dispatch(getUser(row.id))}
    //       >
    //         <span className="fw-bold">{row.fname + " " + row.lname}</span>
    //       </Link> */}
    //       {/* <small className="text-truncate text-muted mb-0">{row.gmail}</small> */}
    //     </div>
    //   </div>
    // ),
  },
  {
    name: " دانشجو",
    sortable: true,
    minWidth: "172px",
    // sortField: "studentName",
    selector: (row) => row.studentName,
    // cell: (row) => renderRole(row),
  },
  {
    name: 'تاریخ رزرو  ',
    sortable: true,
    minWidth: '138px',
    // sortField: 'reserverDate',
    selector: row => row.reserverDate,
    cell: row => <span className='text-capitalize'>{row.reserverDate}</span>
  },
  // {
  //   name: 'شماره تماس',
  //   sortable: true,
  //   minWidth: '230px',
  //   sortField: 'phoneNumber',
  //   selector: row => row.phoneNumber,
  //   cell: row => <span className='text-capitalize'>{row.phoneNumber}</span>
  // },
  {
    name: 'وضعیت',
    sortable: true,
    minWidth: '138px',
    sortField: 'accept',
    selector: row => row.accept,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.accept]} pill>
        {row.accept ? "فعال":"غیر فعال"}
      </Badge>
    )
  },
  // {
  //   name: 'مشاهده پروفایل',
  //   minWidth: '100px',
  //   cell: row => (
  //     <Link to={`/Users/Managment/UserDetails/${row.id}`}>
  //       <Eye className='font-medium-3 text-body' />
  //     </Link>
  //   )
  // },
  
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
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
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>تایید</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={`/Courses/CourseDetails/${row.courseId}`}
              className="w-100"
              // onClick={(e) => e.preventDefault()}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">جزییات</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                // store.dispatch(deleteUser(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
];
