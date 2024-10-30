// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from "react-feather";

// ** User Components

import Connections from "./Connections";
import CourseTimeLine from "./CourseTimeLine";
import CourseProjectsList from "./CourseProjectsList";
import CourseComments from "./CourseComments";
import CourseGroupsTable from "./courseGroupTab/CourseGroupsTable";

const UserTabs = ({
  CourseId,
  dataToShow,
  courseReserves,
  courseComments,
  active,
  toggleTab,
}) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">اطلاعات دوره ها</span>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold"> نظرات کاربران </span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold"> گروه های دوره </span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <CourseProjectsList courseReserves={courseReserves} />
          {/* <CourseTimeLine /> */}
          {/* <InvoiceList /> */}
        </TabPane>

        <TabPane tabId="2">
          <CourseComments courseComments={courseComments} />
        </TabPane>
        <TabPane tabId="3">
          <CourseGroupsTable dataToShow={dataToShow} CourseId={CourseId} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
