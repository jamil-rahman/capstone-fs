import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Badge } from 'react-bootstrap';
import { MapPin, Briefcase, Coffee, Cigarette, Wine, Dog, Clock, Users } from 'lucide-react';
import api from '../utils/axiosConfig';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.firebaseUid) {
          throw new Error('User not found');
        }

        const response = await api.get(`/users/profile/${user.firebaseUid}`);
        setProfile(response.data.user);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-5 text-danger">
        <h3>Error loading profile</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center p-5">
        <h3>Profile not found</h3>
      </div>
    );
  }

  return (
    <Container className="py-5">
      {/* Basic Info Card */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={3} className="text-center">
              <Image
                src={profile.photo || '/api/placeholder/150/150'}
                roundedCircle
                className="mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </Col>
            <Col md={9}>
              <h2 className="mb-3">{profile.name}</h2>
              <div className="d-flex flex-wrap gap-3">
                {profile.currentCity && (
                  <div className="d-flex align-items-center">
                    <MapPin className="me-2" size={20} />
                    <span>{profile.currentCity}</span>
                  </div>
                )}
                {profile.occupation && (
                  <div className="d-flex align-items-center">
                    <Briefcase className="me-2" size={20} />
                    <span>{profile.occupation}</span>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Preferences Grid */}
      <Row className="g-4">
        {/* Lifestyle Preferences */}
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Lifestyle</h4>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center">
                  <Coffee className="me-3" size={20} />
                  <span>Drinks: {profile.drinks ? 'Yes' : 'No'}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Cigarette className="me-3" size={20} />
                  <span>Smokes: {profile.smokes ? 'Yes' : 'No'}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Dog className="me-3" size={20} />
                  <span>Pets: {profile.prefersPets ? 'Yes' : 'No'}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Clock className="me-3" size={20} />
                  <span>Sleep Schedule: {profile.sleepSchedule}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Users className="me-3" size={20} />
                  <span>Guest Comfort: {profile.guestComfort}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Preferences & Requirements */}
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Preferences & Requirements</h4>

              <div className="mb-4">
                <h6 className="text-muted mb-3">Dietary Restrictions</h6>
                <div className="d-flex flex-wrap gap-2">
                  {profile.dietaryRestrictions?.length > 0 ? (
                    profile.dietaryRestrictions.map((diet, index) => (
                      <Badge key={index} bg="secondary" className="py-2 px-3">
                        {diet}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted">No dietary restrictions</span>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h6 className="text-muted mb-2">Cleanliness Level</h6>
                <p>{profile.cleanliness}</p>
              </div>

              <div className="mb-4">
                <h6 className="text-muted mb-2">Budget Range</h6>
                <p>${profile.budget.min} - ${profile.budget.max} per month</p>
              </div>

              <div>
                <h6 className="text-muted mb-2">Age Preference</h6>
                <p>{profile.ageRange.min} - {profile.ageRange.max} years old</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;