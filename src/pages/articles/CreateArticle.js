import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Input,
  Form,
  Button,
  Label,
} from "reactstrap";
import * as Yup from "yup";
import {
  useCreateNews,
  useGetListNewsCategory,
} from "../../@core/services/api/articles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateArticle = () => {
  const getListNewsCategory = useGetListNewsCategory();
  const { data } = getListNewsCategory;
  const createNews = useCreateNews();
  const { data: data2 } = createNews;
  // useEffect(() => {
  //   if (data2) {
  //     if (data2?.success) {

  //     } else {
  //       toast.error("اطلاعات کامل نیست");
  //     }
  //   }
  // }, [data2]);

  const [categoryDto, setCategoryDto] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCategoryDto(
        data.map((item) => ({
          value: item.id,
          label: item.categoryName,
        }))
      );

      setInitialValues({
        ...initialValues,
        NewsCatregoryId: data[0]?.id || null,
      });
    }
  }, [data]);

  const [initialValues, setInitialValues] = useState({
    Title: "",
    GoogleTitle: "",
    GoogleDescribe: "",
    MiniDescribe: "",
    Describe: null,
    Keyword: "",
    NewsCatregoryId: null,
  });

  const validationSchema = Yup.object({
    Title: Yup.string().required("این فیلد الزامی است."),
    GoogleTitle: Yup.string().required("این فیلد الزامی است."),
    GoogleDescribe: Yup.string().required("این فیلد الزامی است."),
    MiniDescribe: Yup.string().required("این فیلد الزامی است."),
    Describe: Yup.string().required("این فیلد الزامی است."),
    Keyword: Yup.string().required("این فیلد الزامی است."),
    NewsCatregoryId: Yup.string().required("این فیلد الزامی است."),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (formData) => {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      createNews.mutate(formDataToSend, {
        onSuccess: (e) => {
          if (!e) {
            toast.error("اطلاعات کامل نیست");
          } else if (e) {
            toast.success("خبر با موفقیت اضافه شد");
            navigate("/articles");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
    validationSchema,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">فرم ایجاد خبر</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="Title">
                عنوان
              </Label>
              <Input
                type="text"
                name="Title"
                id="Title"
                placeholder="عنوان"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Title}
                invalid={formik.touched.Title && !!formik.errors.Title}
              />
              {formik.touched.Title && formik.errors.Title ? (
                <div className="text-danger">{formik.errors.Title}</div>
              ) : null}
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleTitle">
                عنوان گوگل
              </Label>
              <Input
                type="text"
                name="GoogleTitle"
                id="GoogleTitle"
                placeholder="عنوان گوگل"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.GoogleTitle}
                invalid={
                  formik.touched.GoogleTitle && !!formik.errors.GoogleTitle
                }
              />
              {formik.touched.GoogleTitle && formik.errors.GoogleTitle ? (
                <div className="text-danger">{formik.errors.GoogleTitle}</div>
              ) : null}
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="GoogleDescribe">
                توضیحات گوگل
              </Label>
              <Input
                type="text"
                name="GoogleDescribe"
                id="GoogleDescribe"
                placeholder="توضیحات گوگل"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.GoogleDescribe}
                invalid={
                  formik.touched.GoogleDescribe &&
                  !!formik.errors.GoogleDescribe
                }
              />
              {formik.touched.GoogleDescribe && formik.errors.GoogleDescribe ? (
                <div className="text-danger">
                  {formik.errors.GoogleDescribe}
                </div>
              ) : null}
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="MiniDescribe">
                توضیحات کوتاه
              </Label>
              <Input
                type="text"
                name="MiniDescribe"
                id="MiniDescribe"
                placeholder="توضیحات کوتاه"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.MiniDescribe}
                invalid={
                  formik.touched.MiniDescribe && !!formik.errors.MiniDescribe
                }
              />
              {formik.touched.MiniDescribe && formik.errors.MiniDescribe ? (
                <div className="text-danger">{formik.errors.MiniDescribe}</div>
              ) : null}
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="Describe">
                توضیحات
              </Label>
              <Input
                type="textarea"
                name="Describe"
                id="Describe"
                placeholder="توضیحات"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Describe}
                invalid={formik.touched.Describe && !!formik.errors.Describe}
              />
              {formik.touched.Describe && formik.errors.Describe ? (
                <div className="text-danger">{formik.errors.Describe}</div>
              ) : null}
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="Keyword">
                کلمه کلیدی
              </Label>
              <Input
                type="text"
                name="Keyword"
                id="Keyword"
                placeholder="کلمه کلیدی"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Keyword}
                invalid={formik.touched.Keyword && !!formik.errors.Keyword}
              />
              {formik.touched.Keyword && formik.errors.Keyword ? (
                <div className="text-danger">{formik.errors.Keyword}</div>
              ) : null}
            </Col>

            <Col md="6" sm="12" className="mb-1">
              <Label className="form-label" for="NewsCatregoryId">
                دسته بندی خبر
              </Label>
              <Input
                type="select"
                name="NewsCatregoryId"
                id="NewsCatregoryId"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.NewsCatregoryId}
                invalid={
                  formik.touched.NewsCatregoryId &&
                  !!formik.errors.NewsCatregoryId
                }
              >
                <option value="">انتخاب کنید</option>
                {categoryDto?.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Input>
              {formik.touched.NewsCatregoryId &&
              formik.errors.NewsCatregoryId ? (
                <div className="text-danger">
                  {formik.errors.NewsCatregoryId}
                </div>
              ) : null}
            </Col>

            <Col sm="12">
              <div className="d-flex">
                <Button className="me-1" color="primary" type="submit">
                  ثبت
                </Button>
                <Button
                  outline
                  color="secondary"
                  type="reset"
                  onClick={formik.handleReset}
                >
                  ریست
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
export default CreateArticle;
