import type React from "react";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { DefaultService } from "../api/generated";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(id || "");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!id) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await DefaultService.deleteApiPosts(id);
      navigate("/posts");
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete post");
      setIsDeleting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      {deleteError && <ErrorMessage message={deleteError} />}

      <div className="mb-6 flex items-center">
        <Link to="/posts" className="text-blue-500 hover:text-blue-700 mr-4">
          ← Back to Posts
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{post.title ?? ""}</h1>

        <div className="text-sm text-gray-500 mb-6">
          <p>Created: {formatDate(post.createdAt ?? "")}</p>
          {post.updatedAt !== post.createdAt && <p>Updated: {formatDate(post.updatedAt ?? "")}</p>}
        </div>

        <div className="prose max-w-none mb-8">
          <p className="whitespace-pre-line">{post.content ?? ""}</p>
        </div>

        <div className="flex space-x-4">
          <Link to={`/posts/${post._id!}/edit`} className="btn btn-secondary">
            Edit Post
          </Link>
          <button onClick={handleDelete} className="btn btn-danger" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete Post"}
          </button>
        </div>
      </div>
    </div>
  );
};
