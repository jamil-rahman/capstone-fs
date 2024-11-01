import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Insight = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the selected city to the AI and fetch the insights
    // You can make an API call or integrate with the AI service here
    console.log('Selected City:', selectedCity);
  };

  return (
    <div className="insight-container">
      <h1 className="insight-title">City Insight</h1>
      <Form onSubmit={handleSubmit}>
        <div className="insight-field">
          <Form.Label>Select City</Form.Label>
          <div className="insight-input-wrapper">
            <Form.Control
              as="select"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Select a city</option>
              <option value="Brantford">Brantford</option>
              <option value="Toronto">Toronto</option>
              <option value="Ottawa">Ottawa</option>
              <option value="Hamilton">Hamilton</option>
              <option value="London">London</option>
              {/* Add more city options */}
            </Form.Control>
          </div>
          <Button variant="primary" type="submit" className="insight-submit-btn">
              Submit
            </Button>
        </div>
      </Form>
      {/* Display the AI-generated insights here */}
    </div>
  );
};

export default Insight;