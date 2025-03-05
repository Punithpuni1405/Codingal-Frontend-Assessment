import PostsPage from '@/pages/posts';
import { Navbar } from '../components/Navbar';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="p-4">
        {/* <h1>Welcome to the Class</h1> */}
      </main>
      <PostsPage />
    </div>
  );
}
