import { Fragment, useEffect, useRef, useState } from "react";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

// ** Third Party Components
import {
  Facebook,
  GitHub,
  Gitlab,
  Linkedin,
  Mail,
  Share2,
  Twitter,
} from "react-feather";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { useNavigate, useParams } from "react-router-dom";
// import { getNewsDetail } from "../../../../services/api/blog/blog-details-api";
// import { deleteBlogAPI } from "../../../../services/api/blog/delete-blog-api";
// import { convertDateToPersian } from "../../../../utils/date-helper.utils";
// import { activeAndInactiveBlogAPI } from "../../../../services/api/blog/activation-blog-api";
import CommentsTable from "./CommentsTable";
import EditBlog from "./EditBlog";
import { toast } from "react-hot-toast";
import {
  activeAndInactiveBlogAPI,
  convertDateToPersian,
  deleteBlogAPI,
  getNewsDetail,
} from "../../../@core/services/api/articles";
// import { toast } from "react-toastify";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const statusColors = {
  true: "light-success",
  false: "light-warning",
  // inactive: "light-secondary",
};

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

const countryOptions = [
  { value: "uk", label: "UK" },
  { value: "usa", label: "USA" },
  { value: "france", label: "France" },
  { value: "russia", label: "Russia" },
  { value: "canada", label: "Canada" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "dutch", label: "Dutch" },
];

const MySwal = withReactContent(Swal);

const selectedUser = {
  id: 1,
  billing: "Manual - Credit Card",
  fullName: "Galen Slixby",
  company: "Yotz PVT LTD",
  role: "editor",
  username: "gslixby0",
  country: "El Salvador",
  contact: "(479) 232-9151",
  email: "gslixby0@abc.net.au",
  currentPlan: "enterprise",
  status: "inactive",
  avatar: "",
  avatarColor: "light-primary",
};

const BlogDetails = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const handleEditClick = (id) => {
    // setSelectedUserId(courseId);
    setSelectedBlogId(id);
    toggleEditModal();
    console.log(id);
  };
  const toggleEditModal = () => setShowEditModal(!showEditModal);

  const [show, setShow] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const ref = useRef(null);
  const [refetch, setRefetch] = useState(false);

  // ** State
  // const [news, setNews] = useState();
  // const [stepper, setStepper] = useState(null);
  const [files, setFiles] = useState([]);
  // const [describe, setDescribe] = useState();
  const [updatedData, setUpdatedData] = useState();

  // ** Hooks
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await getNewsDetail(id);
        console.log("res", res);
        setData(res);
      } catch (error) {
        toast.error("مشکلی در دریافت خبر به وجود آمد !");
      }
    };

    fetchNewsDetail();
  }, [id, refetch]);

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: selectedUser.username,
      lastName: selectedUser.fullName.split(" ")[1],
      firstName: selectedUser.fullName.split(" ")[0],
    },
  });

  // ** render user img
  const renderUserImg = () => {
    if (data?.detailsNewsDto !== null) {
      return (
        <>
          {data.detailsNewsDto?.currentImageAddress ? (
            <img
              height="310"
              width="310"
              alt="عکسی برای این کاربر موجود نیست"
              src={data.detailsNewsDto?.currentImageAddress}
              className="img-fluid rounded mt-3 mb-2"
            />
          ) : (
            <h2
              style={{
                marginBottom: "50px",
                marginTop: "50px",
                color: "darkBlue",
              }}
            >
              {" "}
              این خبر عکس ندارد
            </h2>
          )}
        </>
      );
    } else {
      return (
        <Avatar
          initials
          // color={userDetail.avatarColor || "light-primary"}
          className="rounded mt-3 mb-2"
          content={data.detailsNewsDto?.title}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };

  const handleReset = () => {
    reset({
      username: selectedUser.username,
      lastName: selectedUser.fullName.split(" ")[1],
      firstName: selectedUser.fullName.split(" ")[0],
    });
  };
  const handleActiveInactiveBlog = async () => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: data?.detailsNewsDto?.active
        ? "آیا از غیر فعال کردن خبر مطمئن هستید؟"
        : "آیا از فعال کردن خبر مطمئن هستید ؟",
      text: `آیا از ${
        data?.detailsNewsDto?.active ? "غیر فعال" : "فعال"
      } کردن خبر اطمینان کامل دارید ؟`,
      icon: "warning",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: data?.detailsNewsDto?.active
        ? "غیر فعال کردن"
        : "فعال کردن",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      async preConfirm() {
        const ActivationBlog = await activeAndInactiveBlogAPI(
          !data?.detailsNewsDto?.active,
          id
        );

        if (ActivationBlog) {
          setIsDeleted((prev) => !prev);
          setRefetch(!refetch);

          toast.success(
            `دوره با موفقیت ${isDeleted ? "فعال" : "غیر فعال"} شد !`
          );
        } else {
          toast.error(
            `مشکلی در ${
              data?.detailsNewsDto?.active ? "غیر فعال کردن" : "فعال کردن"
            } خبر به وجود آمد !`
          );
        }
      },
    });
  };

  const handleSuspendedClick = async () => {
    MySwal.fire({
      title:
        // ? "آیا از بازگردانی خبر مطمئن هستید؟"
        "آیا از حذف خبر مطمئن هستید ؟",
      text:
        // ? "در صورت بازگردانی خبر برای کاربران قابل رویت بود ."
        "در صورت حذف خبر, خبر دیگر برای کاربران قابل رویت نخواهد بود.",
      icon: "warning",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      async preConfirm() {
        const deleteBlog = await deleteBlogAPI(id);

        if (deleteBlog) {
          toast.success(`خبر با موفقیت ${"حذف"} شد !`);
        } else {
          toast.error(response.message);
        }
      },
    });
  };

  const dateUpdate = convertDateToPersian(data.detailsNewsDto?.updateDate);
  const insertDate = convertDateToPersian(data.detailsNewsDto?.insertDate);

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {data.detailsNewsDto !== null
                      ? data.detailsNewsDto?.title
                      : " بدون تیتر "}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <h4 className="fw-bolder border-bottom pb-50 mb-1 pt-75 text-center">
            جزییات
          </h4>
          <div className="info-container">
            {data.detailsNewsDto !== null ? (
              <>
                <div className="d-flex justify-content-evenly">
                  <ul className="list-unstyled">
                    <li className="mb-75">
                      <span className="fw-bolder me-25"> تیتر :</span>
                      <span>{data.detailsNewsDto?.title}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25"> نویسنده :</span>
                      <span>{data.detailsNewsDto?.addUserFullName}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25"> تیتر گوگل :</span>
                      <span>{data.detailsNewsDto?.googleTitle}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">وضعیت خبر:</span>
                      <span className="text-capitalize">
                        {data.detailsNewsDto?.active}
                      </span>
                      <Badge
                        className="text-capitalize"
                        color={statusColors[data.detailsNewsDto?.active]}
                      >
                        {data.detailsNewsDto?.active ? "فعال" : "غیرفعال"}
                      </Badge>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">تاریخ درج:</span>
                      <span className="text-capitalize">{insertDate}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25"> تاریخ آپدیت:</span>
                      <span>{dateUpdate}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">تعداد امتیاز :</span>
                      <span>{data.detailsNewsDto?.currentRate}</span>
                    </li>

                    <li className="mb-75">
                      <span className="fw-bolder me-25">تعداد بازدید:</span>
                      <span>{data.detailsNewsDto?.currentView}</span>
                    </li>
                  </ul>
                  <ul className="list-unstyled">
                    {" "}
                    <li className="mb-75">
                      <span className="fw-bolder me-25"> تعداد لایک:</span>
                      <span>{data.detailsNewsDto?.currentLikeCount}</span>
                    </li>{" "}
                    <li className="mb-75">
                      <span className="fw-bolder me-25"> تعداد دیس لایک:</span>
                      <span>{data.detailsNewsDto?.currentDissLikeCount}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25"> کلمات کلیدی:</span>
                      <span>{data.detailsNewsDto?.keyword}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25"> دسته بندی:</span>
                      <span>{data.detailsNewsDto?.newsCatregoryName}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">تعداد کامنت :</span>
                      <span>{data.detailsNewsDto?.commentsCount}</span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">شما این مطلب را :</span>
                      <span className="text-capitalize">
                        {data.detailsNewsDto?.currentUserIsLike
                          ? " پسندیدید "
                          : " نپسندیدید"}
                      </span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {" "}
                        این مطلب در لیسست علاقه مندی های شما :
                      </span>
                      <span className="text-capitalize">
                        {data.detailsNewsDto?.isCurrentUserFavorite
                          ? " هست "
                          : " نیست"}
                      </span>
                    </li>
                    <li className="mb-75">
                      <span className="fw-bolder me-25">
                        {" "}
                        امتیاز شما برای این مطلب :
                      </span>
                      <span>
                        {data.detailsNewsDto?.currentUserRateNumber} امتیاز
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mb-75">
                  <span className="fw-bolder me-25"> توضیحات گوگل:</span>
                  <span>{data.detailsNewsDto?.googleDescribe}</span>
                </div>
                <div className="mb-75">
                  <span className="fw-bolder me-25"> توضیح کوتاه:</span>
                  <span>{data.detailsNewsDto?.miniDescribe}</span>
                </div>
                <div className="mb-75">
                  <span className="fw-bolder me-25"> توضیحات :</span>
                  <span>{data.detailsNewsDto?.describe}</span>
                </div>
              </>
            ) : null}
          </div>

          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => handleEditClick(id)}>
              ویرایش خبر
            </Button>
            <Button
              className="ms-1"
              color="success"
              outline
              onClick={handleActiveInactiveBlog}
            >
              {data.detailsNewsDto?.active
                ? "غیر فعال کردن خبر"
                : "فعال کردن خبر"}
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              حذف
            </Button>
          </div>
          <Row>
            <Col sm="12" id="blogComment">
              <Card>
                <CardHeader className="d-flex justify-content-start align-items-center gap-1">
                  <h3 className="news-details-user-comment-section-text">
                    نظرات کاربران
                  </h3>
                </CardHeader>
                <CardBody>
                  <CommentsTable id={id} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <EditBlog
        handleEditClick={handleEditClick}
        isOpen={showEditModal}
        toggle={toggleEditModal}
        blogId={selectedBlogId}
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </Fragment>
  );
};

export default BlogDetails;
