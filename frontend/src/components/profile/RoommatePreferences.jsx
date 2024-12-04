import {  
    Form,  
    Row, 
    Col 
  } from 'react-bootstrap';
const RoommatePreferences = ({ profile, onChange }) => (
    <>
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Guest Comfort</Form.Label>
                    <Form.Select name="guestComfort" value={profile.guestComfort} onChange={onChange}>
                        <option value="frequently">Frequently</option>
                        <option value="occasionally">Occasionally</option>
                        <option value="rarely">Rarely</option>
                        <option value="never">Never</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Preferred Gender</Form.Label>
                    <Form.Select name="preferredGender" value={profile.preferredGender} onChange={onChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="any">Any</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Budget Range ($)</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control type="number" name="budget.min" value={profile.budget?.min} onChange={onChange} placeholder="Min" />
                        </Col>
                        <Col>
                            <Form.Control type="number" name="budget.max" value={profile.budget?.max} onChange={onChange} placeholder="Max" />
                        </Col>
                    </Row>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label>Age Range</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control type="number" name="ageRange.min" value={profile.ageRange?.min} onChange={onChange} min="18" max="100" />
                        </Col>
                        <Col>
                            <Form.Control type="number" name="ageRange.max" value={profile.ageRange?.max} onChange={onChange} min="18" max="100" />
                        </Col>
                    </Row>
                </Form.Group>
            </Col>
        </Row>
    </>
);
export default RoommatePreferences