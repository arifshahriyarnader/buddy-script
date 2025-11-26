import { useEffect, useState } from "react";
import {
  getPostsTotalLikes,
  likeUnlikePost,
} from "../../api/services/postServices";
import {
  addComment,
  getCommentsWithReplies,
} from "../../api/services/commentServices";
import type { CommentType } from "../../types/comment";
import CommentItem from "./CommentItem";

interface FeedCardProps {
  post: {
    _id: string;
    author: {
      firstname: string;
      lastname: string;
    };
    text: string;
    createdAt: string;
  };
}

const FeedCard: React.FC<FeedCardProps> = ({ post }) => {
  const first = post.author?.firstname || "Unknown";
  const last = post.author?.lastname || "";
  const [likes, setLikes] = useState<number>(0);
  const [liked, setLiked] = useState<boolean>(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);

  const loadComments = async () => {
    try {
      const data = await getCommentsWithReplies(post._id);
      setComments(data.comments || []);
    } catch (err) {
      console.error("Error loading comments:", err);
      setComments([]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (showCommentBox) loadComments();
    }, 0);
  }, [showCommentBox]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const data = await getPostsTotalLikes(post._id);
        setLikes(data.totalLikes);
      } catch (err) {
        console.error("Error fetching likes:", err);
      }
    };
    fetchLikes();
  }, [post._id]);

  const handleLike = async () => {
    try {
      const result = await likeUnlikePost(post._id);
      setLiked(result.liked);
      setLikes(result.totalLikes);
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return alert("Comment cannot be empty.");

    try {
      await addComment({
        postId: post._id,
        text: commentText,
      });

      alert("Comment added!");
      setCommentText("");
      setShowCommentBox(false);
    } catch (err) {
      console.error("Comment error:", err);
      alert("Failed to add comment.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-gray-300" />
        <div>
          <h4 className="font-medium">
            {" "}
            {first} {last}
          </h4>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <p className="mb-3">{post.text}</p>

      {/* {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="rounded-lg mb-3 max-h-96 object-cover"
        />
      )} */}

      <div className="flex items-center gap-6 text-gray-600">
        <button
          className={`cursor-pointer hover:text-blue-600 ${
            liked ? "text-blue-600" : ""
          }`}
          onClick={handleLike}
        >
          Like ({likes})
        </button>
        <button
          className="hover:text-blue-600 cursor-pointer"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          💬 Comment
        </button>
      </div>
      {showCommentBox && (
        <div className="mt-3 bg-gray-100 p-3 rounded-xl">
          <textarea
            placeholder="Write a comment..."
            className="w-full border rounded-lg px-3 py-2 outline-none"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />

          <button
            onClick={handleAddComment}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
          >
            Post Comment
          </button>
          <div className="mt-4 space-y-3">
            {comments?.map((c) => (
              <CommentItem key={c._id} comment={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedCard;
