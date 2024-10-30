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
import CourseInfoCard from "./CourseInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { Link, useParams } from "react-router-dom";
import {
  useCourseDetails,
  useCourseReserve,
  useGetCourseCommnets,
  useGetCourseGroup,
} from "../../../@core/services/api/courses";

const UserView = () => {
  // ** Hooks
  const { CourseId } = useParams();

  const { data, error, isLoading, refetch } = useCourseDetails(CourseId);
  const { data: data2 } = useGetCourseCommnets(CourseId);
  const { data: data3 } = useCourseReserve(CourseId);
  const { data: data4 } = useGetCourseGroup(data?.teacherId,CourseId);
  console.log("CourskkkeId",CourseId)

  console.log("data4",data4)

  // ** Store Vars
  // const store = useSelector(state => state.users)
  const dispatch = useDispatch();

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getUser(parseInt(CourseId)));
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
          <CourseInfoCard selectedCourse={data} refetch={refetch} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs
            courseReserves={data3}
            courseComments={data2}
            dataToShow={data4}
            active={active}
            toggleTab={toggleTab}
            CourseId={CourseId}
          />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">کاربر پیدا نشد</h4>
      <div className="alert-body">
        دوره با آی دی {CourseId} وجود ندارد. به لیست دوره ها نگاه بیندازید{" "}
        <Link to={"/courses"}>لیست دوره ها</Link>
      </div>
    </Alert>
  );
};
export default UserView;
