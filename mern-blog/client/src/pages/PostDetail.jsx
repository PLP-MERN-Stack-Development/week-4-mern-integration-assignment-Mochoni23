import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import Spinner from '../components/Spinner';
import { postService } from '../services/api';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (err) {
        setError(err.message || 'Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleAddComment = async (postId, commentData) => {
    try {
      const updatedPost = await postService.addComment(postId, commentData);
      setPost(updatedPost);
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="container mx-auto px-4 py-8 text-red-600">{error}</div>;
  if (!post) return <div className="container mx-auto px-4 py-8">Post not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 md:h-96 object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">
              {formatDate(post.createdAt)}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {post.category?.name || 'Uncategorized'}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center mb-6">
            <div className="mr-4">
              <span className="text-gray-600">By {post.author?.name || 'Anonymous'}</span>
            </div>
          </div>
          <div className="prose max-w-none mb-8">
            {post.content}
          </div>
        </div>
      </article>

      <section className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Comments ({post.comments?.length || 0})</h2>
        
        <CommentForm postId={post._id} onCommentAdded={handleAddComment} />
        
        {post.comments && post.comments.length > 0 ? (
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment._id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{comment.author?.name || 'Anonymous'}</h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </section>
    </div>
  );
};

export default PostDetail;