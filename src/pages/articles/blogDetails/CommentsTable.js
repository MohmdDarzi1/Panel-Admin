// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";

import { CommentsColumns } from "./CommentsColumns";
import { getAdminNewsCommentsAPI } from "../../../@core/services/api/articles";
// import { getAdminNewsCommentsAPI } from "../../../../services/api/blog/get-admin-news-comments-api";

const CommentsTable = ({ id }) => {
  // ** States
  const [comments, setComments] = useState();

  // ** Custom Pagination

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const getComments = await getAdminNewsCommentsAPI(id);

        setComments(getComments);
      } catch (error) {
        console.log(error);
        toast.error("مشکلی در دریافت نظرات به وجود آمد !");
      }
    };

    fetchComments();
  }, []);

  return (
    <DataTable
      noHeader
      className="react-dataTable overflow-visible"
      columns={CommentsColumns}
      sortIcon={<ChevronDown size={10} />}
      data={comments}
    />
  );
};

export default CommentsTable;
