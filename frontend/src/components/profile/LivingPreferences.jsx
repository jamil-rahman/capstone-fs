import { 
    Form, 
    Row, 
    Col 
  } from 'react-bootstrap';
const LivingPreferences = ({ profile, onChange }) => (
    <Row>
        <Col md={6}>
            <Form.Group className="mb-3">
                <Form.Label>Cleanliness</Form.Label>
                <Form.Select name="cleanliness" value={profile.cleanliness} onChange={onChange}>
                    <option value="very-clean">Very Clean</option>
                    <option value="clean">Clean</option>
                    <option value="moderate">Moderate</option>
                    <option value="relaxed">Relaxed</option>
                </Form.Select>
            </Form.Group>
        </Col>
        <Col md={6}>
            <Form.Group className="mb-3">
                <Form.Label>Sleep Schedule</Form.Label>
                <Form.Select name="sleepSchedule" value={profile.sleepSchedule} onChange={onChange}>
                    <option value="early-bird">Early Bird</option>
                    <option value="night-owl">Night Owl</option>
                    <option value="flexible">Flexible</option>
                </Form.Select>
            </Form.Group>
        </Col>
    </Row>
);
export default LivingPreferences 