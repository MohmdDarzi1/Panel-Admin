import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  deleteCourseReserveAPI,
  getCourseByIdAPI,
} from "../../../@core/services/api/courses";
import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "reactstrap";
import { Check, X } from "react-feather";
import { convertDateToPersian } from "../../../@core/utils/date-helper.utils";
import AcceptReserveModal from "./AcceptReserveModal";
import { useQueryClient } from "@tanstack/react-query";

export const courseReservedColumns = [
  {
    name: "نام دوره",
    reorder: true,
    minWidth: "250px",
    maxWidth:"250px",
    

    cell: (row) => {
      const [course, setCourse] = useState();

      useEffect(() => {
        const fetchCourse = async () => {
          try {
            const getCourse = await getCourseByIdAPI(row.courseId);
            setCourse(getCourse);
          } catch (error) {
            toast.error("مشکلی در دریافت دوره به وجود آمد !");
          }
        };

        fetchCourse();
      }, [row.courseId]);

      return (
        <Link
          to={`/courses/${row.courseId}`}
          className="d-flex align-items-center"
        >
          <div className="text-truncate ms-1">
            <span
              className="course-reserve-student-name fw-bold"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "150px",
              }}
            >
              {row.courseName}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    name: "نام رزرو کننده",
    reorder: true,
    minWidth: "230px",
    maxWidth:"230px",

    cell: (row) => {
      return (
        <Link to={`/users/${row.studentId}`}>
          <div
            className="user-info text-truncate ms-1 fw-bold"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "150px",
            }}
          >
            <span className="course-reserve-student-name">
              {row.studentName}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    name: "زمان رزرو",
    reorder: true,
    minWidth: "180px",
    maxWidth:"180px",

    cell: (row) => <span className="fw-bold">{convertDateToPersian(row.reserverDate)}</span>,
  },
  {
    name: "وضعیت رزرو",
    reorder: true,
    minWidth: "180px",
    maxWidth:"180px",
    cell: (row) => (
      <Badge color={row.accept ? "light-success" : "light-danger"}>
        {row.accept ? "تایید شده" : "تایید نشده"}
      </Badge>
    ),
  },
  {
    name: "تایید رزرو",
    reorder: true,
    minWidth: "200px",
    maxWidth:"300px",
    cell: (row) => {
      const [deleteModal, setDeleteModal] = useState(false);
      const [acceptModal, setAcceptModal] = useState(false);
      const [selectedReserve, setSelectedReserve] = useState(null);
      const queryClient = useQueryClient();

      const toggleDeleteModal = () => setDeleteModal(!deleteModal);
      const toggleAcceptModal = () => setAcceptModal(!acceptModal);

      const handleDeleteCourseReserve = async () => {
        try {
          const deleteReserve = await deleteCourseReserveAPI(row.reserveId);

          if (deleteReserve.success) {
            toast.success("رزرو با موفقیت حذف شد !");
            queryClient.invalidateQueries(["getCourseReserveAPI"]);
          } else {
            toast.error("مشکلی در حذف دوره به وجود آمد !");
            toast.error(deleteReserve.message);
          }
        } catch (error) {
          toast.error("مشکلی در حذف رزرو به وجود آمد !");
        } finally {
          toggleDeleteModal();
        }
      };

      const handleAcceptReserve = () => {
        setSelectedReserve(row);
        toggleAcceptModal();
      };

      return (
        <>
          {!row?.accept ?
           (
            <div>
              <div className="d-flex gap-2">
                <div>
                  <Button
                   
                    outline
                    size="sm"
                    className="py-1 "
                    color={"success"}
                    onClick={handleAcceptReserve}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    پذیرفتن رزرو
                  </Button>
                  {selectedReserve && (
                    <AcceptReserveModal
                      courseId={selectedReserve.courseId}
                      studentId={selectedReserve.studentId}
                      toggleAcceptModal={toggleAcceptModal}
                      acceptModal={acceptModal}
                    />
                  )}
                </div>
                <div>
                  <Button
                    outline
                    size="sm"
                    className="py-1 "
                    color={"danger"}
                    isOpen={deleteModal}
                    onClick={toggleDeleteModal}
                    style={{ whiteSpace: "nowrap"}}
                  >
                    رد کردن رزرو
                  </Button>

                  <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
                    <ModalHeader toggle={toggleDeleteModal}>
                      تایید حذف رزرو
                    </ModalHeader>
                    <ModalBody>
                      آیا مطمئن هستید که می‌خواهید این رزرو را حذف کنید؟
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        onClick={handleDeleteCourseReserve}
                      >
                        بله
                      </Button>
                      <Button color="secondary" onClick={toggleDeleteModal}>
                        خیر
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </div>
          ) : <div>
            <span style={{color:"green"
            }} className="fw-bold">دوره ی رزرو شده قابل تغییر نمیباشد</span>
            </div>
          }
        </>
      );
    },
  },
];
