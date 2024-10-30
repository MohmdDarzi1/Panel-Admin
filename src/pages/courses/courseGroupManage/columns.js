// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
// import { store } from '@store/store'
// import { getUser } from "@src/views/apps/user/store";

// ** Icons Imports
import { Archive, MoreVertical, Trash2 } from "react-feather";


// ** Reactstrap Imports
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';


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



const statusObj = {
  pending: "light-warning",
  True: "light-success",
  False: "light-secondary",
};

export const columns = [
  {
    name: " دوره",
    sortable: true,
    minWidth: "270px",
    sortField: "courseName",
    selector: (row) => row.courseName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row)}
        <div className="d-flex flex-column">
          <Link
            // to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
            }}
            // onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className="fw-bold">{row.courseName }</span>
          </Link>
          {/* <small className="text-truncate text-muted mb-0">{row.gmail}</small> */}
        </div>
      </div>
    ),
  },
  {
    name: "گروه",
    sortable: true,
    minWidth: "152px",
    sortField: "groupName",
    selector: (row) => ( <Link
      to={`/Courses/CourseGroupManage/CourseGroupDetails/${row.id}`}
      className="user_name text-truncate text-body"
      style={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "150px",
      }}
      // onClick={() => store.dispatch(getUser(row.id))}
    >
      <span className="fw-bold">{row.groupName }</span>
    </Link>)
    
   
    // cell: (row) => renderRole(row),
  },
  {
    name: 'استاد  ',
    sortable: true,
    minWidth: '138px',
    sortField: 'teacherName',
    selector: row => row.teacherName,
    cell: row => <span className='text-capitalize'>{row.teacherName}</span>
  },
  {
    name: 'ظرفیت دوره ',
    sortable: true,
    minWidth: '70px',
    sortField: 'courseCapacity',
    selector: row => row.courseCapacity,
    cell: row => <span className='text-capitalize'>{row.courseCapacity}</span>
  },
  {
    name: 'ظرفیت گروه ',
    sortable: true,
    minWidth: '70px',
    sortField: 'groupCapacity',
    selector: row => row.groupCapacity,
    cell: row => <span className='text-capitalize'>{row.groupCapacity}</span>
  },
 
  
  {
    name: 'اقدامات',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
           
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>ویرایش</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
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
