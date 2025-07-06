import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Spinner from './components/Spinner';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A wrapper component that ensures the child components are only accessible 
 * to authenticated users. If the authentication status is loading, it displays 
 * a spinner. If the user is not authenticated, it redirects to the login page.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 * @returns {React.ReactNode} The children if authenticated, otherwise a redirect to the login page.
 */

/*******  73f4a024-e4bc-4220-aea2-32cab1d3a414  *******/
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <Spinner />;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route 
        path="/create-post" 
        element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

export default AppRoutes; 