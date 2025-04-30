import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { DefaultService } from '../api/generated/services/DefaultService';

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { post, loading, error } = usePost(id!);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await DefaultService.deleteApiPosts(id!);
      navigate('/posts');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Failed to delete the post.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>
        Created: {post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown'}
      </small>
      <br />
      <button onClick={handleDelete}>🗑 Delete</button>
      <br />
      <Link to="/posts">← Back to list</Link>
    </div>
  );
}
