// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import {
  getCourseReserve,
  getUserCourseReserve,
} from "../../@core/services/api/home";

const GoalOverview = (props) => {
  // ** State
  const [data, setData] = useState({
    completed: "786,617",
    inProgress: "13,561",
  });
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState(" ");
  const [modalData, setModalData] = useState([]);
  const [courseReserveList, setCourseReserveList] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [acceptedCourseCount, setAcceptedCourseCount] = useState(0);
  const [rejectedCourseCount, setRejectedCourseCount] = useState(0);
  const [reserveList, setReserveList] = useState([]);

  console.log("courseReserveList", courseReserveList);

  useEffect(() => {
    const fetchCourseReserveList = async () => {
      try {
        const res = await getUserCourseReserve();
        const reserveList = [];
        for (let index = 0; index < res.length; index++) {
          const existItem = reserveList.find(
            (item) => item.courseId === res[index].courseId
          );
          if (existItem) {
            existItem.acceptedCount += res[index].accept ? 1 : 0;
            existItem.waitingCount += res[index].accept ? 0 : 1;
          } else {
            const newCourse = {
              courseId: res[index].courseId,
              courseName: res[index].courseName,
              acceptedCount: res[index].accept ? 1 : 0,
              waitingCount: res[index].accept ? 0 : 1,
            };
            reserveList.push(newCourse);
          }
        }
        console.log("we did it", reserveList);
        setReserveList(reserveList);
      } catch (error) {
        console.error("Failed to fetch course reserve data:", error);
      }
    };

    fetchCourseReserveList();
  }, []);

  useEffect(() => {
    const countCourses = () => {
      const acceptedInCourseDetails = courseReserveList.filter(
        (item) => item.accept
      ).length;

      setAcceptedCourseCount(acceptedInCourseDetails);

      const rejectedInCourseDetails = courseReserveList.filter(
        (item) => !item.accept
      ).length;
      setRejectedCourseCount(rejectedInCourseDetails);
    };

    countCourses();
  }, [courseReserveList]);

  useEffect(() => {
    if (selectedCourseId) {
      const fetchCourseDetails = async () => {
        try {
          const res = await getCourseReserve(selectedCourseId);
          setCourseDetails(res);
          console.log("res", res);
        } catch (error) {
          console.error("Failed to fetch course details:", error);
        }
      };

      fetchCourseDetails();
    }
  }, [selectedCourseId]);

  const acceptedReserveCount = (reserveList) => {
    let ReserveCount = 0;
    reserveList.forEach((element) => {
      ReserveCount += element.acceptedCount;
    });
    return ReserveCount;
  };

  const rejectedReserveCount = (reserveList) => {
    let ReserveCount = 0;
    reserveList.forEach((element) => {
      ReserveCount += element.waitingCount;
    });
    return ReserveCount;
  };
  const handleClick = (courseId, title) => {
    setSelectedCourseId(courseId);
    setModalType(title);
    setShow(true);
  };

  const options = {
    chart: {
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1,
      },
    },
    colors: ["#51e5a8"],
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: "77%",
        },
        track: {
          background: "#ebe9f1",
          strokeWidth: "50%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            color: "#5e5873",
            fontFamily: "Montserrat",
            fontSize: "2.86rem",
            fontWeight: "600",
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: [props.success],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    grid: {
      padding: {
        bottom: 30,
      },
    },
  };
  const series = [
    [
      Math.round(
        (acceptedReserveCount(reserveList) /
          (acceptedReserveCount(reserveList) +
            rejectedReserveCount(reserveList))) *
          100
      ),
    ],
    [
      Math.round(
        (rejectedReserveCount(reserveList) /
          (acceptedReserveCount(reserveList) +
            rejectedReserveCount(reserveList))) *
          100
      ),
    ],
  ];
  console.log("test ", series[1]);

  return data !== null ? (
    <Card>
      <CardHeader className="fw-bolder">
        آمار رزرو دوره های آکادمی <CardTitle tag="h4"> </CardTitle>
      </CardHeader>
      <CardBody className="p-0">
        <Row>
          <Col xs="6">
            <Chart
              options={options}
              series={series[0]}
              type="radialBar"
              height={245}
            />
          </Col>
          <Col xs="6">
            <Chart
              options={options}
              series={series[1]}
              type="radialBar"
              height={245}
              //   className="py-0"
            />
          </Col>
        </Row>
      </CardBody>
      <Row className="border-top text-center mx-0">
        <Col xs="6" className="border-end py-1">
          <CardText className="text-muted mb-0"> رزرو های تایید شده</CardText>
          <h3 className="fw-bolder mb-0">
            {" "}
            {acceptedReserveCount(reserveList)}
          </h3>
        </Col>
        <Col xs="6" className="py-1">
          رزرو های تایید نشده <CardText className="text-muted mb-0"></CardText>
          <h3 className="fw-bolder mb-0">
            {rejectedReserveCount(reserveList)}
          </h3>
        </Col>
      </Row>
    </Card>
  ) : (
    "... در حال بارگذاری"
  );
};
export default GoalOverview;
