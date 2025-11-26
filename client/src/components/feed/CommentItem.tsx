import React from "react";
import type { CommentType } from "../../types/comment";

interface CommentItemProps {
  comment: CommentType;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow border border-gray-200">
      <div>
        <p className="font-medium text-sm">
          {comment.author.firstname} {comment.author.lastname}
        </p>

        <p className="text-gray-700">{comment.text}</p>

        <p className="text-xs text-gray-400 mt-1">
          {new Date(comment.createdAt).toLocaleString()}
        </p>

        <div className="mt-2 flex gap-4 text-sm text-gray-600">
          <button className="hover:text-blue-600 cursor-pointer">Reply</button>
          <button className="hover:text-blue-600 cursor-pointer">Like</button>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-3 border-l pl-4 space-y-3">
          {comment.replies.map((rep) => (
            <CommentItem key={rep._id} comment={rep} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
