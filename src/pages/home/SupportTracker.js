// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import axios from "axios";
import Chart from "react-apexcharts";
import { Circle } from "react-feather";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const SupportTracker = (props) => {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (props?.activeUser?.totalCount && props?.deActiveUser?.totalCount)
      setTotalCount(
        props?.activeUser?.totalCount + props?.deActiveUser?.totalCount
      );
  }, [props]);

  console.log("props?.activeUser?.totalCount", props?.activeUser?.totalCount);
  console.log(
    "props?.deActiveUser?.totalCount",
    props?.deActiveUser?.totalCount
  );

  const options = {
    labels: ["تمام کاربران", "کاربران فعال", "کاربران غیرفعال"],
    plotOptions: {
      radialBar: {
        size: 150,
        hollow: {
          size: "20%",
        },
        track: {
          strokeWidth: "100%",
          margin: 15,
        },
        dataLabels: {
          value: {
            fontSize: "1rem",
            colors: "#5e5873",
            fontWeight: "500",
            offsetY: 5,
          },
          total: {
            show: true,
            label: "آمار",
            fontSize: "1.286rem",
            fontfamily:"IRANSans",
            colors: "#5e5873",
            fontWeight: "500",
            formatter() {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return;
            },
          },
        },
      },
    },
    colors: [props.primary, props.warning, props.danger],
    stroke: {
      lineCap: "round",
    },
    chart: {
      height: 355,
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1,
      },
    },
  };

  const series = [
   100,
    Math.round(
      (props?.activeUser?.totalCount /
        (props?.activeUser?.totalCount + props?.deActiveUser?.totalCount)) *
        100
    ),
    Math.round(
      (props?.deActiveUser?.totalCount /
        (props?.activeUser?.totalCount + props?.deActiveUser?.totalCount)) *
        100
    ),
  ];
  //   series = [70, 52, 26]

  return props.activeUser || props.deActiveUser !== null ? (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">آمار کاربران</CardTitle>
        <UncontrolledDropdown className="chart-dropdown">
          <DropdownToggle
            color=""
            className="bg-transparent btn-sm border-0 p-50"
          ></DropdownToggle>
          {/* <DropdownMenu end>
            {data.last_days.map((item) => (
              <DropdownItem className="w-100" key={item}>
                {item}
              </DropdownItem>
            ))}
          </DropdownMenu> */}
        </UncontrolledDropdown>
      </CardHeader>
      <CardBody>
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={325}
        />
        <div className="d-flex justify-content-between mb-1">
          <div className="d-flex align-items-center">
            <Circle size={15} className="text-primary" />
            <span className="fw-bold ms-75">تعداد تمامی کاربران</span>
          </div>
          <span>
            {props?.activeUser?.totalCount + props?.deActiveUser?.totalCount}
          </span>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <div className="d-flex align-items-center">
            <Circle size={15} className="text-warning" />
            <span className="fw-bold ms-75">تعداد کاربران فعال</span>
          </div>
          <span>{props?.activeUser?.totalCount}</span>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Circle size={15} className="text-danger" />
            <span className="fw-bold ms-75">تعداد کاربران غیرفعال</span>
          </div>
          <span>{props?.deActiveUser?.totalCount}</span>
        </div>
      </CardBody>
    </Card>
  ) : null;
};

export default SupportTracker;
