// CommentCard component
import Avatar from "../Avatar";
import {formatDate} from "../../../utils/formatDate";
const CommentCard = ({ username, time, text }) => (
  <div className="bg-gray-100 rounded-lg p-4 mb-2">
    <div className="flex items-center gap-3">
      <Avatar className="rounded-full w-10 h-10" /> {/* Ensure Avatar is round */}
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">{username}</p>
          <p className="text-xs text-gray-500">{calculateDateDifference(time)} ago</p>
        </div>
        <p className="text-gray-700 text-sm mt-1">{text}</p>
      </div>
    </div>
  </div>
);

// CommentSection component
const CommentSection = ({ comment }) => {
  if (typeof comment.comment !== "string") {
    console.error("Invalid comment format:", comment);
    return null; 
  }

  return (
    <div className="max-w-md">
      <CommentCard username={comment.username} text={comment.comment} time={comment.time} />
    </div>
  );
};
export default CommentSection;


// Example usage
function calculateDateDifference(previousDate) {
  const prevDate = new Date(previousDate);
  const currentDate = new Date();

  // Calculate the difference in milliseconds
  let differenceInMs = currentDate - prevDate;

  // Calculate each unit of time, starting from the largest to the smallest
  const yearsDifference = currentDate.getFullYear() - prevDate.getFullYear();
  const monthsDifference = yearsDifference * 12 + (currentDate.getMonth() - prevDate.getMonth());
  const daysDifference = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
  differenceInMs -= daysDifference * 1000 * 60 * 60 * 24;

  const hoursDifference = Math.floor(differenceInMs / (1000 * 60 * 60));
  differenceInMs -= hoursDifference * 1000 * 60 * 60;

  const minutesDifference = Math.floor(differenceInMs / (1000 * 60));
  differenceInMs -= minutesDifference * 1000 * 60;

  const secondsDifference = Math.floor(differenceInMs / 1000);

  // Build the result string based on the highest non-zero unit
  let result = "";

  if (yearsDifference > 0) {
    result = `${yearsDifference} years`;
  } else if (monthsDifference > 0) {
    result = `${monthsDifference} months`;
  } else if (daysDifference > 0) {
    result = `${daysDifference} days`;
  } else if (hoursDifference > 0) {
    result = `${hoursDifference} hrs`;
  } else if (minutesDifference > 0) {
    result = `${minutesDifference} min`;
  } else if (secondsDifference > 0) {
    result = `${secondsDifference} sec`;
  }

  return result;
}



