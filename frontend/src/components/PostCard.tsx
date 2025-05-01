import type React from "react";
import { Link } from "react-router-dom";
import type { Post } from "../api/generated/models/Post";

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold text-blue-600 mb-2">{post.title ?? ""}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.content ?? ""}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Posted on: {formatDate(post.createdAt ?? "")}</span>
        <Link to={`/posts/${post._id ?? ""}`} className="text-blue-500 hover:text-blue-700">
          Read more →
        </Link>
      </div>
    </div>
  );
};
