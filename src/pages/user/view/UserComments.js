import React, { useState } from "react";
import {
  Badge,
  Card,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Tooltip,
  UncontrolledDropdown,
} from "reactstrap";
import {
  Archive,
  ChevronDown,
  FileText,
  MoreVertical,
  Trash2,
} from "react-feather";
import ReplyComment from "./ReplyComment";

import DataTable from "react-data-table-component";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import moment from "moment-jalaali";
import {
  useAcceptCourseComment,
  useDeleteCourseComment,
  useRejectCourseComment,
  useUserComments,
} from "../../../@core/services/api/comments";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

moment.loadPersian({ usePersianDigits: true });

const UserComments = ({ id: userId }) => {
  console.log("idIsCorrect?", userId);

  const { data } = useUserComments(1, 100, userId);
  const queryClient = useQueryClient();

  const columns = [
    {
      name: "دوره",
      selector: (row) => (
        <Link to={`/courses/${row?.courseId}`}>{row?.courseTitle}</Link>
      ),
      sortable: true,
    },
    {
      name: "متن نظر",
      selector: (row) => row?.describe,
      sortable: true,
    },
    {
      name: "وضعیت نظر",
      selector: (row) =>
        row?.accept ? (
          <Badge color="success">تایید شده</Badge>
        ) : (
          <Badge color="danger">تایید نشده</Badge>
        ),
      sortable: true,
    },
    {
      name: "اقدامات",
      minWidth: "100px",
      cell: (row) => {
        const acceptComment = useAcceptCourseComment();
        const rejectComment = useRejectCourseComment();
        const deleteComment = useDeleteCourseComment();
        console.log("rowooww", row);

        const [modal, setModal] = useState(null);

        const toggleModal = (userId) => {
          if (modal !== userId) {
            setModal(userId);
          } else {
            setModal(null);
          }
        };
        const handleReplyClick = () => {
          toggleModal(row.courseId);
        };
        return (
          <>
            <div className="column-action">
              <UncontrolledDropdown>
                <DropdownToggle tag="div" className="btn btn-sm">
                  <MoreVertical size={14} className="cursor-pointer" />
                </DropdownToggle>
                <DropdownMenu style={{ zIndex: 8 }}>
                  <DropdownItem
                    tag="a"
                    className="w-100"
                    onClick={() => {
                      acceptComment.mutate(
                        { CommentCourseId: row?.commentId },
                        {
                          onSuccess: () => {
                            toast.success("کامنت مورد نظر تایید شد");
                            queryClient.invalidateQueries(["comments", userId]);
                          },
                          onError: (error) => {
                            console.error("Error accepting comment:", error);
                          },
                        }
                      );
                    }}
                  >
                    <FileText size={14} className="me-50" />
                    <span className="align-middle">تایید نظر</span>
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    className="w-100"
                    onClick={() => {
                      rejectComment.mutate(
                        { CommentCourseId: row?.commentId },
                        {
                          onSuccess: () => {
                            toast.success("کامنت مورد نظر رد شد");
                            queryClient.invalidateQueries(["comments", userId]);
                          },
                          onError: (error) => {
                            console.error("Error rejecting comment:", error);
                          },
                        }
                      );
                    }}
                  >
                    <Archive size={14} className="me-50" />
                    <span className="align-middle">رد نظر</span>
                  </DropdownItem>
                  <DropdownItem
                    tag="a"
                    className="w-100"
                    onClick={() => {
                      deleteComment.mutate(row?.commentId, {
                        onSuccess: () => {
                          toast.success("کامنت مورد نظر حذف شد");
                          queryClient.invalidateQueries(["comments", userId]);
                        },
                        onError: (error) => {
                          console.error("Error deleting comment:", error);
                        },
                      });
                    }}
                  >
                    <Trash2 size={14} className="me-50" />
                    <span className="align-middle">حذف نظر</span>
                  </DropdownItem>
                  <DropdownItem className="w-100" onClick={handleReplyClick}>
                    <Archive cursor="pointer" size={14} className="me-50" />
                    <span className="w-100">پاسخ به نظر</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <ReplyComment
              commentId={row.commentId}
              courseId={row.courseId}
              title={row?.courseTitle}
              describe={row.describe}
              toggleModal={toggleModal}
              modal={modal}
              setModal={setModal}
              courseReserve={[]}
            />
          </>
        );
      },
    },
  ];

  return (
    <Card>
      <CardHeader tag="h4">لیست نظرات کاربر</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data?.comments}
          className="react-dataTable overflow-visible"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default UserComments;
