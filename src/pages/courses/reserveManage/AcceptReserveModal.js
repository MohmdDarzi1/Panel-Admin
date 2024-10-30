import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input,
  Collapse,
  Card,
  CardBody,
} from "reactstrap";

import {
  useAcceptCourseReserveAPI,
  useCourseDetails,
  useAddCourseGroup,
} from "../../../@core/services/api/courses";
import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import http from "../../../@core/interceptors/interceptors";

const AcceptReserveModal = ({
  toggleAcceptModal,
  courseId,
  studentId,
  acceptModal,
}) => {
  console.log("courseId&studentId", courseId, studentId);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [courseGroups, setCourseGroups] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const acceptCourseReserveAPI = useAcceptCourseReserveAPI();
  const { data: data2 } = acceptCourseReserveAPI;
  const addCourseGroupMutation = useAddCourseGroup(); // Use the mutation function
  const { data: data3 } = addCourseGroupMutation;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useCourseDetails(courseId);

  const toggleAccordion = () => setIsAccordionOpen(!isAccordionOpen);

  const fetchCourseGroups = async () => {
    try {
      const response = await http(
        `/CourseGroup/GetCourseGroup?TeacherId=${data?.teacherId}&CourseId=${courseId}`
      );
      if (!response.length) {
        toast.error(
          "گروهی برای رزرو این دوره وجود ندارد، لطفا گروه ایجاد کنید"
        );
      }
      // console.log("responsejjjjj", response);
      setCourseGroups(response);
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    if (courseId) {
      fetchCourseGroups();
    }
  }, [courseId, data]);

  const handleAcceptClick = async () => {
    await fetchCourseGroups();
    toggleAcceptModal();
  };

  const handleAcceptCourseReserve = async () => {
    console.log("selectedGroupcourseId", courseId);

    if (!courseId || !studentId || !selectedGroup) {
      toast.error("لطفا همه فیلدها را پر کنید");
      return;
    }

    acceptCourseReserveAPI.mutate(
      {
        courseId: courseId,
        courseGroupId: selectedGroup,
        studentId: studentId,
      },
      {
        onSuccess: (data2) => {
          if (data2.success) {
            toast.success("رزرو با موفقیت پذیرفته شد !");
            queryClient.invalidateQueries(["getCourseReserveAPI"]);
          } else {
            toast.error("مشکلی در پذیرش دوره به وجود آمد !");
            toast.error(data2.message);
          }
        },
        onError: (error) => {
          toast.error("مشکلی در پذیرش رزرو به وجود آمد !");
        },
        onSettled: () => {
          toggleAcceptModal();
        },
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      GroupName: "",
      GroupCapacity: undefined,
      CourseId: courseId,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      GroupName: Yup.string().required("این فیلد الزامی است."),
      GroupCapacity: Yup.string().required("این فیلد الزامی است."),
    }),
    onSubmit: (formData) => {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      addCourseGroupMutation.mutate(formDataToSend, {
        onSuccess: (data3) => {
          toast.success("گروه با موفقیت اضافه شد، گروه را انتخاب کنید");
          setIsAccordionOpen(!isAccordionOpen);
          queryClient.invalidateQueries(["GetCourseGroup"]);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
  });

  return (
    <>
      <Modal isOpen={acceptModal} toggle={toggleAcceptModal}>
        <ModalHeader toggle={toggleAcceptModal}>تایید پذیرفتن رزرو</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="courseGroup">گروه دوره</Label>
            <Input
              type="select"
              name="courseGroup"
              id="courseGroup"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="" disabled>
                لطفا گروه دوره را انتخاب کنید
              </option>
              {courseGroups?.map((group) => (
                <option key={group.groupId} value={group.groupId}>
                  {group.groupName}
                </option>
              ))}
            </Input>
          </FormGroup>
          <Button color="link" onClick={toggleAccordion}>
            افزودن گروه جدید
          </Button>
          <Collapse isOpen={isAccordionOpen}>
            <Card>
              <CardBody>
                <form onSubmit={formik.handleSubmit}>
                  <FormGroup>
                    <Label for="newGroupName">نام گروه</Label>
                    <Input
                      type="text"
                      id="newGroupName"
                      name="GroupName"
                      value={formik.values.GroupName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.GroupName && !!formik.errors.GroupName
                      }
                    />
                    {formik.touched.GroupName && formik.errors.GroupName && (
                      <div className="text-danger">
                        {formik.errors.GroupName}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="newGroupCapacity">ظرفیت گروه</Label>
                    <Input
                      type="number"
                      id="newGroupCapacity"
                      name="GroupCapacity"
                      value={formik.values.GroupCapacity}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      invalid={
                        formik.touched.GroupCapacity &&
                        !!formik.errors.GroupCapacity
                      }
                    />
                    {formik.touched.GroupCapacity &&
                      formik.errors.GroupCapacity && (
                        <div className="text-danger">
                          {formik.errors.GroupCapacity}
                        </div>
                      )}
                  </FormGroup>
                  <Button color="primary" type="submit" className="mt-2">
                    افزودن گروه
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Collapse>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleAcceptCourseReserve}>
            بله
          </Button>
          <Button color="secondary" onClick={toggleAcceptModal}>
            خیر
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default AcceptReserveModal;
