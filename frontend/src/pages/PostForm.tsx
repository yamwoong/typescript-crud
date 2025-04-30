import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DefaultService } from '../api/generated/services/DefaultService';

export function PostForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch post for editing
  useEffect(() => {
    if (isEditMode) {
      DefaultService.getApiPosts1(id!).then((res) => {
        if (res.post) {
          const t = res.post.title || '';
          const c = res.post.content || '';
          setTitle(t);
          setContent(c);
          setInitialTitle(t);
          setInitialContent(c);
        }
      });
    }
  }, [isEditMode, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        const isTitleChanged = title.trim() !== initialTitle.trim();
        const isContentChanged = content.trim() !== initialContent.trim();

        if (!isTitleChanged && !isContentChanged) {
          setError('No changes made to the post.');
          return;
        }

        const updatePayload: Record<string, string> = {};
        if (isTitleChanged) updatePayload.title = title;
        if (isContentChanged) updatePayload.content = content;

        await DefaultService.putApiPosts(id!, updatePayload);
      } else {
        await DefaultService.postApiPosts({ title, content });
      }

      navigate('/posts');
    } catch (err: any) {
      const message =
        err?.response?.data?.message || 'Failed to save the post.';
      setError(message);
    }
  };

  return (
    <div>
      <h2>{isEditMode ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button type="submit">
          {isEditMode ? 'Update Post' : 'Create Post'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
