import {
  useCourseTech,
  useGetCreateCourse,
} from "../../../@core/services/api/courses";
import * as Yup from "yup";
import { useFormik } from "formik";

// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ** Reactstrap Imports
import { Row, Col, Button, Form, FormFeedback } from "reactstrap";
import { useNavigate } from "react-router-dom";

const SocialLinks = ({ stepper, courseId }) => {
  const getCreateCourse = useGetCreateCourse();
  const { data } = getCreateCourse;
  const navigate = useNavigate();
  const courseTech = useCourseTech();
  const { data2 } = courseTech;
  const [techList, setTechList] = useState([]);

  useEffect(() => {
    if (data) {
      setTechList(
        data?.technologyDtos.map((item) => ({
          value: item.id,
          label: item.techName,
        }))
      );
    }
    if (data2) {
      console.log("data2", data2);
    }
  }, [data, data2]);

  const initialValues = {
    techIds: [],
  };

  const validationSchema = Yup.object({
    techIds: Yup.array().min(1, "حداقل یک تکنولوژی باید انتخاب شود"),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      // تبدیل techIds به آرایه‌ای از آبجکت‌ها با کلید techId
      const techIds = values.techIds.map((item) => ({ techId: item.value }));
      if (!courseId || !Array.isArray(techIds) || techIds.length === 0) {
        toast.error("خطایی در ارسال داده‌ها وجود دارد.");
        return;
      }

      const payload = {
        courseId,
        techIds,
      };
      console.log("payload", payload);

      courseTech.mutate(payload, {
        onSuccess: (data2) => {
          toast.success("دوره با موفقیت ثبت شد");
          console.log("data2", data2);
          navigate("/courses")
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
    validationSchema,
  });

  return (
    <Fragment>
      <ToastContainer />
      <div className="content-header">
        <h5 className="mb-0">لیست تکنولوژی ها</h5>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Select
              isMulti
              name="techIds"
              options={techList}
              classNamePrefix="select"
              value={formik.values.techIds}
              onChange={(value) => formik.setFieldValue("techIds", value)}
              onBlur={() => formik.setFieldTouched("techIds", true)}
              placeholder="افزودن تکنولوژی ها"
            />
            {formik.touched.techIds && formik.errors.techIds && (
              <FormFeedback className="d-block">
                {formik.errors.techIds}
              </FormFeedback>
            )}
          </Col>
        </Row>

        <div className="d-flex justify-content-between">
          <Button type="submit" color="success" className="btn-submit">
            ثبت نهایی
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SocialLinks;
