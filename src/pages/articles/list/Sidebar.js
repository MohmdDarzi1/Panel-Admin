// ** React Import
import { useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
// import Select from "react-select";
// import classnames from "classnames";
// import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, FormFeedback } from "reactstrap";
// ** yup
import * as Yup from "yup";

// ** Store & Actions
import { addUser } from "../store";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useCreateUser } from "../../../@core/services/api/user";
import { toast } from "react-toastify";

const defaultValues = {
  email: "",
  contact: "",
  company: "",
  fullName: "",
  username: "",
  country: null,
};

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0
  );
};

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState([]);
  const [plan, setPlan] = useState("basic");
  const [role, setRole] = useState("subscriber");

  // ** Store Vars
  const dispatch = useDispatch();

  // ** useFormik
  const createUser = useCreateUser();
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      gmail: "",
      password: "",
      phoneNumber: "",
      isStudent: true,
      isTeacher: false,
    },
    onSubmit: (value) => {
      const newObj = {
        ...value,
        fname: value.firstName,
        lname: value.lastName,
      };
      createUser.mutate(newObj, {
        onSuccess: (data) => {
          setData(data);
          toggleSidebar();

          toast.success("کاربر با موفقیت اضافه شد");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
    validationSchema: Yup.object({
      lastName: Yup.string().required("این فیلد الزامی است."),
      firstName: Yup.string().required("این فیلد الزامی است."),
      gmail: Yup.string().required("این فیلد الزامی است."),
      phoneNumber: Yup.string().required("این فیلد الزامی است."),
      password: Yup.string().required("این فیلد الزامی است."),
      // rememberMe: Yup.boolean(),
    }),
  });

  // ** Function to handle form submit
  const onSubmit = (data) => {
    setData(data);
    if (checkIsValid(data)) {
      toggleSidebar();
      dispatch(
        addUser({
          role,
          avatar: "",
          status: "active",
          email: data.email,
          currentPlan: plan,
          billing: "auto debit",
          company: data.company,
          contact: data.contact,
          fullName: data.fullName,
          username: data.username,
          country: data.country.value,
        })
      );
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError("country", {
            type: "manual",
          });
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  // const handleSidebarClosed = () => {
  //   for (const key in defaultValues) {
  //     setValue(key, "");
  //   }
  //   setRole("subscriber");
  //   setPlan("basic");
  // };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="کاربر جدید"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      // onClosed={handleSidebarClosed}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <Label className="form-label" for="username">
            نام <span className="text-danger">*</span>
          </Label>
          <Input
            name="firstName"
            // control={control}
            onChange={handleChange}
            value={values.firstName}
            id="firstName"
            placeholder="نام..."
            invalid={errors.firstName}
          />
          <FormFeedback>{errors.firstName}</FormFeedback>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="fullName">
            نام خوانوادگی <span className="text-danger">*</span>
          </Label>
          <Input
            name="lastName"
            // control={control}
            onChange={handleChange}
            value={values.lastName}
            id="lastName"
            invalid={errors.lastName}
            placeholder="نام خوانوادگی..."
          />
          <FormFeedback>{errors.lastName}</FormFeedback>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            ایمیل <span className="text-danger">*</span>
          </Label>
          <Input
            name="gmail"
            onChange={handleChange}
            value={values.gmail}
            type="email"
            id="gmail"
            placeholder="example@example.com"
            invalid={errors.gmail}
          />
          <FormFeedback>{errors.gmail}</FormFeedback>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="company">
            رمز <span className="text-danger">*</span>
          </Label>
          <Input
            name="password"
            // control={control}
            onChange={handleChange}
            value={values.password}
            type="password"
            id="password"
            placeholder="رمز عبور..."
            invalid={errors.password}
          />
          <FormFeedback>{errors.password}</FormFeedback>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="contact">
            شماره تماس <span className="text-danger">*</span>
          </Label>
          <Input
            name="phoneNumber"
            onChange={handleChange}
            value={values.phoneNumber}
            id="phoneNumber"
            placeholder="09...."
            invalid={errors.phoneNumber}
          />
          <FormFeedback>{errors.phoneNumber}</FormFeedback>
        </div>

        {/* <div className="mb-1">
          <Label className="form-label" for="user-role">
            User Role
          </Label>
          <Input
            type="select"
            id="user-role"
            name="user-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">دانشجو</option>
            <option value="teacher">استاد</option>
            <option value="admin">ادمین</option>
          </Input>
        </div> */}
        {/* <div
          className="mb-1"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <Label className="form-label" for="select-plan">
            Select Plan
          </Label>
          <Input type="select" id="select-plan" name="select-plan">
            <option value="basic">Basic</option>
            <option value="enterprise">Enterprise</option>
            <option value="company">Company</option>
            <option value="team">Team</option>
          </Input>
        </div> */}
        <Button
          type="submit"
          className="me-1"
          color="primary"
          // onClick={toggleSidebar}
        >
          Submit
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
