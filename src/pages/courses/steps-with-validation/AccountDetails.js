import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormik } from "formik";
import { Form, Label, Input, Row, Col, Button, FormFeedback } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import { isObjEmpty } from "@utils";

import * as Yup from "yup";

import {
  useCreateCourse,
  useGetCreateCourse,
} from "../../../@core/services/api/courses";
import { toast } from "react-toastify";

const AccountDetails = ({ stepper, setCourseId, courseId }) => {
  // Fetching course data

  const getCreateCourse = useGetCreateCourse();
  const { data } = getCreateCourse;
  const createCourse = useCreateCourse();
  const { data: data2, isLoading, isPending } = createCourse;

  // Log data2 whenever it changes
  useEffect(() => {
    if (data2) {
      console.log("data2:", data2.id);
      setCourseId(data2.id);
      stepper.next();
    }
  }, [data2]);

  // State for dropdown options
  const [typeDto, setTypeDto] = useState([]);
  const [levelDto, setLevelDto] = useState([]);
  const [classDtos, setClassDto] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [termDto, setTermDto] = useState([]);

  useEffect(() => {
    if (data) {
      setTypeDto(
        data.courseTypeDtos.map((item) => ({
          value: item.id,
          label: item.typeName,
        }))
      );
      setLevelDto(
        data.courseLevelDtos.map((item) => ({
          value: item.id,
          label: item.levelName,
        }))
      );
      setClassDto(
        data.classRoomDtos.map((item) => ({
          value: item.id,
          label: item.classRoomName,
        }))
      );
      setTeacher(
        data.teachers.map((item) => ({
          value: item.teacherId,
          label: item.fullName,
        }))
      );
      setTermDto(
        data.termDtos.map((item) => ({ value: item.id, label: item.termName }))
      );

      setInitialValues({
        ...initialValues,
        CourseTypeId: data.courseTypeDtos[0]?.id || null,
        CourseLvlId: data.courseLevelDtos[0]?.id || null,
        ClassId: data.classRoomDtos[0]?.id || null,
        TeacherId: data.teachers[0]?.teacherId || null,
        TremId: data.termDtos[0]?.id || null,
      });
    }
  }, [data]);

  // Initial form values
  const [initialValues, setInitialValues] = useState({
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
    Cost: "",
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

  // Form validation schema
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

  // Formik setup
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (formData) => {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      createCourse.mutate(formDataToSend, {
        onSuccess: (data2) => {
          setCourseId(data2.id);
          // console.log("onSuccess", data2, courseId);
          toast.success("دوره با موفقیت اضافه شد");
          stepper.next();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
    validationSchema,
  });

  // Date change handler
  const handleDateChange = (date, fieldName) => {
    formik.setFieldValue(fieldName, format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS"));
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">ایجاد دوره </h5>
        <small className="text-muted">
          در این قسمت میتوانید اطلاعات دوره جدید را وارد کنید
        </small>
      </div>
      <Form className="px-sm-5 mx-50 pb-5" onSubmit={formik.handleSubmit}>
        <Row className="gy-1 pt-75">
          <Col md={4} xs={12}>
            <Label className="form-label" for="Title">
              موضوع دوره
            </Label>
            <Input
              id="Title"
              name="Title"
              placeholder="موضوع دوره"
              invalid={!!formik.errors.Title}
              {...formik.getFieldProps("Title")}
            />

            <FormFeedback>{formik.errors.Title}</FormFeedback>
          </Col>
          <Col md={4} xs={12}>
            <Label className="form-label" for="Describe">
              توضیحات
            </Label>
            <Input
              id="Describe"
              name="Describe"
              placeholder="توضیحات"
              invalid={!!formik.errors.Describe}
              {...formik.getFieldProps("Describe")}
            />
            {formik.errors.Describe && (
              <FormFeedback>{formik.errors.Describe}</FormFeedback>
            )}
          </Col>

          <Col md={4} xs={12}>
            <Label className="form-label" for="MiniDescribe">
              توضیحات کوتاه
            </Label>
            <Input
              id="MiniDescribe"
              name="MiniDescribe"
              placeholder="توضیحات کوتاه"
              invalid={!!formik.errors.MiniDescribe}
              {...formik.getFieldProps("MiniDescribe")}
            />
            {formik.errors.MiniDescribe && (
              <FormFeedback>{formik.errors.MiniDescribe}</FormFeedback>
            )}
          </Col>
          <Col md={4} xs={12}>
            <Label className="form-label" for="Capacity">
              ظرفیت دوره
            </Label>
            <Input
              id="Capacity"
              name="Capacity"
              type="number"
              placeholder="ظرفیت دوره"
              invalid={!!formik.errors.Capacity}
              {...formik.getFieldProps("Capacity")}
            />
            {formik.errors.Capacity && (
              <FormFeedback>{formik.errors.Capacity}</FormFeedback>
            )}
          </Col>

          <Col md={4} xs={12}>
            <Label className="form-label" for="CourseTypeId">
              نوع دوره
            </Label>
            <Input
              type="select"
              id="CourseTypeId"
              name="CourseTypeId"
              invalid={!!formik.errors.CourseTypeId}
              {...formik.getFieldProps("CourseTypeId")}
            >
              {typeDto.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Input>
            {formik.errors.CourseTypeId && (
              <FormFeedback>{formik.errors.CourseTypeId}</FormFeedback>
            )}
          </Col>
          <Col md={4} xs={12}>
            <Label className="form-label" for="CourseLvlId">
              سطح دوره
            </Label>
            <Input
              type="select"
              id="CourseLvlId"
              name="CourseLvlId"
              invalid={!!formik.errors.CourseLvlId}
              {...formik.getFieldProps("CourseLvlId")}
            >
              {levelDto.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </Input>
            {formik.errors.CourseLvlId && (
              <FormFeedback>{formik.errors.CourseLvlId}</FormFeedback>
            )}
          </Col>

          <Col md={4} xs={12}>
            <Label className="form-label" for="ClassId">
              کلاس
            </Label>
            <Input
              type="select"
              id="ClassId"
              name="ClassId"
              invalid={!!formik.errors.ClassId}
              {...formik.getFieldProps("ClassId")}
            >
              {classDtos.map((classDtos) => (
                <option key={classDtos.value} value={classDtos.value}>
                  {classDtos.label}
                </option>
              ))}
            </Input>
            {formik.errors.ClassId && (
              <FormFeedback>{formik.errors.ClassId}</FormFeedback>
            )}
          </Col>
          <Col md={4} xs={12}>
            <Label className="form-label" for="TeacherId">
              مدرس
            </Label>
            <Input
              type="select"
              id="TeacherId"
              name="TeacherId"
              invalid={!!formik.errors.TeacherId}
              {...formik.getFieldProps("TeacherId")}
            >
              {teacher.map((teacher) => (
                <option key={teacher.value} value={teacher.value}>
                  {teacher.label}
                </option>
              ))}
            </Input>
            {formik.errors.TeacherId && (
              <FormFeedback>{formik.errors.TeacherId}</FormFeedback>
            )}
          </Col>

          <Col md={4} xs={12}>
            <Label className="form-label" for="TremId">
              ترم
            </Label>
            <Input
              type="select"
              id="TremId"
              name="TremId"
              invalid={!!formik.errors.TremId}
              {...formik.getFieldProps("TremId")}
            >
              {termDto.map((term) => (
                <option key={term.value} value={term.value}>
                  {term.label}
                </option>
              ))}
            </Input>
            {formik.errors.TremId && (
              <FormFeedback>{formik.errors.TremId}</FormFeedback>
            )}
          </Col>
          <Col md={4} xs={12}>
            <Label className="form-label" for="SessionNumber">
              شماره جلسه
            </Label>
            <Input
              id="SessionNumber"
              name="SessionNumber"
              placeholder="شماره جلسه"
              invalid={!!formik.errors.SessionNumber}
              {...formik.getFieldProps("SessionNumber")}
            />
            {formik.errors.SessionNumber && (
              <FormFeedback>{formik.errors.SessionNumber}</FormFeedback>
            )}
          </Col>

          <Col md={4} xs={12}>
            <Label className="form-label" for="Cost">
              هزینه
            </Label>
            <Input
              id="Cost"
              name="Cost"
              placeholder="هزینه"
              invalid={!!formik.errors.Cost}
              {...formik.getFieldProps("Cost")}
            />
            {formik.errors.Cost && (
              <FormFeedback>{formik.errors.Cost}</FormFeedback>
            )}
          </Col>
          <Col md={4} xs={12}>
            <Label className="form-label" for="UniqeUrlString">
              کد یکتا
            </Label>
            <Input
              type="text"
              id="UniqeUrlString"
              name="UniqeUrlString"
              placeholder="کد یکتا"
              invalid={!!formik.errors.UniqeUrlString}
              {...formik.getFieldProps("UniqeUrlString")}
            />
            {formik.errors.UniqeUrlString && (
              <FormFeedback>{formik.errors.UniqeUrlString}</FormFeedback>
            )}
          </Col>

          <Col md={4} xs={12} className=" mb-2 pt-50">
            <Label className="form-label" for="StartTime">
              زمان شروع
            </Label>
            <Input
              type="date"
              id="StartTime"
              name="StartTime"
              className={`form-control`}
              selected={formik.values.StartTime}
              onChange={(date) => handleDateChange(date, "StartTime")}
              dateFormat="yyyy-MM-dd"
            />
            {formik.errors.StartTime && (
              <FormFeedback>{formik.errors.StartTime}</FormFeedback>
            )}
          </Col>
          <Col md={4} xs={12} className=" mb-2 pt-50">
            <Label className="form-label" for="EndTime">
              زمان پایان
            </Label>
            <Input
              type="date"
              id="EndTime"
              name="EndTime"
              className={`form-control`}
              selected={formik.values.EndTime}
              onChange={(date) => handleDateChange(date, "EndTime")}
              dateFormat="yyyy-MM-dd"
            />
            {formik.errors.EndTime && (
              <FormFeedback>{formik.errors.EndTime}</FormFeedback>
            )}
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">
              مرحله بعد
            </span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountDetails;
