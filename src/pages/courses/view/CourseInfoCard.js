import React, { useState, Fragment, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
} from "reactstrap";
import Swal from "sweetalert2";
import { ThumbsUp, MessageSquare } from "react-feather";
import withReactContent from "sweetalert2-react-content";
import Avatar from "@components/avatar";
import "@styles/react/libs/react-select/_react-select.scss";
import { useChangeCourseActive } from "../../../@core/services/api/courses";
import { useQueryClient } from "@tanstack/react-query";
import EditModal from "./EditModal";

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedCourse, refetch }) => {
  console.log("selectedCourse22", selectedCourse);
  useEffect(() => {
    console.log("data2:");
  }, [refetch]);

  const [show2, setShow2] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: changeCourseActive } = useChangeCourseActive();

  const renderCourseImg = () => {
    if (selectedCourse.imageAddress !== "undefined") {
      return (
        <img
          height="110"
          width="110"
          alt="course-avatar"
          src={selectedCourse.imageAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mt-3 mb-2"
          content={selectedCourse.title}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };

  const handleStatusToggle = () => {
    const newStatus = !selectedCourse.isActive;
    const action = newStatus ? "فعال" : "غیرفعال";
    const actionPast = newStatus ? "فعال شد" : "غیرفعال شد";

    MySwal.fire({
      title: `آیا مطمئن هستید؟`,
      text: `این عملیات قابل بازگشت نیست!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `بله، ${action} کن!`,
      cancelButtonText: "لغو",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.value) {
        changeCourseActive(
          { id: selectedCourse.courseId, active: newStatus },
          {
            onSuccess: () => {
              queryClient.invalidateQueries("courses");
              MySwal.fire({
                icon: "success",
                title: `${actionPast}!`,
                text: `دوره با موفقیت ${actionPast}.`,
                customClass: {
                  confirmButton: "btn btn-success",
                },
              });
            },
            onError: () => {
              MySwal.fire({
                icon: "error",
                title: "خطا!",
                text: `خطایی در ${action} کردن دوره رخ داد.`,
                customClass: {
                  confirmButton: "btn btn-danger",
                },
              });
            },
          }
        );
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو شد",
          text: `عملیات ${action} لغو شد :)`,
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  const convertToPersianDigits = (number) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
  };

  const formatCost = (cost) => {
    const persianDigits = convertToPersianDigits(cost);
    return persianDigits.replace(/\B(?=(\d{3})+(?!\d))/g, "،");
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderCourseImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>دوره {selectedCourse.title}</h4>
                  <Row>
                    <h5> وضعیت ثبت نام:</h5>
                    <Badge
                      className="text-capitalize"
                      color={
                        selectedCourse.courseStatusName === "شروع ثبت نام"
                          ? "success"
                          : "light-danger"
                      }
                    >
                      {selectedCourse.courseStatusName}
                    </Badge>
                  </Row>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <ThumbsUp className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedCourse.courseLikeTotal}</h4>
                <small>لایک</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <MessageSquare className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedCourse.courseCommentTotal}</h4>
                <small>نظرات و پاسخ های نظرات</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            <ul className="list-unstyled">
              <li className="mb-75">
                <span className="fw-bolder me-25">استاد:</span>
                <span>{selectedCourse.teacherName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">زمان شروع:</span>
                <span>
                  {new Date(selectedCourse.startTime).toLocaleDateString(
                    "fa-IR"
                  )}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">زمان پایان:</span>
                <span>
                  {new Date(selectedCourse.endTime).toLocaleDateString("fa-IR")}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">هزینه:</span>

                <span>
                  {new Intl.NumberFormat("fa-IR", {}).format(
                    selectedCourse.cost
                  )}{" "}
                  ریال
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">کلاس:</span>
                <span>{selectedCourse.courseClassRoomName}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">نوع دوره:</span>
                <span className="text-capitalize">
                  {selectedCourse.courseTypeName}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">سطح دوره:</span>
                <span className="text-capitalize">
                  {selectedCourse.courseLevelName}
                </span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">فعال:</span>
                <span>{selectedCourse.isActive ? "بله" : "خیر"}</span>
              </li>
              <li className="mb-75">
                <span className="fw-bolder me-25">توضیحات:</span>
                <span>{selectedCourse.describe}</span>
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow2(true)}>
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color={selectedCourse.isActive ? "danger" : "success"}
              outline
              onClick={handleStatusToggle}
            >
              {selectedCourse.isActive ? "غیرفعال" : "فعال"} کردن
            </Button>
          </div>
        </CardBody>
      </Card>
      <EditModal
        show2={show2}
        setShow2={setShow2}
        selectedCourse={selectedCourse}
        refetch={refetch}
      />
    </Fragment>
  );
};

export default UserInfoCard;
