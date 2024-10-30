// ** React Imports
import { useEffect, useState } from "react";
// import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getUser } from "../store";
import { useSelector, useDispatch } from "react-redux";

// ** Reactstrap Imports
import { Row, Col, Alert } from "reactstrap";

// ** User View Components
import UserTabs from "./Tabs";
// import PlanCard from './PlanCard'
import UserInfoCard from "./UserInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useUserDetails } from "../../../@core/services/api/user";
import { Link, useParams } from "react-router-dom";

const UserView = () => {
  // ** Hooks
  const { id } = useParams();

  const { data, error, isLoading } = useUserDetails(id);
  // ** Store Vars
  // const store = useSelector(state => state.users)
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      console.log("userDetails", data);
    }
  }, [data]);
  // ** Get suer on mount
  useEffect(() => {
    dispatch(getUser(parseInt(id)));
  }, [dispatch]);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return data !== null && data !== undefined ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard id={id} selectedUser={data} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs id={id} data={data} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">کاربر پیدا نشد</h4>
      <div className="alert-body">
        کاربر با آی دی {id} وجود ندارد. به لیست کاربران نگاه بیندازید{" "}
        <Link to={"users"}>لیست کاربران</Link>
      </div>
    </Alert>
  );
};
export default UserView;
