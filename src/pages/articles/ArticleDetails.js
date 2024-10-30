import { useParams } from "react-router-dom";
import { useArticleDetails } from "../../@core/services/api/articles";

const ArticleDetails = () => {
  const { id } = useParams();
  console.log("artID", id);
  const { data } = useArticleDetails(id);
  console.log("newsDetail", data);

  return <div>articles detail {id}</div>;
};
export default ArticleDetails;
