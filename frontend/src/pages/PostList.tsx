import type React from "react";
import { usePosts } from "../hooks/usePosts";
import { PostCard } from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate, Link } from "react-router-dom";

export const PostList: React.FC = () => {
  const { posts, loading, error } = usePosts();
  const navigate = useNavigate();

  const handlePostClick = (id: string) => {
    navigate(`/posts/${id}`);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">All Posts</h1>
        <Link to="/posts/new" className="btn btn-primary">
          Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">
            No posts available. Why not create the first one?
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onClick={() => handlePostClick(post._id!)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
