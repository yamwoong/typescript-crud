import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div>
      <h1>Welcome to the Blog</h1>
      <Link to="/posts">View Posts</Link>  {/* /posts로 이동 */}
    </div>
  );
}
