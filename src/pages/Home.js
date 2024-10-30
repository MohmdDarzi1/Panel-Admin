import { useEffect } from "react";
import { Flag, Folder, Framer, User } from "react-feather";
import { Col, Row } from "reactstrap";

// ** Reactstrap Imports
// import { Row, Col } from "reactstrap";
// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import { useContext, useState } from "react";
import {
  getActiveUserManagement,
  getDeActiveUserManagement,
} from "../@core/services/api/home";
import { useGetLandingReports } from "../@core/services/landingReports";
import GoalOverview from "./home/GoalOverview";
import SupportTracker from "./home/SupportTracker";

const Home = () => {
  //SupportTracker
  const [userManageData, setManageUserData] = useState("");
  const [userDeActiveManageData, setDeActiveManageUserData] = useState("");

  // const { data: data2 } = useGetAllUsers();
  const { data } = useGetLandingReports();
  console.log("allData", data);

  //SupportTracker
  const fetchActiveUserManageData = async () => {
    try {
      const res = await getActiveUserManagement();
      setManageUserData(res);
    } catch (error) {
      console.error("Failed to fetch active user management data:", error);
    }
  };
  useEffect(() => {
    fetchActiveUserManageData();
  }, []);

  const fetchDeActiveUserManageData = async () => {
    try {
      const res = await getDeActiveUserManagement();
      setDeActiveManageUserData(res);
      // console.log("userDeActiveManageData",res)
    } catch (error) {
      console.error("Failed to fetch deactive user management data:", error);
    }
  };
  useEffect(() => {
    fetchDeActiveUserManageData();
  }, []);

  const { colors } = useContext(ThemeColors);
  const trackBgColor = "#e9ecef";
  const context = useContext(ThemeColors)

  return (
    <>
    
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="تعداد کل دوره ها"
            icon={<Flag size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data?.courseCount}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="تعداد مقالات"
            icon={<Folder size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">{data?.newsCount}</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="تعداد دانش آموزان"
            icon={<User size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data?.studentCount}</h3>
            }
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="تعداد اساتید"
            icon={<Framer size={20} />}
            renderStats={
              <h3 className="fw-bolder mb-75">{data?.teacherCount}</h3>
            }
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col xl="6" md="6" xs="12">
          <SupportTracker
            activeUser={userManageData}
            deActiveUser={userDeActiveManageData}
            primary={context.colors.primary.main}
            warning={context.colors.warning.main}
            danger={context.colors.danger.main}
          />
        </Col>
        <Col lg="6" md="6" xs="12" className="h-">
          <GoalOverview success={colors.success?.main} />
        </Col>
      </Row>
    </>
  );
};

export default Home;
