// CommentCard component
import Avatar from "../Avatar";
import {formatDate} from "../../../utils/formatDate";
const CommentCard = ({ username, time, text }) => (
  <div className="bg-white shadow-md rounded-lg p-2 mb-2">
    <div className="flex items-left mb-2 gap-2">
      <Avatar />
      <div>
        <p className="font-bold">{username}</p>
        <p className="text-xs text-gray-500">{formatDate(time)}</p>
      </div>
    </div>
    <p className="text-gray-700 mb-4">{text}</p>
  </div>
);

// CommentSection component
const CommentSection = ({ comment }) => {
  if (typeof comment.comment !== "string") {
    console.error("Invalid comment format:", comment);
    return null; // Render nothing if the comment format is invalid
  }

  return (
    <div className="max-w-md mx-auto">
      <CommentCard username={comment.username} text={comment.comment} time={comment.time} />
    </div>
  );
};
export default CommentSection;