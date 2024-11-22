import { Card } from 'react-bootstrap';
import UserPreferences from './UserPreferences';
import { formatPostDate } from '../../utils/timeUtil';

const Post = ({ post }) => {
    // Early return if post or author is missing
    if (!post || !post.author) {
        return null;
    }

    const { author } = post;

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Card.Title className="h4 mb-3">{post.title}</Card.Title>

                <div className="d-flex align-items-center mb-3">
                    {author.photo ? (
                        <img
                            src={author.photo}
                            alt={author.name}
                            className="rounded-circle me-2"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                    ) : (
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                            style={{ width: '40px', height: '40px' }}>
                            {author.name?.[0] || '?'}
                        </div>
                    )}

                    <div>
                        <div className="fw-bold">{author.name || 'Unknown User'}</div>
                        {author.preferences && <UserPreferences preferences={author.preferences} />}
                    </div>
                </div>

                <Card.Text className="mb-3">{post.body}</Card.Text>

                <small className="text-muted">
                    {formatPostDate(post.createdAt)}
                </small>
            </Card.Body>
        </Card>
    );
};


export default Post;