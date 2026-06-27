import CommentContainer from "./CommentContainer";
import data from "./comment.json";

function Page() {
  return (
    <>
      <div>Reddit Comment UI</div>
      <CommentContainer data={data} />
    </>
  );
}

export default Page;
