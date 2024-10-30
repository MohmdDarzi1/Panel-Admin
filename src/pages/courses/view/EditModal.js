import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal, ModalHeader, ModalBody, Label, Input, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGetCreateCourse, useUpdateCourse } from "../../../@core/services/api/courses";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import moment from "moment-jalaali";
import "react-datepicker/dist/react-datepicker.css";
import "moment/locale/fa";
import "react-datepicker/dist/react-datepicker-cssmodules.css";


const EditModal = ({ selectedCourse, show2, setShow2, refetch }) => {
  moment.loadPersian({ usePersianDigits: true, dialect: 'persian-modern' });

  const updateCourse = useUpdateCourse();
  const { data: data2 } = updateCourse;

  useEffect(() => {
    if (data2) {
      console.log("data2:", data2.id);
    }
  }, [data2, refetch]);

  const [typeDto, setTypeDto] = useState([]);
  const [levelDto, setLevelDto] = useState([]);
  const [classDtos, setClassDto] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [termDto, setTermDto] = useState([]);

  const getCreateCourse = useGetCreateCourse();
  const { data } = getCreateCourse;
  console.log("datatocreate", data);

  useEffect(() => {
    if (data) {
      setTypeDto(
        data?.courseTypeDtos?.map((item) => ({
          value: item.id,
          label: item.typeName,
        }))
      );
      setLevelDto(
        data?.courseLevelDtos?.map((item) => ({
          value: item.id,
          label: item.levelName,
        }))
      );
      setClassDto(
        data?.classRoomDtos?.map((item) => ({
          value: item.id,
          label: item.classRoomName,
        }))
      );
      setTeacher(
        data?.teachers?.map((item) => ({
          value: item.teacherId,
          label: item.fullName,
        }))
      );
      setTermDto(
        data?.termDtos?.map((item) => ({
          value: item.id,
          label: item.termName,
        }))
      );
      setInitialValues({
        ...initialValues,
        Id: selectedCourse.courseId ?? "",
        Title: selectedCourse.title ?? "",
        Describe: selectedCourse.describe ?? "",
        MiniDescribe: selectedCourse.miniDescribe ?? "",
        Capacity: selectedCourse.capacity ?? "",
        SessionNumber: selectedCourse.sessionNumber ?? "",
        currentPictureAddress: selectedCourse.currentPictureAddress ?? "",
        Cost: selectedCourse.cost ?? "",
        UniqeUrlString: selectedCourse.uniqeUrlString ?? "",
        StartTime: selectedCourse.startTime ? moment(selectedCourse.startTime, 'jYYYY/jM/jD').toDate() : new Date(),
        EndTime: selectedCourse.endTime ? moment(selectedCourse.endTime, 'jYYYY/jM/jD').toDate() : new Date(),
        CourseTypeId: data.courseTypeDtos[0]?.id ?? null,
        CourseLvlId: data.courseLevelDtos[0]?.id ?? null,
        ClassId: data.classRoomDtos[0]?.id ?? null,
        TeacherId: data.teachers[0]?.teacherId ?? null,
        TremId: data.termDtos[0]?.id ?? null,
      });
    }
  }, [selectedCourse, data]);

  const [initialValues, setInitialValues] = useState({
    Id: "",
    Title: "",
    Describe: "",
    MiniDescribe: "",
    Capacity: "",
    CourseTypeId: null,
    SessionNumber: "",
    CurrentCoursePaymentNumber: 1,
    TremId: null,
    ClassId: null,
    CourseLvlId: null,
    TeacherId: null,
    Cost: null,
    UniqeUrlString: null,
    Image: "",
    StartTime: new Date(),
    EndTime: new Date(),
    GoogleSchema: "",
    GoogleTitle: "",
    CoursePrerequisiteId: "",
    ShortLink: "",
    TumbImageAddress: "",
    ImageAddress: "",
  });

  const validationSchema = Yup.object({
    Title: Yup.string().required("این فیلد الزامی است."),
    Describe: Yup.string().required("این فیلد الزامی است."),
    MiniDescribe: Yup.string().required("این فیلد الزامی است."),
    Capacity: Yup.string().required("این فیلد الزامی است."),
    CourseTypeId: Yup.string().required("این فیلد الزامی است."),
    CourseLvlId: Yup.string().required("این فیلد الزامی است."),
    ClassId: Yup.string().required("این فیلد الزامی است."),
    TremId: Yup.string().required("این فیلد الزامی است."),
    TeacherId: Yup.string().required("این فیلد الزامی است."),
    SessionNumber: Yup.string().required("این فیلد الزامی است."),
    Cost: Yup.string().required("این فیلد الزامی است."),
    UniqeUrlString: Yup.string().required("این فیلد الزامی است."),
    StartTime: Yup.date().required("این فیلد الزامی است."),
    EndTime: Yup.date().required("این فیلد الزامی است."),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (formData) => {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      updateCourse.mutate(formDataToSend, {
        onSuccess: (data2) => {
          toast.success("دوره با موفقیت اضافه شد");
          refetch();
          setShow2(!show2);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
    validationSchema,
  });

  return (
    <>
      {selectedCourse ? (
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
            <div className="text-center mb-2">
              <h1 className="mb-1">ویرایش اطلاعات دوره</h1>
              <p>در این قسمت میتوانید اطلاعات دوره را ویرایش کنید</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <Row className="gy-1 pt-75">
                <Col md={4} xs={12}>
                  <Label className="form-label" for="Title">
                    عنوان
                  </Label>
                  <Input
                    name="Title"
                    onChange={formik.handleChange}
                    value={formik.values.Title}
                    id="Title"
                    invalid={!!formik.errors.Title}
                    placeholder="عنوان "
                  />
                  <FormFeedback>{formik.errors.Title}</FormFeedback>
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="Describe">
                    توضیحات
                  </Label>
                  <Input
                    name="Describe"
                    onChange={formik.handleChange}
                    value={formik.values.Describe}
                    id="Describe"
                    invalid={!!formik.errors.Describe}
                    placeholder="توضیحات "
                  />
                  <FormFeedback>{formik.errors.Describe}</FormFeedback>
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="MiniDescribe">
                    توضیحات کوتاه
                  </Label>
                  <Input
                    name="MiniDescribe"
                    onChange={formik.handleChange}
                    value={formik.values.MiniDescribe}
                    id="MiniDescribe"
                    placeholder="توضیحات کوتاه "
                  />
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="Capacity">
                    ظرفیت
                  </Label>
                  <Input
                    name="Capacity"
                    onChange={formik.handleChange}
                    value={formik.values.Capacity}
                    id="Capacity"
                    placeholder="ظرفیت "
                  />
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="CourseTypeId">
                    نوع دوره
                  </Label>
                  <Input
                    type="select"
                    name="CourseTypeId"
                    onChange={formik.handleChange}
                    value={formik.values.CourseTypeId}
                    id="CourseTypeId"
                    placeholder="نوع دوره "
                  >
                    {typeDto.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="SessionNumber">
                    تعداد جلسات
                  </Label>
                  <Input
                    id="SessionNumber"
                    placeholder="تعداد جلسات"
                    name="SessionNumber"
                    onChange={formik.handleChange}
                    value={formik.values.SessionNumber}
                  />
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="TremId">
                    انتخاب ترم
                  </Label>

                  <Input
                    type="select"
                    id="TremId"
                    name="TremId"
                    onChange={formik.handleChange}
                    placeholder=" ترم"
                  >
                    {termDto.map((term) => (
                      <option key={term.value} value={term.value}>
                        {term.label}
                      </option>
                    ))}
                  </Input>
                </Col>

                <Col md={4} xs={12}>
                  <Label className="form-label" for="ClassId">
                    انتخاب کلاس
                  </Label>
                  <Input
                    type="select"
                    name="ClassId"
                    onChange={formik.handleChange}
                    value={formik.values.ClassId}
                    id="ClassId"
                    invalid={!!formik.errors.ClassId}
                  >
                    {classDtos.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="CourseLvlId">
                    سطح دوره
                  </Label>
                  <Input
                    type="select"
                    name="CourseLvlId"
                    onChange={formik.handleChange}
                    value={formik.values.CourseLvlId}
                    id="CourseLvlId"
                    placeholder="سطح دوره"
                  >
                    {levelDto.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="TeacherId">
                    مدرس
                  </Label>
                  <Input
                    type="select"
                    name="TeacherId"
                    onChange={formik.handleChange}
                    value={formik.values.TeacherId}
                    id="TeacherId"
                    placeholder="مدرس "
                  >
                    {teacher.map((teacher) => (
                      <option key={teacher.value} value={teacher.value}>
                        {teacher.label}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="Cost">
                    قیمت
                  </Label>
                  <Input
                    name="Cost"
                    onChange={formik.handleChange}
                    value={formik.values.Cost}
                    id="Cost"
                    placeholder=" قیمت "
                  />
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="UniqeUrlString">
                    کد یکتا
                  </Label>
                  <Input
                    name="UniqeUrlString"
                    onChange={formik.handleChange}
                    value={formik.values.UniqeUrlString}
                    id="UniqeUrlString"
                    placeholder=" کد یکتا "
                  />
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="StartTime">
                    تاریخ شروع
                  </Label>
                  <DatePicker
                    selected={formik.values.StartTime}
                    onChange={(date) => formik.setFieldValue("StartTime", date)}
                    dateFormat="yyyy/MM/dd"
                    className="form-control"
                    locale="fa"
                    calendar="jalali"
                  />
                </Col>
                <Col md={4} xs={12}>
                  <Label className="form-label" for="EndTime">
                    تاریخ پایان
                  </Label>
                  <DatePicker
                    selected={formik.values.EndTime}
                    onChange={(date) => formik.setFieldValue("EndTime", date)}
                    dateFormat="yyyy/MM/dd"
                    className="form-control"
                    locale="fa"
                    calendar="jalali"
                  />
                </Col>

                <Col xs={12} className="text-center mt-2 pt-50">
                  <Button type="submit" className="me-1" color="primary">
                    ویرایش
                  </Button>
                  <Button
                    type="reset"
                    color="secondary"
                    outline
                    onClick={() => setShow2(!show2)}
                  >
                    لغو
                  </Button>
                </Col>
              </Row>
            </form>
          </ModalBody>
        </Modal>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};

export default EditModal;
