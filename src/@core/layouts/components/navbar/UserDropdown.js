// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { useSelector } from "react-redux";
import { selectdataId } from "../../../../redux/slices/userId";
import { useEffect } from "react";
import { useGetProfile } from "../../../services/api/user";

const UserDropdown = () => {
  const id = useSelector(selectdataId);

  const { data } = useGetProfile();

  useEffect(() => {
    // console.log("idid", id);
    console.log("profileData", data);
  }, [data]);
  const profilePicture = () => {
    data?.currentPictureAddress ? data?.currentPictureAddress : defaultAvatar;
  };
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {data?.fName} {data?.lName}
          </span>
          <span className="user-status">ادمین</span>
        </div>
        <Avatar
          img={
            data?.currentPictureAddress
              ? data?.currentPictureAddress
              : defaultAvatar
          }
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <User size={14} className="me-75" />
          <span className="align-middle">پروفایل کاربر</span>
        </DropdownItem> */}
        {/* <DropdownItem divider /> */}
        <DropdownItem tag={Link} to="/logout">
          <Power size={14} className="me-75" />
          <span className="align-middle">خروج از حساب</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
