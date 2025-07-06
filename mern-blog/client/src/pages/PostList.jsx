import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Spinner from '../components/Spinner';
import { postService, categoryService } from '../services/api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || null;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [postsData, categoriesData] = await Promise.all([
          postService.getAllPosts(page, 6, category),
          categoryService.getAllCategories(),
        ]);
        
        setPosts(postsData.posts);
        setTotalPosts(postsData.total);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, category]);

  const handleCategoryChange = (cat) => {
    setSearchParams({ category: cat });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, ...(category && { category }) });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">All Posts</h1>
          
          {posts.length === 0 ? (
            <p className="text-gray-600">No posts found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {page} of {Math.ceil(totalPosts / 6)}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= Math.ceil(totalPosts / 6)}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>

        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`text-blue-600 hover:underline ${!category ? 'font-bold' : ''}`}
                >
                  All Categories
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <button
                    onClick={() => handleCategoryChange(cat._id)}
                    className={`text-blue-600 hover:underline ${category === cat._id ? 'font-bold' : ''}`}
                  >
                    {cat.name} ({cat.postCount || 0})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;