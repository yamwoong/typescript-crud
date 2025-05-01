import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePost } from "../hooks/usePost";
import { DefaultService } from "../api/generated";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export const PostForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { post, loading, error } = usePost(id || "");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      const safeTitle = post.title ?? "";
      const safeContent = post.content ?? "";

      setTitle(safeTitle);
      setContent(safeContent);
      setOriginalTitle(safeTitle);
      setOriginalContent(safeContent);
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (!title.trim()) {
      setFormError("Please enter a title.");
      return;
    }

    if (!content.trim()) {
      setFormError("Please enter some content.");
      return;
    }

    try {
      setSubmitting(true);

      if (isEditMode) {
        const titleChanged = title !== originalTitle;
        const contentChanged = content !== originalContent;

        if (!titleChanged && !contentChanged) {
          setSuccessMessage("No changes detected.");
          setSubmitting(false);
          return;
        }

        const payload: { title?: string; content?: string } = {};
        if (titleChanged) payload.title = title;
        if (contentChanged) payload.content = content;

        await DefaultService.putApiPosts(id!, payload);
        navigate(`/posts/${id}`);
      } else {
        await DefaultService.postApiPosts({ title, content });
        navigate("/posts");
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "An error occurred while saving the post.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isEditMode && loading) return <LoadingSpinner />;
  if (isEditMode && error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        {isEditMode ? "Edit Post" : "Create New Post"}
      </h1>

      {formError && <ErrorMessage message={formError} />}
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative my-4"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Enter a descriptive title"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-input min-h-[200px]"
            placeholder="Write the content of your post here..."
          />
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting
              ? "Saving..."
              : isEditMode
              ? "Update Post"
              : "Create Post"}
          </button>

          <Link to={isEditMode ? `/posts/${id}` : "/posts"} className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
