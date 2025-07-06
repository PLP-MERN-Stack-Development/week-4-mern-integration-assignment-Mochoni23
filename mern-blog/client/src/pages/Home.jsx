import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import { postService } from '../services/api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Temporarily disabled API call for testing
    // const fetchPosts = async () => {
    //   try {
    //     const data = await postService.getAllPosts(1, 3);
    //     setPosts(data.posts);
    //   } catch (error) {
    //     console.error('Error fetching posts:', error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // };

    // fetchPosts();
        setIsLoading(false);
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <section className="mb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          {posts.length === 0 && (
            <div className="text-center text-gray-500">
              <p>No posts available. Start the backend server to see posts.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to MERN Blog</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A full-stack blog application built with MongoDB, Express, React, and Node.js.
            Create an account to start writing your own posts and commenting on others.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;