// src/components/posts/MiniProfile.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const MiniProfile = ({ profile }) => {
    if (!profile) return null;

    const formatCleanliness = (value) => {
        return value.split('-').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    return (
        <Card className="shadow-sm" style={{ width: '300px' }}>
            <Card.Body className="p-3">
                <div className="d-flex align-items-center mb-3">
                    {profile.photo ? (
                        <img
                            src={profile.photo}
                            alt={profile.name}
                            className="rounded-circle me-2"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                    ) : (
                        <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                            style={{ width: '50px', height: '50px' }}
                        >
                            {profile.name?.[0] || '?'}
                        </div>
                    )}
                    <div>
                        <h6 className="mb-0">{profile.name}</h6>
                        <small className="text-muted">
                            {profile.occupation}
                        </small>
                    </div>
                </div>

                <div className="mb-2">
                    <i className="bi bi-geo-alt me-2"></i>
                    {profile.location}
                </div>

                <div className="mb-2">
                    <div className="fw-bold mb-1">Preferences:</div>
                    <div className="d-flex flex-wrap gap-2">
                        {profile.preferences.smokes && (
                            <span className="badge bg-light text-dark">Smokes</span>
                        )}
                        {profile.preferences.drinks && (
                            <span className="badge bg-light text-dark">Drinks</span>
                        )}
                        {profile.preferences.prefersPets && (
                            <span className="badge bg-light text-dark">Pet Friendly</span>
                        )}
                        <span className="badge bg-light text-dark">
                            {formatCleanliness(profile.preferences.cleanliness)}
                        </span>
                    </div>
                </div>

                <div>
                    <div className="fw-bold mb-1">Budget Range:</div>
                    <span>${profile.budget.min} - ${profile.budget.max}</span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default MiniProfile;