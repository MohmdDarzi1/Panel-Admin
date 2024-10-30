import React, { useEffect, useState } from "react";
import { Field, useFormik } from "formik";
import {
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import http from "../../../@core/interceptors/interceptors";
import { toast } from "react-hot-toast";

import "@styles/react/libs/react-select/_react-select.scss";
import { updateNewsCategoryAPI } from "../../../@core/services/api/articles";

const EditCourse = ({ isOpen, toggle, catId }) => {
  const [initialValues, setInitialValues] = useState({
    CategoryName: "",
    Image: "",
    IconAddress: "",
    IconName: "",
    GoogleTitle: "",
    GoogleDescribe: "",
  });

  useEffect(() => {
    if (catId) {
      console.log("catId", catId);
      const fetchCatData = async () => {
        try {
          const response = await http.get(`/News/GetNewsCategory/${catId}`);
          console.log("wrong", response);
          setInitialValues({
            Id: response.id ?? "",
            CategoryName: response.categoryName ?? "",
            Image: response.image ?? "",
            IconAddress: response.iconAddress ?? "",
            GoogleTitle: response.googleTitle ?? "",
            GoogleDescribe: response.googleDescribe ?? "",
          });
        } catch (error) {
          console.error("Failed to fetch course data", error);
        }
      };

      fetchCatData();
    }
  }, [catId]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      for (const key in values) {
        if (values.hasOwnProperty(key)) {
          formData.append(key, values[key]);
        }
      }
      console.log("formData", formData);
      console.log("values", values);
      try {
        const res = await updateNewsCategoryAPI(formData);
        console.log("god is dead we did it", res);
        toast.success("اطلاعات دسته بندی با موفقیت ویرایش شد");
        toggle();
      } catch (error) {
        console.error("Failed to update course", error);
        toast.error("ویرایش اطلاعات دسته بندی با خطا مواجه شد");
      }
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      <ModalBody className="px-sm-5 mx-50 pb-5">
        <div className="text-center mb-2">
          <h1 className="mb-1">ویرایش اطلاعات دوره</h1>
          <p>در این قسمت میتوانید اطلاعات دوره را ویرایش کنید</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md={4} xs={12}>
              <Label className="form-label" for="CategoryName">
                عنوان دسته بندی
              </Label>
              <Input
                name="CategoryName"
                onChange={formik.handleChange}
                value={formik.values.CategoryName}
                id="CategoryName"
                invalid={!!formik.errors.CategoryName}
                placeholder=" عنوان دسته بندی "
              />
              <FormFeedback>{formik.errors.CategoryName}</FormFeedback>
            </Col>
            <Col md={4} xs={12}>
              <Label className="form-label" for="GoogleTitle">
                عنوان گوگل
              </Label>
              <Input
                name="GoogleTitle"
                onChange={formik.handleChange}
                value={formik.values.GoogleTitle}
                id="GoogleTitle"
                invalid={!!formik.errors.GoogleTitle}
                placeholder=" عنوان گوگل "
              />
              <FormFeedback>{formik.errors.GoogleTitle}</FormFeedback>
            </Col>
            <Col md={4} xs={12}>
              <Label className="form-label" for="GoogleDescribe">
                توضیحات گوگل
              </Label>
              <Input
                name="GoogleDescribe"
                onChange={formik.handleChange}
                value={formik.values.GoogleDescribe}
                id="GoogleDescribe"
                placeholder="توضیحات گوگل "
              />
            </Col>
            <Col md={4} xs={12}>
              <Label className="form-label" for="IconName">
                نام آیکون
              </Label>
              <Input
                name="IconName"
                onChange={formik.handleChange}
                value={formik.values.IconName}
                id="IconName"
                placeholder="نام آیکون "
              />
            </Col>

            <Col md={4} xs={12}>
              <Label className="form-label" for="IconAddress">
                آدرس آیکون
              </Label>
              <Input
                id="IconAddress"
                placeholder="آدرس آیکون"
                name="IconAddress"
                onChange={formik.handleChange}
                value={formik.values.IconAddress}
              />
            </Col>

            <Col xs={12} className="text-center mt-2 pt-50">
              <Button type="submit" className="me-1" color="primary">
                ویرایش
              </Button>
              <Button type="reset" color="secondary" outline onClick={toggle}>
                لغو
              </Button>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default EditCourse;
