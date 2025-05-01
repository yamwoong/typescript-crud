import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";     // ✅ 네브바 import
import Footer from "./components/Footer";     // ✅ 푸터 import
import { Home } from "./pages/Home";
import { PostList } from "./pages/PostList";
import { PostDetail } from "./pages/PostDetail";
import { PostForm } from "./pages/PostForm";

export function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/:id/edit" element={<PostForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
