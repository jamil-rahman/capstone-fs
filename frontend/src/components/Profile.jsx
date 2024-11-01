import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
// import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: '',
    currentCity: '',
    nationality: '',
    occupation: '',
    dietaryRestrictions: [],
    smokes: false,
    drinks: false,
    prefersPets: false,
    cleanliness: 'moderate',
    sleepSchedule: 'flexible',
    guestComfort: 'occasionally',
    budget: { min: 0, max: 0 },
    preferredGender: 'any',
    ageRange: { min: 18, max: 100 }
});

  useEffect(() => {
    // Fetch user data from the backend API
    // axios.get('/api/user')
    //   .then(response => {
    //     setUser(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching user data:', error);
    //   });
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUser(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send updated user data to the backend API
    // axios.put('/api/user', user)
    //   .then(response => {
    //     console.log('User data updated successfully');
    //   })
    //   .catch(error => {
    //     console.error('Error updating user data:', error);
    //   });
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Personal Info</h1>
      <Form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-field">
          <Form.Label>Full Name</Form.Label>
          <div className="profile-input-wrapper">
            <Form.Control
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="profile-name-input"
            />
          </div>
        </div>
        <hr className="profile-divider" />
            
            <div className="profile-field">
              <Form.Label>Email address</Form.Label>
              <div className="profile-input-wrapper">
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <hr className="profile-divider" />

            <div className="profile-field">
              <Form.Label>Current City</Form.Label>
              <div className="profile-input-wrapper">
                <Form.Control
                  type="text"
                  name="currentCity"
                  value={user.currentCity}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr className="profile-divider" />

            <div className="profile-field">
              <Form.Label>Nationality</Form.Label>
              <div className="profile-input-wrapper">
                <Form.Control
                  type="text"
                  name="nationality"
                  value={user.nationality}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr className="profile-divider" />

            <div className="profile-field">
              <Form.Label>Occupation</Form.Label>
              <div className="profile-input-wrapper">
                <Form.Control
                  type="text"
                  name="occupation"
                  value={user.occupation}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr className="profile-divider" />

            <div className="profile-field">
              <Form.Label>Dietary Restrictions</Form.Label>
              <div className="profile-input-wrapper">
                <Form.Control
                  as="select"
                  name="dietaryRestrictions"
                  value={user.dietaryRestrictions}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">Non-Vegetarian</option>
                </Form.Control>
              </div>
            </div>

            <hr className="profile-divider" />

            <div className="profile-field chckbx">
              <Form.Check
                type="checkbox"
                name="smokes"
                label="Smoke"
                checked={user.smokes}
                onChange={handleChange}
              />
            
              <Form.Check
                type="checkbox"
                name="drinks"
                label="Drink"
                checked={user.drinks}
                onChange={handleChange}
              />
            
              <Form.Check
                type="checkbox"
                name="prefersPets"
                label="Prefers Pets"
                checked={user.prefersPets}
                onChange={handleChange}
              />
            </div>

            <hr className="profile-divider" />

            <div className="profile-field">
              <Form.Label>Cleanliness</Form.Label>
              <div className="profile-input-wrapper">
                <Form.Control
                  as="select"
                  name="cleanliness"
                  value={user.cleanliness}
                  onChange={handleChange}
                >
                  <option value="very-clean">Very Clean</option>
                  <option value="clean">Clean</option>
                  <option value="moderate">Moderate</option>
                  <option value="relaxed">Relaxed</option>
                </Form.Control>
              </div>
            </div>

            <hr className="profile-divider" />

            <div className="profile-field">
              <Form.Label>Sleep Schedule</Form.Label>
              <div className="profile-input-wrapper">
                <Form.Control
                  as="select"
                  name="sleepSchedule"
                  value={user.sleepSchedule}
                  onChange={handleChange}
                >
                  <option value="early-bird">Early Bird</option>
                  <option value="night-owl">Night Owl</option>
                  <option value="flexible">Flexible</option>
                </Form.Control>
              </div>
            </div>

            <hr className="profile-divider" />

            <div className="profile-field">
              <Form.Label>Guest Comfort</Form.Label>
              <div className="profile-input-wrapper">
                <Form.Control
                  as="select"
                  name="guestComfort"
                  value={user.guestComfort}
                  onChange={handleChange}
                >
                  <option value="frequently">Frequently</option>
                  <option value="occasionally">Occasionally</option>
                  <option value="rarely">Rarely</option>
                  <option value="never">Never</option>
                </Form.Control>
              </div>
            </div>
            <hr className="profile-divider" />

            <div className="profile-field">
              <Form.Label>Budget Range</Form.Label>
              <div className="profile-input-wrapper">
                <div className="profile-budget-range">
                  <Form.Control
                    type="number"
                    name="budget.min"
                    placeholder="Minimum"
                    value={user.budget.min}
                    onChange={handleChange}
                  />
                  <span className="profile-budget-separator">-</span>
                  <Form.Control
                    type="number"
                    name="budget.max"
                    placeholder="Maximum"
                    value={user.budget.max}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <hr className="profile-divider" />

            <div className="profile-field">
              <Form.Label>Preferred Roommate Gender</Form.Label>
              <div className="profile-input-wrapper">
                <Form.Control
                  as="select"
                  name="preferredGender"
                  value={user.preferredGender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="any">Any</option>
                </Form.Control>
              </div>
            </div>
            <hr className="profile-divider" />

            <div className="profile-field">
              <Form.Label>Preferred Age Range</Form.Label>
              <div className="profile-input-wrapper">
                <div className="profile-age-range">
                  <Form.Control
                    type="number"
                    name="ageRange.min"
                    placeholder="Minimum Age"
                    value={user.ageRange.min}
                    onChange={handleChange}
                  />
                  <span className="profile-age-separator">-</span>
                  <Form.Control
                    type="number"
                    name="ageRange.max"
                    placeholder="Maximum Age"
                    value={user.ageRange.max}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <Button variant="primary" type="submit" className="profile-save-btn">
              Save Changes
            </Button>
          </Form>
    </div>
  );
};

export default Profile;