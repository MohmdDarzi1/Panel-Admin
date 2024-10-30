// ** React Imports
import { useFormik } from "formik";
import { Fragment, useEffect, useState } from "react";
import * as Yup from "yup";
import http from "../../../@core/interceptors/interceptors";

// ** Reactstrap Imports
import {
  Button,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { toast } from "react-hot-toast";
// import { updateUser } from "../../../../services/api/userManagment/edit-user-api";
// import DatePicker from "react-flatpickr";

const AddGroup = ({ isOpen, toggle, userId, onSubmit }) => {
  // ** States
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const [initialValues, setInitialValues] = useState({
    GroupName: "",
    GroupCapacity: [],
    // userName: "",
  });
  useEffect(() => {
    if (userData) {
      setInitialValues({
        CourseId: userData.CourseId,
        GroupName: userData.GroupName ?? "",
        GroupCapacity: userData.GroupCapacity ?? "",
      });
    }
  }, [userData]);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    // validationSchema: Yup.object({
    //   fName: Yup.string().required("این فیلد الزامی است."),
    //   lName: Yup.string().required("این فیلد الزامی است."),
    //   gmail: Yup.string()
    //     .email("ایمیل معتبر نیست")
    //     .required("این فیلد الزامی است."),
    // }),

    onSubmit: async (values) => {
      try {
        res = await updateUser(values);
        toast.success("گروه با موفقیت اضافه شد");
      } catch (error) {
        console.error("Failed to add group", error);
      }
    },
  });



  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1"> افزودن گروه </h1>
            <p>در این قسمت میتوانید گروه مورد نظر را اضافه کنید</p>
          </div>
          {initialValues ? (
            <form onSubmit={formik.handleSubmit}>
              <Col md={12} xs={12}>
                <Label className="form-label" for="fName">
                  نام
                </Label>

                <Input
                  // {...field}
                  name="fName"
                  onChange={formik.handleChange}
                  value={formik.values.fName}
                  id="fName"
                  invalid={!!formik.errors.fName}
                  placeholder="نام "
                  //     />
                  //   );
                  // }}
                />
                <FormFeedback>{formik.errors.fName}</FormFeedback>
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="lName">
                  نام خانوادگی
                </Label>

                <Input
                  // {...field}
                  name="lName"
                  onChange={formik.handleChange}
                  value={formik.values.lName}
                  id="lName"
                  invalid={!!formik.errors.lName}
                  placeholder="نام خانوادگی "
                  // />
                  /* )} */
                />
                <FormFeedback>{formik.errors.lName}</FormFeedback>
              </Col>

              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ویرایش
                </Button>
                <Button type="reset" color="secondary" outline onClick={toggle}>
                  لغو
                </Button>
              </Col>
            </form>
          ) : (
            <p>در حال بارگذاری...</p>
          )}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default AddGroup;
