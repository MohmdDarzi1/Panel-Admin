// ** React Imports
import { useState, Fragment, useEffect } from "react";
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import * as Yup from "yup";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase } from "react-feather";
import { useFormik } from "formik";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import {
  useUpdateUser,
  useUserDetails,
} from "../../../@core/services/api/user";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import UserAddRole3 from "../addRole/UserAddRole3";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser, id }) => {
  const { data, isLoading, refetch } = useUserDetails(id);
  console.log("datauser", data);
  const queryClient = useQueryClient();
  // State برای نگهداری مقادیر اولیه
  const [initialValues, setInitialValues] = useState({
    fName: "",
    lName: "",
    userName: "",
    gmail: "",
    phoneNumber: "",
    active: false,
    isDelete: false,
    isTecher: false,
    isStudent: false,
    recoveryEmail: "",
    twoStepAuth: false,
    userAbout: "",
    currentPictureAddress: "",
    linkdinProfile: "",
    telegramLink: "",
    receiveMessageEvent: false,
    homeAdderess: "",
    nationalCode: "",
    gender: true,
    latitude: "",
    longitude: "",
    insertDate: "",
    birthDay: "",
    roles: [],
    courses: [],
    coursesReseves: [],
    userProfileId: "",
  });
  const [roles, setRoles] = useState([]);

  // بروزرسانی initialValues با استفاده از useEffect
  useEffect(() => {
    if (data) {
      setRoles(data?.roles);

      setInitialValues({
        id: data.id,
        fName: data.fName ?? "",
        lName: data.lName ?? "",
        userName: data.userName ?? "",
        gmail: data.gmail ?? "",
        phoneNumber: data.phoneNumber ?? "",
        active: data.active ?? true,
        isDelete: data.isDelete ?? false,
        isTecher: data.isTecher ?? false,
        isStudent: data.isStudent ?? false,
        recoveryEmail: data.recoveryEmail ?? "",
        twoStepAuth: data.twoStepAuth ?? false,
        userAbout: data.userAbout ?? "",
        currentPictureAddress: data.currentPictureAddress ?? "",
        linkdinProfile: data.linkdinProfile ?? "",
        telegramLink: data.telegramLink ?? "",
        receiveMessageEvent: data.receiveMessageEvent ?? "",
        homeAdderess: data.homeAdderess ?? "",
        nationalCode: data.nationalCode ?? "",
        gender: data.gender ?? true,
        latitude: "36.597229",
        longitude: "53.064678",
        insertDate: data.insertDate ?? undefined,
        birthDay: data.birthDay ?? undefined,
        roles: data.roles ?? [],
        courses: data.courses ?? [],
        coursesReseves: data.coursesReseves ?? [],
        userProfileId: data.userProfileId ?? undefined,
      });
    }
  }, [data]);

  const updateUser = useUpdateUser();

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true, // این خط به فرمیک اجازه می‌دهد که مقادیر اولیه جدید را بگیرد
    validationSchema: Yup.object({
      fName: Yup.string().required("این فیلد الزامی است."),
      lName: Yup.string().required("این فیلد الزامی است."),
      gmail: Yup.string()
        .email("ایمیل معتبر نیست")
        .required("این فیلد الزامی است."),
      userAbout: Yup.string().required("این فیلد الزامی است."),
      linkdinProfile: Yup.string().required("این فیلد الزامی است."),
      telegramLink: Yup.string().required("این فیلد الزامی است."),
      homeAdderess: Yup.string().required("این فیلد الزامی است."),
      nationalCode: Yup.string().required("این فیلد الزامی است."),
      // gender: Yup.boolean().required("این فیلد الزامی است."),
      latitude: Yup.string().required("این فیلد الزامی است."),
      longitude: Yup.string().required("این فیلد الزامی است."),
      birthDay: Yup.string().required("این فیلد الزامی است."),
    }),
    onSubmit: (values) => {
      const mammad = {
        ...data,
        ...values,
        gender: values.gender === "true" || values.gender === true, // اطمینان از تبدیل به Boolean
      };
      updateUser.mutate(mammad, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["userDetails", id] });
          setShow2(!show2);
          toast.success("اطلاعات کاربر با موفقیت ویرایش شد");
          // formik.handleReset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
  });

  // ** State
  const [show2, setShow2] = useState(false);

  // ** render user img
  const renderUserImg = () => {
    if (
      selectedUser !== null &&
      selectedUser.currentPictureAddress &&
      selectedUser.currentPictureAddress.length > 10
    ) {
      return (
        <img
          height="110"
          width="110"
          alt="user-avatar"
          src={selectedUser.currentPictureAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mt-3 mb-2"
          content={`${selectedUser.fName}`}
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

  // const handleStatusClick = () => {
  //   return MySwal.fire({
  //     title: "آیا مطمئن هستید؟",
  //     text: "شما نمی‌توانید این کار را بازگردانید!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: selectedUser.active
  //       ? "بله، کاربر را غیرفعال کن!"
  //       : "بله، کاربر را فعال کن!",
  //     cancelButtonText: "لغو",
  //     customClass: {
  //       confirmButton: "btn btn-primary",
  //       cancelButton: "btn btn-outline-danger ms-1",
  //     },
  //     buttonsStyling: false,
  //   }).then(function (result) {
  //     if (result.value) {
  //       MySwal.fire({
  //         icon: "success",
  //         title: selectedUser.active ? "غیرفعال شد!" : "فعال شد!",
  //         text: `کاربر ${selectedUser.active ? "غیرفعال" : "فعال"} شد.`,
  //         customClass: {
  //           confirmButton: "btn btn-success",
  //         },
  //       });
  //       // Handle user status change logic here
  //     } else if (result.dismiss === MySwal.DismissReason.cancel) {
  //       MySwal.fire({
  //         title: "لغو شد",
  //         text: `لغو ${selectedUser.active ? "غیرفعال" : "فعال"} کردن کاربر :)`,
  //         icon: "error",
  //         // confirmButtonText
  //         customClass: {
  //           confirmButton: "btn btn-success",
  //         },
  //       });
  //     }
  //   });
  // };

  // const btnColor = () => {
  //   selectedUser.active ? "btn-secondary" : "btn-success"
  // };

  const handleStatusClick = () => {
    return MySwal.fire({
      title: "آیا مطمئن هستید؟",
      text: "شما نمی‌توانید این کار را بازگردانید!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: selectedUser.active
        ? "بله، کاربر را غیرفعال کن!"
        : "بله، کاربر را فعال کن!",
      cancelButtonText: "لغو",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        const updatedData = {
          ...selectedUser,
          active: !selectedUser.active,
        };

        MySwal.fire({
          icon: "success",
          title: selectedUser.active ? "غیرفعال شد!" : "فعال شد!",
          text: `کاربر ${selectedUser.active ? "غیرفعال" : "فعال"} شد.`,
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        updateUser.mutate(updatedData, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userDetails", id] });
          },
          onError: (error) => {
            toast.error(error.message);
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "لغو شد",
          text: `لغو ${selectedUser.active ? "غیرفعال" : "فعال"} کردن کاربر :)`,
          icon: "error",
          // confirmButtonText
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  const handleAddRoleClick = () => {
    toggleModal(() => setModal(!modal));
    // console.log("userdatadata", user);
  };
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{`${selectedUser.fName} ${selectedUser.lName}`}</h4>
                  <h4 className="fw-bolder border-bottom pb-50 mt-2 mb-1">
                    نقش های کاربر{" "}
                    <button
                      style={{
                        border: "none",
                        textAlign: "center",
                        display: "inline-block",
                        margin: "auto",
                      }}
                      onClick={handleAddRoleClick}
                    >
                      <Badge color="primary" className="text-center">
                        تغییر نقش
                      </Badge>
                    </button>
                    <UserAddRole3
                      modal={modal}
                      id={data?.id}
                      userName={data?.fName + " " + data?.lName}
                      toggleModal={toggleModal}
                      userRoles={data?.roles} // Pass user role here
                      setShow={setShow}
                      refetch={refetch}
                    />
                  </h4>
                  {/* {selectedUser?.roles?.map((role, index) => (
                    <div key={index}>
                      <Badge
                        color={
                          roleColors[role.roleName.toLowerCase()] ||
                          "light-primary"
                        }
                        className="text-capitalize d-inline-flex align-items-center me-1"
                      >
                        {role.roleName === "editor" && (
                          <Edit size={18} className="me-50" />
                        )}
                        {role.roleName === "admin" && (
                          <Shield size={18} className="me-50" />
                        )}
                        {role.roleName === "author" && (
                          <BookOpen size={18} className="me-50" />
                        )}
                        {role.roleName === "maintainer" && (
                          <Tool size={18} className="me-50" />
                        )}
                        {role.roleName === "subscriber" && (
                          <User size={18} className="me-50" />
                        )}
                        {role.roleName}
                      </Badge>
                    </div>
                  ))} */}
                  {selectedUser?.roles?.map((role, index) => (
                    <div key={index} className="d-inline-block">
                      <Fragment>
                        <Badge className="text-capitalize d-inline-flex align-items-center me-1 bg-light-primary">
                          {role.roleName}
                        </Badge>
                        {/* {selectedUser.roles[index + 1] && (
                          <Badge className="text-capitalize d-inline-flex align-items-center me-1 bg-light-primary">
                            {selectedUser.roles[index + 1].roleName}
                          </Badge>
                        )} */}
                      </Fragment>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <br />
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mt-3 mb-1 text-center">
            جزئیات کاربر
          </h4>
          <div className="info-container">
            {selectedUser && (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کاربری:</span>
                  <span>{selectedUser?.userName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">توضیحات کاربر :</span>
                  <span>{selectedUser?.userAbout}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ایمیل:</span>
                  <span>{selectedUser?.gmail}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شماره تلفن:</span>
                  <span>{selectedUser?.phoneNumber}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">کد ملی:</span>
                  <span>{selectedUser?.nationalCode}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">جنسیت:</span>
                  <span>{selectedUser?.gender ? "مرد" : "زن"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">لینکدین:</span>
                  <span>
                    <a
                      href={selectedUser?.linkdinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedUser?.linkdinProfile}
                    </a>
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">لینک تلگرام:</span>
                  <span>
                    <a
                      href={selectedUser?.telegramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedUser?.telegramLink}
                    </a>
                  </span>
                </li>
              </ul>
            )}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button
              className="btn-primary"
              outline
              onClick={() => setShow2(true)}
            >
              ویرایش
            </Button>
            <Button
              color={`${selectedUser.active ? "danger" : "success"}`}
              className="ms-1  
              "
              onClick={handleStatusClick}
            >
              {selectedUser.active ? "غیرفعال کردن" : "فعال کردن"}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Modal
        isOpen={show2}
        toggle={() => setShow2(!show2)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow2(!show2)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <h1 className="text-center mb-1">ویرایش اطلاعات کاربر</h1>
          <p className="text-center">
            به روزرسانی اطلاعات کاربر را با دقت انجام دهید.
          </p>
          <Form onSubmit={formik.handleSubmit}>
            <Row className="gy-1 pt-75">
              <Col md={6} xs={12}>
                <Label className="form-label" for="fName">
                  نام
                </Label>
                <Input
                  id="fName"
                  name="fName"
                  placeholder="نام"
                  value={formik.values.fName}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="lName">
                  نام خانوادگی
                </Label>
                <Input
                  id="lName"
                  name="lName"
                  placeholder="نام خانوادگی"
                  value={formik.values.lName}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="gmail">
                  ایمیل
                </Label>
                <Input
                  type="email"
                  id="gmail"
                  name="gmail"
                  placeholder="ایمیل"
                  value={formik.values.gmail}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="userAbout">
                  درباره کاربر
                </Label>
                <Input
                  id="userAbout"
                  name="userAbout"
                  placeholder="درباره کاربر"
                  value={formik.values.userAbout}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="linkdinProfile">
                  پروفایل لینکدین
                </Label>
                <Input
                  id="linkdinProfile"
                  name="linkdinProfile"
                  placeholder="پروفایل لینکدین"
                  value={formik.values.linkdinProfile}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="telegramLink">
                  لینک تلگرام
                </Label>
                <Input
                  id="telegramLink"
                  name="telegramLink"
                  placeholder="لینک تلگرام"
                  value={formik.values.telegramLink}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="homeAdderess">
                  آدرس منزل
                </Label>
                <Input
                  id="homeAdderess"
                  name="homeAdderess"
                  placeholder="آدرس منزل"
                  value={formik.values.homeAdderess}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="nationalCode">
                  کد ملی
                </Label>
                <Input
                  id="nationalCode"
                  name="nationalCode"
                  placeholder="کد ملی"
                  value={formik.values.nationalCode}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="gender">
                  جنسیت
                </Label>
                <Input
                  type="select"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={(e) =>
                    formik.setFieldValue("gender", e.target.value === "true")
                  }
                >
                  <option value="true">مرد</option>
                  <option value="false">زن</option>
                </Input>
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="latitude">
                  عرض جغرافیایی
                </Label>
                <Input
                  id="latitude"
                  name="latitude"
                  placeholder="عرض جغرافیایی"
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="longitude">
                  طول جغرافیایی
                </Label>
                <Input
                  id="longitude"
                  name="longitude"
                  placeholder="طول جغرافیایی"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className="form-label" for="birthDay">
                  تاریخ تولد
                </Label>
                <Input
                  type="date"
                  id="birthDay"
                  name="birthDay"
                  placeholder="تاریخ تولد"
                  value={formik.values.birthDay}
                  onChange={formik.handleChange}
                />
              </Col>
              {/* ادامه اضافه کردن فیلدها */}
              <Col className="text-center mt-2" xs={12}>
                <Button type="submit" color="primary" className="me-1">
                  ذخیره تغییرات
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => setShow2(false)}
                >
                  لغو
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
