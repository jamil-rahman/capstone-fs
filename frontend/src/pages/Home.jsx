// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Post from '../components/posts/Post';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { fetchPosts } from '../services/postService';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const loadPosts = async () => {
    if (loading || !user) return;

    try {
      setLoading(true);
      setError(null);

      // Wait for a bit to ensure Firebase is fully initialized
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Fetching posts with user:', user?.email);
      const data = await fetchPosts(page);

      setPosts(prev => [...prev, ...data.posts]);
      setHasMore(data.pagination?.hasMore || false);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Error loading posts:', err);
      if (err.response?.status === 401) {
        setError('Authentication error. Please try logging in again.');
        navigate('/login');
      } else {
        setError('Failed to load posts. Please try again.');
      }
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Reset state when user changes
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [user]);

  // Load posts when user is available
  useEffect(() => {
    if (user) {
      loadPosts();
    }
  }, [user]);

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="info">
          Please <Alert.Link onClick={() => navigate('/login')}>log in</Alert.Link> to view posts.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <InfiniteScroll
        dataLength={posts.length}
        next={loadPosts}
        hasMore={hasMore}
        loader={<LoadingSpinner />}
        endMessage={
          <p className="text-center text-muted py-3">
            {posts.length === 0 ? 'No posts available.' : 'No more posts to load.'}
          </p>
        }
      >
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default Home;