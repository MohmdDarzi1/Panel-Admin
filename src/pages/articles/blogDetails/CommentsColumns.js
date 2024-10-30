// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import { Button } from "reactstrap";
import NewsReplyComment from "./NewsReplyComment";
import { Eye } from "react-feather";


export const CommentsColumns = [
  {
    name: "نام کاربر",
    reorder: true,
    minWidth: "100px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.autor}</span>
      </div>
    ),
  },
  {
    name: "عنوان نظر",
    reorder: true,
    minWidth: "120px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.title}</span>
      </div>
    ),
  },
  {
    name: "تعداد لایک",
    reorder: true,
    width: "100px",
    cell: (row) => (
      <div className="text-truncate ms-1">
        <span>{row.likeCount}</span>
      </div>
    ),
  },
  {
    name: "عملیات",
    minWidth: "100px",
    cell: (row) => {
      // ** States
      const [modal, setModal] = useState(null);

      const toggleModal = (id) => {
        if (modal !== id) {
          setModal(id);
        } else {
          setModal(null);
        }
      };

      const handleReplyClick = () => {
        toggleModal(row.newsId);
      };

      return (
        <div className="column-action d-flex align-items-center gap-1">
          <div className="d-flex align-items-center gap-2">
            <span
              className="p-0 border-none cursor-pointer d-flex gap-1 "
              onClick={handleReplyClick}
              outline
            >
              <Eye style={{width:"15px"}}/>
          <span>پاسخ</span>
            </span>
            <NewsReplyComment
              commentId={row.id}
              newsId={row.newsId}
              title={row.title}
              describe={row.describe}
              toggleModal={toggleModal}
              modal={modal}
            />
          </div>
        </div>
      );
    },
  },
];
