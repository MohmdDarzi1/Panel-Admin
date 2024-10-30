// ** React Imports
import { useSkin } from "@hooks/useSkin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // اضافه کردن react-toastify

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";
import { useLoginApi } from "../@core/services/api/auth";
import { useFormik } from "formik";

import * as Yup from "yup";
import { getItem, setItem } from "../@core/services/storage/storage.services";
import { selectgettoken, toggletoken } from "../redux/slices/token";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toggledataId } from "../redux/slices/userId";

const Login = () => {
  // console.log("token", token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginApi = useLoginApi();
  const { data } = loginApi;

  useEffect(() => {

    const token = getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [data]);

  const formik = useFormik({
    initialValues: {
      phoneOrGmail: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: (value) => {
      loginApi.mutate(value, {
        onSuccess: (data) => {
          // check for role instead
          if (data.roles.includes("Administrator", "Teacher")) {
            setItem("token", data.token);
            setItem("userId", data.id);
            dispatch(toggletoken(data.token));
            dispatch(toggledataId(data.id));
            navigate("/home");
            toast.success("ورود موفقیت‌آمیز بود.");
          } else {
            toast.error(";) حساب وارد شده دسترسی ندارد");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
    validationSchema: Yup.object({
      phoneOrGmail: Yup.string().required("این فیلد الزامی است."),
      password: Yup.string().required("این فیلد الزامی است."),
      rememberMe: Yup.boolean(),
    }),
  });

  const { skin } = useSkin();
  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              خوش آمید
            </CardTitle>
            <CardText className="mb-2">
              ...برای ورود لطفا اطلاعات خود را وارد کنید
            </CardText>
            <Form
              className="auth-login-form mt-2"
              onSubmit={formik.handleSubmit}
            >
              <FormGroup className="mb-1">
                <Label className="form-label" for="login-email">
                  ایمیل
                </Label>
                <Input
                  type="text"
                  id="login-email"
                  autoFocus
                  name="phoneOrGmail"
                  onChange={formik.handleChange}
                  value={formik.values.phoneOrGmail}
                  placeholder=" ایمیل یا شماره تماس وارد کنید...."
                  invalid={
                    formik.touched.phoneOrGmail &&
                    Boolean(formik.errors.phoneOrGmail)
                  }
                />
                <FormFeedback>{formik.errors.phoneOrGmail}</FormFeedback>
              </FormGroup>
              <FormGroup className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    رمز
                  </Label>
                </div>
                <InputPasswordToggle
                  className="input-group-merge"
                  id="login-password"
                  border="none"
                  name="password"
                  type="text" // اصلاح شده
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  invalid={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  placeholder=" رمز عبور را وارد کنید..."
                />
                <FormFeedback>{formik.errors.password}</FormFeedback>
              </FormGroup>
              <FormGroup className="form-check mb-1">
                <Input
                  type="checkbox"
                  id="remember-me"
                  checked={formik.values.rememberMe}
                  value={formik.values.rememberMe}
                  onChange={(event, checked) =>
                    formik.setFieldValue("rememberMe", checked)
                  }
                />
                <Label className="form-check-label" for="remember-me">
                  من را به خاطر بسپار
                </Label>
              </FormGroup>
              <Button type="submit" color="primary" block>
                ورود
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
