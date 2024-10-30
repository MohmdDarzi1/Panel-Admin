// ** Reactstrap Imports
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// ** Reactstrap Imports
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useAddReplyCourseComment } from "../../../@core/services/api/comments";

const ReplyComment = ({
  commentId,
  courseId,
  title,
  describe,
  toggleModal,
  modal,
  setModal
}) => {
  const AddReplyCourseComment = useAddReplyCourseComment();
  const { data } = AddReplyCourseComment;
  // ** States
  const [commentText, setCommentText] = useState("");

  // ** Hooks
  const navigate = useNavigate();

  // ** Handle submit function
  const handleSubmit = async () => {
    try {
      const commentData = {
        commentId,
        courseId,
        title: `پاسخ برای: ${title}`,
        describe: commentText,
      };

      const formDataToSend = new FormData();
      for (const key in commentData) {
        formDataToSend.append(key, commentData[key]);
      }

      AddReplyCourseComment.mutate(formDataToSend, {
        onSuccess: (data) => {
          toast.success("پاسخ با موفقیت ارسال شد");
          setModal(!modal);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    } catch (error) {
      toast.error("مشکلی در ارسال پاسخ شما به وجود آمد !");
    }
  };

  return (
    <Modal
      isOpen={modal === courseId}
      toggle={() => toggleModal(courseId)}
      className="modal-dialog-centered"
      key={courseId}
    >
      <ModalHeader toggle={() => toggleModal(courseId)}>
        <span className="fw-bold">عنوان نظر: </span>
        <span>{title}</span>
      </ModalHeader>
      <ModalBody toggle={() => toggleModal(courseId)}>
        <div className="d-flex mt-1 course-reply-comment-text">
          <span className="fw-bold">پیام: </span>
          <p>{describe}</p>
        </div>
        <div>
          <Label for="replyText">پیام شما:</Label>
          <Input
            type="textarea"
            id="replyText"
            placeholder="پیام شما ..."
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-start">
        <Button
          color="primary"
          disabled={!commentText || commentText.length < 5}
          type="submit"
          onClick={handleSubmit} // اینجا تابع handleSubmit را فراخوانی می‌کنیم
        >
          ارسال
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ReplyComment;
