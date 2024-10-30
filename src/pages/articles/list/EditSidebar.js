import { useState, useEffect } from "react";
import Sidebar from "@components/sidebar";
import { Button, Label, Input, FormFeedback } from "reactstrap";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  useUpdateUser,
  useUserDetails,
} from "../../../@core/services/api/user";
import { toast } from "react-toastify";
import {
  selectEditSidebar,
  toggleEditSidebar,
} from "../../../redux/slices/sideBarEdit";
import { useQueryClient } from "@tanstack/react-query";

const SidebarNewUsers = ({ data2 }) => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const { data, isLoading } = useUserDetails(data2.id);

  // State برای نگهداری مقادیر اولیه
  const [initialValues, setInitialValues] = useState({
    fName: "",
    lName: "",
    userName: "",
    gmail: "",
    phoneNumber: "",
    active: false,
    isDelete: false,
    isTecher: false,
    isStudent: false,
    recoveryEmail: "",
    twoStepAuth: false,
    userAbout: "",
    currentPictureAddress: "",
    linkdinProfile: "",
    telegramLink: "",
    receiveMessageEvent: false,
    homeAdderess: "",
    nationalCode: "",
    gender: "",
    latitude: "",
    longitude: "",
    insertDate: "",
    birthDay: "",
    roles: [],
    courses: [],
    coursesReseves: [],
    userProfileId: "",
  });

  // بروزرسانی initialValues با استفاده از useEffect
  useEffect(() => {
    if (data) {
      setInitialValues({
        id: data.id,
        fName: data.fName ?? "",
        lName: data.lName ?? "",
        userName: data.userName ?? "",
        gmail: data.gmail ?? "",
        phoneNumber: data.phoneNumber ?? "",
        active: data.active ?? false,
        isDelete: data.isDelete ?? false,
        isTecher: data.isTecher ?? false,
        isStudent: data.isStudent ?? false,
        recoveryEmail: data.recoveryEmail ?? "",
        twoStepAuth: data.twoStepAuth ?? false,
        userAbout: data.userAbout ?? "",
        currentPictureAddress: data.currentPictureAddress ?? "",
        linkdinProfile: data.linkdinProfile ?? "",
        telegramLink: data.telegramLink ?? "",
        receiveMessageEvent: data.receiveMessageEvent ?? "",
        homeAdderess: data.homeAdderess ?? "",
        nationalCode: data.nationalCode ?? "",
        gender: data.gender ?? false,
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        insertDate: data.insertDate ?? undefined,
        birthDay: data.birthDay ?? undefined,
        roles: data.roles ?? [],
        courses: data.courses ?? [],
        coursesReseves: data.coursesReseves ?? [],
        userProfileId: data.userProfileId ?? undefined,
      });
    }
  }, [data]);

  const updateUser = useUpdateUser();

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true, // این خط به فرمیک اجازه می‌دهد که مقادیر اولیه جدید را بگیرد
    validationSchema: Yup.object({
      fName: Yup.string().required("این فیلد الزامی است."),
      lName: Yup.string().required("این فیلد الزامی است."),
      gmail: Yup.string()
        .email("ایمیل معتبر نیست")
        .required("این فیلد الزامی است."),
    }),
    onSubmit: (values) => {
      const mammad = {
        ...data,
        ...values,
      };
      updateUser.mutate(mammad, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
          dispatch(toggleEditSidebar());
          toast.success("اطلاعات کاربر با موفقیت ویرایش شد");
          // formik.handleReset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
  });

  const open = useSelector(selectEditSidebar);

  return (
    <Sidebar
      size="lg"
      open={open}
      title="ویرایش کاربر"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={() => dispatch(toggleEditSidebar())}
    >
      {initialValues ? ( // فقط وقتی مقادیر اولیه موجود هستند، فرم را نمایش بده
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-1">
            <Label className="form-label" for="fName">
              نام <span className="text-danger">*</span>
            </Label>
            <Input
              name="fName"
              onChange={formik.handleChange}
              value={formik.values.fName}
              id="fName"
              invalid={!!formik.errors.fName}
              placeholder="نام "
            />
            <FormFeedback>{formik.errors.fName}</FormFeedback>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="lName">
              نام خانوادگی <span className="text-danger">*</span>
            </Label>
            <Input
              name="lName"
              onChange={formik.handleChange}
              value={formik.values.lName}
              id="lName"
              invalid={!!formik.errors.lName}
              placeholder="نام خانوادگی "
            />
            <FormFeedback>{formik.errors.lName}</FormFeedback>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="gmail">
              ایمیل <span className="text-danger">*</span>
            </Label>
            <Input
              name="gmail"
              onChange={formik.handleChange}
              value={formik.values.gmail}
              type="email"
              id="gmail"
              placeholder="example@example.com"
              invalid={!!formik.errors.gmail}
            />
            <FormFeedback>{formik.errors.gmail}</FormFeedback>
          </div>
          <div className="mb-1">
            <Label className="form-label" for="active">
              فعال
            </Label>
            <Input
              name="active"
              type="checkbox"
              onChange={formik.handleChange}
              checked={formik.values.active}
              id="active"
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="telegramLink">
              لینک تلگرام
            </Label>
            <Input
              name="telegramLink"
              onChange={formik.handleChange}
              value={formik.values.telegramLink}
              id="telegramLink"
              placeholder="لینک تلگرام"
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="homeAdderess">
              آدرس منزل
            </Label>
            <Input
              name="homeAdderess"
              onChange={formik.handleChange}
              value={formik.values.homeAdderess}
              id="homeAdderess"
              placeholder="آدرس منزل"
            />
          </div>
          <div className="mb-1">
            <Label className="form-label" for="userAbout">
              درباره کاربر
            </Label>
            <Input
              name="userAbout"
              onChange={formik.handleChange}
              value={formik.values.userAbout}
              id="userAbout"
              placeholder="درباره کاربر"
            />
          </div>

          <Button type="submit" className="me-1" color="primary">
            ویرایش اطلاعات
          </Button>
          <Button
            type="reset"
            color="secondary"
            outline
            onClick={() => {
              dispatch(toggleEditSidebar());
            }}
          >
            لغو
          </Button>
        </form>
      ) : (
        <div>در حال بارگذاری...</div> // پیغام در حال بارگذاری تا زمانی که initialValues تنظیم شود
      )}
    </Sidebar>
  );
};

export default SidebarNewUsers;
