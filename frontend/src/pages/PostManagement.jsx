// src/pages/PostManagement.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Alert } from 'react-bootstrap';
import { Trash2 } from 'lucide-react';
import { getMyPosts, deletePost } from '../services/postService';
import { formatPostDate } from '../utils/timeUtil';

const PostManagement = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchPosts = async () => {
        try {
            const response = await getMyPosts();
            setPosts(response.posts);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        try {
            await deletePost(postId);
            setSuccessMessage('Post deleted successfully');
            setPosts(posts.filter(post => post._id !== postId));
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete post');
            setTimeout(() => setError(null), 3000);
        }
    };

    if (loading) return <div className="text-center p-5">Loading...</div>;

    return (
        <Container className="py-4">
            <h2 className="mb-4">My Posts</h2>

            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}
            {successMessage && <Alert variant="success" className="mb-3">{successMessage}</Alert>}

            {posts.length === 0 ? (
                <Card className="text-center p-4">
                    <p className="mb-0">No posts found</p>
                </Card>
            ) : (
                <div className="post-list">
                    {posts.map(post => (
                        <Card key={post._id} className="mb-3">
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="mb-1">{post.title}</h5>
                                    <small className="text-muted">
                                        Posted on {formatPostDate(post.createdAt)}
                                    </small>
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(post._id)}
                                    className="d-flex align-items-center gap-2"
                                >
                                    <Trash2 size={16} />
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )}
        </Container>
    );
};

export default PostManagement;