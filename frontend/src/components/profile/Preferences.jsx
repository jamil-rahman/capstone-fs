import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';

const DIETARY_OPTIONS = [
  { value: 'None', label: 'None' },
  { value: 'Halal', label: 'Halal' },
  { value: 'Kosher', label: 'Kosher' },
  { value: 'Vegetarian', label: 'Vegetarian' },
  { value: 'Vegan', label: 'Vegan' },
  { value: 'Pescatarian', label: 'Pescatarian' },
  { value: 'Gluten-Free', label: 'Gluten-Free' },
  { value: 'Dairy-Free', label: 'Dairy-Free' },
  { value: 'Nut-Free', label: 'Nut-Free' },
  { value: 'Shellfish-Free', label: 'Shellfish-Free' },
  { value: 'Low-Carb', label: 'Low-Carb' },
  { value: 'Keto', label: 'Keto' },
  { value: 'Paleo', label: 'Paleo' }
];

const Preferences = ({ profile, onChange }) => (
  <Row>
    <Col md={6}>
      <Form.Group className="mb-3">
        <Form.Label>Dietary Restrictions</Form.Label>
        <Select
          isMulti
          name="dietaryRestrictions"
          options={DIETARY_OPTIONS}
          value={DIETARY_OPTIONS.filter(option => 
            profile.dietaryRestrictions?.includes(option.value)
          )}
          onChange={(selectedOptions) => {
            onChange({
              target: {
                name: 'dietaryRestrictions',
                value: selectedOptions.map(option => option.value)
              }
            });
          }}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group className="mb-3">
        <Form.Check 
          type="switch" 
          id="smokes" 
          label="Smokes" 
          name="smokes" 
          checked={profile.smokes} 
          onChange={e => onChange({ target: { name: 'smokes', value: e.target.checked }})} 
        />
        <Form.Check 
          type="switch" 
          id="drinks" 
          label="Drinks" 
          name="drinks" 
          checked={profile.drinks} 
          onChange={e => onChange({ target: { name: 'drinks', value: e.target.checked }})} 
        />
        <Form.Check 
          type="switch" 
          id="prefersPets" 
          label="Prefers Pets" 
          name="prefersPets" 
          checked={profile.prefersPets} 
          onChange={e => onChange({ target: { name: 'prefersPets', value: e.target.checked }})} 
        />
      </Form.Group>
    </Col>
  </Row>
);

export default Preferences;