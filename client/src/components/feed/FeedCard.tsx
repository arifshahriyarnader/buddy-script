import { useEffect, useState } from "react";
import {
  getPostsTotalLikes,
  likeUnlikePost,
} from "../../api/services/postServices";

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
          👍 Like ({likes})
        </button>
        <button className="hover:text-blue-600 cursor-pointer">
          💬 Comment
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
