// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
import { store } from "@store/store";
import { getUser, deleteUser } from "../store";

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDeleteUser } from "../../../@core/services/api/user";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toggleEditSidebar } from "../../../redux/slices/sideBarEdit";

// ** Renders Client Columns
export const renderClient = (row) => {
  if (row.avatar && row.avatar.length) {
    return <Avatar className="me-1" img={row.avatar} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={"light-primary"}
        content={row.fullName || "-----"}
      />
    );
  }
};

// ** Renders Role Columns
export const renderRole = (row) => {
  const roleObj = {
    Administrator: {
      class: "text-success",
      icon: Database,
    },
    Student: {
      class: "text-primary",
      icon: User,
    },
    Teacher: {
      class: "text-info",
      icon: Edit2,
    },
    author: {
      class: "text-warning",
      icon: Settings,
    },
    admin: {
      class: "text-danger",
      icon: Slack,
    },
  };

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${roleObj[row.role] ? roleObj[row.role].class : ""} me-50`}
      />
      {row.role}
    </span>
  );
};

export const statusObj = {
  pending: "light-warning",
  active: "light-success",
  inactive: "light-secondary",
};

