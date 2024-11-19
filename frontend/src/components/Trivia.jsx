// components/Trivia.jsx
import { Card, Stack } from 'react-bootstrap';

const Trivia = () => {
  const cards = [
    { id: 1, title: "Card 1", description: "This is the description for card 1." },
    { id: 2, title: "Card 2", description: "This is the description for card 2." },
    { id: 3, title: "Card 3", description: "This is the description for card 3." },
    { id: 4, title: "Card 4", description: "This is the description for card 4 mobile." },
  ];

  return (
    <Stack gap={3} className='border border-3 border-danger'>
      {cards.map((card) => (
        <Card 
          key={card.id} 
          className="bg-white border-0 shadow-sm"
        >
          <Card.Header 
            className="bg-white border-bottom py-3"
          >
            <h5 className="mb-0">{card.title}</h5>
          </Card.Header>
          <Card.Body>
            <Card.Text>{card.description}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Stack>
  );
};

export default Trivia;