import { Fragment } from "react/jsx-runtime";

interface IComments {
  id: string;
  profileImg: string;
  profileName: string;
  comment: string;
  replies?: IComments[] | [];
}

interface ICommentContainerProps {
  data: IComments[];
}

function CommentContainer({ data }: Readonly<ICommentContainerProps>) {
  return (
    <>
      {data.map((comment) => {
        return (
          <Fragment key={comment.id}>
            <div className="flex items-center mb-4">
              <div className="mr-3">
                <img
                  alt="profile image"
                  src={comment.profileImg}
                  className="w-[2.5rem]"
                />
              </div>
              <div>
                <div className="font-bold text-[1rem]">
                  {comment.profileName}
                </div>
                <div className="text-sm">{comment.comment}</div>
              </div>
            </div>
            {comment?.replies && (
              <div className="border-l border-gray-400 ml-9 pl-9">
                <CommentContainer data={comment.replies} />
              </div>
            )}
          </Fragment>
        );
      })}
    </>
  );
}

export default CommentContainer;
