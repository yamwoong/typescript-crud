import { usePosts } from '../hooks/usePosts';
import { Link } from 'react-router-dom';

export function PostList() {
  const { posts, loading, error } = usePosts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <Link to="/posts/new">✏️ 새 글 작성</Link> {/* ✅ 작성 버튼 추가 */}
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
            {' '}
            <Link to={`/posts/${post._id}/edit`}>🛠 수정</Link> {/* ✅ 수정 링크 추가 */}
          </li>
        ))}
      </ul>
    </div>
  );
}
