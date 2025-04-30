import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../src/pages/Home';            
import { PostDetail } from './pages/PostDetail';
import { PostList } from './pages/PostList';
import { PostForm } from './pages/PostForm';


export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />             {/* 메인 홈 페이지 */}
      <Route path="/posts" element={<PostList />} />    {/* 게시글 리스트 */}
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/posts/new" element={<PostForm />} />
      <Route path="/posts/:id/edit" element={<PostForm />} />
      <Route path="*" element={<Navigate to="/" />} />  {/* 나머지 404는 홈으로 */}
    </Routes>
  );
}