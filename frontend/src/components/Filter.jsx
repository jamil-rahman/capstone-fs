import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
// import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    budgetRange: { min: 0, max: 0 },
    preferredGender: '',
    ageRange: { min: 18, max: 100 },
    cleanliness: '',
    dietaryRestrictions: '',
    smokes: false,
    drinks: false,
    prefersPets: false,
  });

  useEffect(() => {
    // Fetch posts from the backend API based on the applied filters
    // axios.get('/api/posts', { params: filters })
    //   .then(response => {
    //     setPosts(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching posts:', error);
    //   });
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Apply the filters and fetch the updated posts
    // You can make an API call here with the updated filters
    console.log('Filters applied:', filters);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Home</h1>
      <div className="filters-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              as="select"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
            >
              <option value="">All Cities</option>
              {/* Add city options */}
            </Form.Control>
          </Form.Group>


          <Form.Group controlId="preferredGender">
            <Form.Label>Roommate Gender</Form.Label>
            <Form.Control
              as="select"
              name="preferredGender"
              value={filters.preferredGender}
              onChange={handleFilterChange}
            >
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>

          {/* Add more filter form fields */}

          <Button variant="primary" type="submit">
            Apply Filters
          </Button>
        </Form>
      </div>
      <div className="posts-container">
        {/* Render the posts */}
        {posts.map(post => (
          <Card key={post.id} className="post-card">
            {/* Render the post details */}
            {/* ... */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;