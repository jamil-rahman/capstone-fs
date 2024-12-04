import React, { useState } from 'react';
import { 
  Container, 
  Form, 
  Button, 
  Card, 
  Alert, 
  Row, 
  Col 
} from 'react-bootstrap';
import { Brain } from 'lucide-react';
import { analyzeCity } from '../services/insightService';

const Insights = () => {
  const [formData, setFormData] = useState({
    city: '',
    province: '',
    specialConditions: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await analyzeCity(formData);
      setInsights(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to analyze city insights');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container className="py-4">
      <Card className="mb-4">
        <Card.Header>
          <h4 className="mb-0">City Insights Analysis</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter city name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter province"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Special Conditions</Form.Label>
              <Form.Control
                as="textarea"
                name="specialConditions"
                value={formData.specialConditions}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter any special conditions or requirements..."
              />
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="d-flex align-items-center justify-content-center gap-2"
              >
                {loading ? (
                  <>
                    <Brain className="animate-spin" size={20} />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  'Analyze City'
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {insights && (
        <div className="insights-results">
          {Object.entries(insights.insights.sections).map(([key, section]) => (
            <Card key={key} className="mb-4">
              <Card.Header>
                <h5 className="mb-0">{section.title}</h5>
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled mb-0">
                  {section.content.map((item, index) => (
                    <li key={index} className="mb-2">
                      {item.replace(/^- /, '')}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Insights;