import React from 'react';
import { Form, Card, Alert, Button } from 'react-bootstrap';
import PersonalInfo from './PersonalInfo';
import Preferences from './Preferences';
import LivingPreferences from './LivingPreferences';
import RoommatePreferences from './RoommatePreferences';


const ProfileForm = ({ profile, onSubmit, onChange, loading, error, successMessage }) => (
    <Card>
        <Card.Header>
            <h4 className="mb-0">Profile Settings</h4>
        </Card.Header>
        <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Form onSubmit={onSubmit}>
                <PersonalInfo profile={profile} onChange={onChange} />
                <Preferences profile={profile} onChange={onChange} />
                <LivingPreferences profile={profile} onChange={onChange} />
                <RoommatePreferences profile={profile} onChange={onChange} />

                <div className="d-grid col-2 mx-auto mt-4">
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </Form>
        </Card.Body>
    </Card>
);

export default ProfileForm