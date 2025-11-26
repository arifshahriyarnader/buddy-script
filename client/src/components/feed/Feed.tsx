import { useEffect, useState } from "react";
import type { PostType } from "../../types/post";
import logo from "../../assets/images/logo.svg";
import { authServices } from "../../auth";
import { useNavigate } from "react-router-dom";
import { addPost, getAllPosts } from "../../api/services/postServices";
import FeedCard from "./FeedCard";

const Feed = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = authServices.isUserLoggedIn();
  const [userName, setUserName] = useState("user");
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    setTimeout(() => {
      if (isUserLoggedIn) {
        const stored = localStorage.getItem("BUDDY_SCRIPT_LOGGED_IN_USER");
        if (!stored) {
          setUserName("user");
          return;
        }
        const user = JSON.parse(stored)?.user;
        const fullName =
          user?.firstname && user?.lastname
            ? `${user.firstname} ${user.lastname}`
            : "user";

        setUserName(fullName);
      }
    }, 0);
  }, [isUserLoggedIn]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) {
      alert("Post content cannot be empty.");
      return;
    }
    try {
      await addPost({ text: postText });
      alert("Post created successfully!");
      setPostText("");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  const fetchPosts = async () => {
    try {
      const data = await getAllPosts();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Failed to fetch posts. Please try again.");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchPosts();
    });
  }, []);

  const handleLogout = () => {
    authServices.logout();
    localStorage.removeItem("user");
    setUserName("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 min-h-screen bg-white shadow-md p-6 hidden md:block">
        <img src={logo} alt="Logo" className="h-10 mb-8" />

        <ul className="space-y-4 text-gray-700">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">My Profile</li>
          <li className="hover:text-blue-600 cursor-pointer">Messages</li>
          <li className="hover:text-blue-600 cursor-pointer">Settings</li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <div className="bg-white p-4 rounded-xl shadow flex items-center justify-between mb-6">
          <img src={logo} alt="Logo" className="h-8" />

          <div className="relative group">
            <button className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-gray-300" />
              <span className="font-medium">{userName}</span>
            </button>

            <div className="absolute right-0 top-10 bg-white shadow-md rounded-lg p-3 w-36 hidden group-hover:block">
              <button
                className="w-full text-left hover:text-red-500 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <form onSubmit={handleCreatePost}>
            <textarea
              placeholder="What's on your mind?"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 outline-none mb-3"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Post
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <FeedCard key={post._id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Feed;
