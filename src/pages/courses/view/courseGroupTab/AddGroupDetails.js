// ** React Imports
import { useFormik } from "formik";
import { Fragment, useState } from "react";

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
import { useAddCourseGroup } from "../../../../@core/services/api/courses";
import { useQueryClient } from "@tanstack/react-query";
// import DatePicker from "react-flatpickr";

const AddGroupDetails = ({ isOpen, toggle, CourseId, TeacherId }) => {
  // ** States
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState(null);
  const [addGrp, setAddGrp] = useState(false);
  const [courseD, setCourseD] = useState({});
  const AddCourseGroup = useAddCourseGroup();
  const { data } = AddCourseGroup;

  const queryClient = useQueryClient();
  const initialValues = {
    CourseId: CourseId,
    TeacherId: TeacherId,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,

    onSubmit: (formData) => {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      AddCourseGroup.mutate(formDataToSend, {
        onSuccess: (data) => {
          toast.success("گروه با موفقیت اضافه شد");
          // refetch();
          queryClient.invalidateQueries([
            "GetCourseGroup",
            CourseId,
            TeacherId,
          ]);
          toggle();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },

    // onSubmit: async (values) => {
    //   console.log("Submitting values:", values); // Log values being submitted

    //   try {
    //     const formData = new FormData();
    //     formData.append("GroupName", values.GroupName);
    //     formData.append("GroupCapacity", parseInt(values.GroupCapacity));
    //     formData.append("courseId", values.courseId);

    //     console.log("FormData being sent to API:", formData); // Log formData being sent
    //     const result = await addCourseGroup(formData);

    //     if (result) {
    //       toast.success("گروه با موفقیت اضافه شد");
    //       toggle();
    //     } else {
    //       toast.error("خطا در افزودن گروه");
    //     }
    //   } catch (error) {
    //     console.error("Failed to add group", error);
    //     toast.error("خطا در افزودن گروه");
    //   }
    // },
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
                  نام گروه
                </Label>

                <Input
                  // {...field}
                  name="GroupName"
                  onChange={formik.handleChange}
                  value={formik.values.GroupName}
                  id="fName"
                  invalid={!!formik.errors.GroupName}
                  placeholder="نام گروه "
                  //     />
                  //   );
                  // }}
                />
                <FormFeedback>{formik.errors.GroupName}</FormFeedback>
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="GroupCapacity">
                  ظرفیت
                </Label>

                <Input
                  // {...field}
                  name="GroupCapacity"
                  onChange={formik.handleChange}
                  value={formik.values.GroupCapacity}
                  id="lName"
                  // type="number"
                  invalid={!!formik.errors.GroupCapacity}
                  placeholder="ظرفیت  "
                  // />
                  /* )} */
                />
                <FormFeedback>{formik.errors.GroupCapacity}</FormFeedback>
              </Col>

              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  ثبت
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

export default AddGroupDetails;
