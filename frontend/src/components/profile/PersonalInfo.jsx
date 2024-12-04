import { 
    Form,  
    Row, 
    Col 
  } from 'react-bootstrap';

const PersonalInfo = ({ profile, onChange }) => (
    <Row>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" value={profile.name} onChange={onChange} required />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Current City</Form.Label>
          <Form.Control name="currentCity" value={profile.currentCity} onChange={onChange} />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Nationality</Form.Label>
          <Form.Control name="nationality" value={profile.nationality} onChange={onChange} />
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Occupation</Form.Label>
          <Form.Control name="occupation" value={profile.occupation} onChange={onChange} />
        </Form.Group>
      </Col>
    </Row>
  );

  export default PersonalInfo