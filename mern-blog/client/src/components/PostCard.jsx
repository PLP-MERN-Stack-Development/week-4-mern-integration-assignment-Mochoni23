import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {formatDate(post.createdAt)}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
            {post.category?.name || 'Uncategorized'}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">
          <Link to={`/posts/${post._id}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.excerpt || post.content.substring(0, 100) + '...'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            By {post.author?.name || 'Anonymous'}
          </span>
          <Link
            to={`/posts/${post._id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;