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
import "@styles/react/libs/react-select/_react-select.scss";
import http from "../../../@core/interceptors/interceptors";
import { toast } from "react-hot-toast";
import {
  getNewsCategoryListsAPI,
  updateNewsAPI,
} from "../../../@core/services/api/articles";
// import { getCreateCourse } from "../../../../services/api/course/get-create-course-api";
// import { updateCourse } from "../../../../services/api/course/update-course-api";
// import { XSelect } from "../../common/XSelect";
// import { updateNewsCategoryAPI } from "../../../../services/api/blog/update-news-category-api";
// import { getNewsCategoryListsAPI } from "../../../../services/api/blog/get-news-category-lists-api";
// import { updateNewsAPI } from "../../../../services/api/blog/update-news-api";

const EditBlog = ({ isOpen, toggle, blogId, refetch, setRefetch }) => {
  const [editBlog, setEditBlog] = useState([]);
  const [initialValues, setInitialValues] = useState({
    title: "",
    miniDescribe: "",
    googleTitle: "",
    googleDescribe: "",
    newsCategoryId: 0,
    describe: "",
    active: true,
    imageAddress: "",
    tumbImage: "",
    image: "",
  });

  useEffect(() => {
    const fetchNewsCategoryLists = async () => {
      try {
        const res = await getNewsCategoryListsAPI();
        setEditBlog(res);
      } catch (error) {
        toast.error("مشکلی در دریافت لیست بندی های اخبار به وجود آمد!");
      }
    };

    fetchNewsCategoryLists();
  }, []);

  useEffect(() => {
    if (blogId) {
      const fetchNewsData = async () => {
        try {
          const response = await http.get(`/News/${blogId}`);
          console.log("wrong", response);
          setInitialValues({
            Id: response?.detailsNewsDto.id ?? "",
            title: response?.detailsNewsDto?.title ?? "",
            googleTitle: response?.detailsNewsDto?.googleTitle ?? "",
            keyword: response?.detailsNewsDto?.keyword ?? "",
            miniDescribe: response?.detailsNewsDto?.miniDescribe ?? "",
            googleDescribe: response?.detailsNewsDto?.googleDescribe ?? "",
            newsCatregoryId: response?.detailsNewsDto?.newsCatregoryId ?? "",
            // image: response?.detailsNewsDto?.currentImageAddress ?? "",
            // tumbImage: response.tumbImage ?? "",
            // imageAddress: response.imageAddress ?? "",
            describe: response?.detailsNewsDto?.describe ?? "",
            active: true,
          });
        } catch (error) {
          console.error("Failed to fetch course data", error);
        }
      };

      fetchNewsData();
    }
  }, [blogId]);

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
      // console.log("formData", formData);
      console.log("values", values);
      try {
        const res = await updateNewsAPI(formData);
        if (res.success) {
          toast.success("خبر با موفقیت ویرایش شد !");
          setRefetch(!refetch);
        } else toast.error(res.message);

        toggle();
      } catch (error) {
        toast.error("مشکلی در ویرایش خبر به وجود آمد !");
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
          <h1 className="mb-1">ویرایش اطلاعات خبر</h1>
          <p>در این قسمت میتوانید اطلاعات خبر را ویرایش کنید</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <Row className="gy-1 pt-75">
            <Col md="6" className="mb-1">
              <Label className="form-label" for="title">
                عنوان
              </Label>
              <Input
                id="title"
                placeholder="عنوان خبر"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                invalid={!!formik.errors.title}
              />
              <FormFeedback>{formik.errors.title}</FormFeedback>
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="googleTitle">
                عنوان گوگل
              </Label>
              <Input
                id="googleTitle"
                name="googleTitle"
                onChange={formik.handleChange}
                value={formik.values.googleTitle}
                invalid={!!formik.errors.googleTitle}
                placeholder="عنوان گوگل"
              />
              <FormFeedback>{formik.errors.googleTitle}</FormFeedback>
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="keyword">
                کلمات کلیدی
              </Label>
              <Input
                id="keyword"
                name="keyword"
                placeholder="کلمات کلیدی"
                onChange={formik.handleChange}
                value={formik.values.keyword}
                invalid={!!formik.errors.keyword}
              />
            </Col>
            {/* <Col md={4} xs={12}>
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
            </Col> */}
            <Col md="6" className="mb-1">
              <Label className="form-label" for="newsCategoryId">
                انتخاب دسته بندی
              </Label>
              <Input
                id="newsCategoryId"
                name="newsCategoryId"
                type="select"
                onChange={formik.handleChange}
                // value={formik.values.CourseTypeId}
                placeholder=" دسته بندی"
              >
                {editBlog?.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.categoryName}
                  </option>
                ))}
              </Input>
            </Col>

            <Col md="6">
              <Label className="form-label" for="miniDescribe">
                توضیح کوتاه
              </Label>
              <Input
                id="miniDescribe"
                name="miniDescribe"
                onChange={formik.handleChange}
                value={formik.values.miniDescribe}
                placeholder="توضیح کوتاه"
              />
            </Col>
            <Col md="6">
              <Label className="form-label" for="describe">
                توضیحات
              </Label>
              <Input
                id="describe"
                name="describe"
                onChange={formik.handleChange}
                value={formik.values.describe}
                placeholder="توضیحات"
              />
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="googleDescribe">
                توضیحات گوگل
              </Label>
              <Input
                id="googleDescribe"
                name="googleDescribe"
                onChange={formik.handleChange}
                value={formik.values.googleDescribe}
                placeholder="توضیحات گوگل"
              />
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="currentImageAddress">
                آپلود عکس
              </Label>
              <Input
                id="currentImageAddress"
                type="file"
                name="currentImageAddress"
                onChange={formik.handleChange}
                value={formik.values.currentImageAddress}
                placeholder="آپلود عکس"
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

export default EditBlog;
