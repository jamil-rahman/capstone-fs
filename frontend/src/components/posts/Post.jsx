// src/components/posts/Post.jsx
import React, { useState, useRef } from 'react';
import { Card, Overlay, Popover } from 'react-bootstrap';
import UserPreferences from './UserPreferences';
import MiniProfile from './MiniProfile';
import { formatPostDate } from '../../utils/timeUtil';
import { getMiniProfile } from '../../services/profileService';

const Post = ({ post }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [miniProfile, setMiniProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const targetRef = useRef(null);
    const timeoutRef = useRef(null);

    if (!post || !post.author) {
        return null;
    }

    const { author } = post;

    const handleMouseEnter = async () => {
        timeoutRef.current = setTimeout(async () => {
            if (!miniProfile && !loading) {
                setLoading(true);
                setError(null);
                try {
                    // Use MongoDB _id
                    if (!author._id) {
                        console.log('Author data:', author);
                        throw new Error('Author ID not available');
                    }

                    const response = await getMiniProfile(author._id);
                    if (response.success) {
                        setMiniProfile(response.profile);
                        setShowTooltip(true);
                    } else {
                        throw new Error(response.message || 'Failed to fetch profile');
                    }
                } catch (err) {
                    console.error('Mini profile error:', err);
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else if (!error) {
                setShowTooltip(true);
            }
        }, 300);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowTooltip(false);
    };

    // Clean up timeout on unmount
    React.useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <div>
                    <div
                        ref={targetRef}
                        className="fw-bold d-inline-block"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ cursor: 'pointer' }}
                    >
                        {author.name || 'Unknown User'}
                    </div>
                    <div className='p-1 my-2'>
                    {author.preferences && <UserPreferences preferences={author.preferences} />}
                    </div>
                    <Overlay
                        target={targetRef.current}
                        show={showTooltip}
                        placement="right-start"
                        offset={[0, 8]}
                        popperConfig={{
                            modifiers: [
                                {
                                    name: 'preventOverflow',
                                    options: {
                                        boundary: document.body,
                                        padding: 8
                                    },
                                },
                                {
                                    name: 'offset',
                                    options: {
                                        offset: [0, 8],
                                    },
                                }
                            ],
                        }}
                    >
                        {({ placement, arrowProps, show: _show, popper, ...props }) => (
                            <Popover
                                {...props}
                                style={{
                                    ...props.style,
                                    zIndex: 1000,
                                    padding: 0,
                                    border: 'none',
                                    backgroundColor: 'transparent'
                                }}
                            >
                                {loading ? (
                                    <Card className="shadow-sm" style={{ width: '300px' }}>
                                        <Card.Body className="text-center">
                                            <div className="spinner-border spinner-border-sm text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ) : error ? (
                                    <Card className="shadow-sm" style={{ width: '300px' }}>
                                        <Card.Body className="text-center text-danger">
                                            {error}
                                        </Card.Body>
                                    </Card>
                                ) : (
                                    <MiniProfile profile={miniProfile} />
                                )}
                            </Popover>
                        )}
                    </Overlay>
                </div>

                <Card.Text className="mb-3">{post.body}</Card.Text>

                <small className="text-muted">
                    {formatPostDate(post.createdAt)}
                </small>
            </Card.Body>
        </Card >
    );
};

export default Post;