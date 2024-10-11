import React from 'react';
import { Card } from 'react-bootstrap';

const Trivia = () => {
  const cards = [
    { id: 1, title: "Card 1", description: "This is the description for card 1." },
    { id: 2, title: "Card 2", description: "This is the description for card 2." },
    { id: 3, title: "Card 3", description: "This is the description for card 3." },
    { id: 4, title: "Card 4", description: "This is the description for card 4." },
  ];

  return (
    <nav className="trivia-section">
      {cards.map((card) => (
        <Card key={card.id} className="mb-3 rounded-card bg-light shadow-sm">
          <Card.Header as="h1" className="card-title font-weight-bold">
            {card.title}
          </Card.Header>
          <Card.Body>
            <Card.Text>{card.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </nav>
  );
};

export default Trivia;
