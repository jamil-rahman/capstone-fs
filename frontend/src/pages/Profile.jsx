// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import ProfileForm from '../components/profile/ProfileForm';
import { getUserProfile, updateProfile } from '../services/profileService';

const Profile = () => {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [profile, setProfile] = useState({
    name: '',
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
    preferredGender: 'any',
    budget: { min: 0, max: 0 },
    ageRange: { min: 18, max: 100 }
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) throw new Error('Not authenticated');

        const { user } = await getUserProfile(userId);
        setProfile(user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const { user } = await updateProfile(profile);
      setProfile(user);
      setSuccessMessage('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for dietary restrictions
    if (name === 'dietaryRestrictions') {
      setProfile(prev => ({
        ...prev,
        [name]: value // value will already be an array of strings from the Select component
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: Number(value) }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };


  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <Container className="py-4">
      <ProfileForm
        profile={profile}
        onSubmit={handleSubmit}
        onChange={handleInputChange}
        loading={saveLoading}
        error={error}
        successMessage={successMessage}
      />
    </Container>
  );
};

export default Profile;