//src/components/RightNavbar.jsx
import React, { useState, useEffect } from 'react';
import { Offcanvas, Button, Spinner } from 'react-bootstrap';
import { RefreshCw } from 'lucide-react';
import Trivia from './Trivia';
import { getAuth } from 'firebase/auth';

const RightNavbar = ({ show, onHide }) => {
  const [triviaItems, setTriviaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();

  const fetchTrivia = async () => {
    try {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      const token = await user.getIdToken();

      const response = await fetch('http://localhost:5000/api/trivia/random', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        if (response.status === 404) {
          throw new Error('No trivia available at the moment.');
        }
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to fetch trivia');
      }

      if (!Array.isArray(result.data)) {
        throw new Error('Invalid data format received from server');
      }

      setTriviaItems(result.data);
      setError(null);
    } catch (err) {
      console.error('Error details:', err);
      if (err.message === 'User not authenticated') {
        setError('Please log in to view trivia');
      } else {
        setError(err.message || 'Failed to load trivia');
      }
      setTriviaItems([]); // Clear items on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchTrivia();
      } else {
        setError('Please log in to view trivia');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      responsive="md"
      style={{
        marginTop: 'var(--navbar-height)',
        height: 'calc(100vh - var(--navbar-height))',
        width: '100%',
       // maxWidth: '350px' // Control maximum width
      }}
    >
      <Offcanvas.Header closeButton className="d-md-none">
        <Offcanvas.Title>More Info</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body
        className="bg-white shadow-sm p-3"
        style={{
          overflowY: 'auto',
          height: '100%'
        }}
      >
        <div className="mb-4">
          <h3 className="h4 mb-4">Did You Know?</h3>

          {loading ? (
            <div className="text-center p-4">
              <Spinner
                animation="border"
                variant="primary"
                className="mb-2"
              />
              <p className="text-muted">Loading fun facts...</p>
            </div>
          ) : error ? (
            <div className="text-center p-4">
              <div className="text-danger mb-3">{error}</div>
              {auth.currentUser && (
                <Button
                  variant="primary"
                  onClick={fetchTrivia}
                >
                  Try Again
                </Button>
              )}
            </div>
          ) : (
            <>
              {triviaItems.length > 0 ? (
                <div className="d-flex flex-column gap-4">
                  {triviaItems.map((trivia, index) => (
                    <Trivia key={index} trivia={trivia} />
                  ))}

                  {/* Retry button at the bottom */}
                  <div className="d-flex justify-content-center py-3">
                    <Button
                      variant="outline-primary"
                      onClick={fetchTrivia}
                      disabled={loading}
                      className="d-flex align-items-center gap-2"
                    >
                      <RefreshCw
                        size={16}
                        className={loading ? 'rotate' : ''}
                        style={{
                          transition: 'transform 0.3s ease',
                        }}
                      />
                      <span>Load More Facts</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-4 text-muted">
                  No trivia available at the moment
                </div>
              )}
            </>
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default RightNavbar;