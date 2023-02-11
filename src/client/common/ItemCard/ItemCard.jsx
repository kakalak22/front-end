import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ItemCard = () => {
  return (
    <Card style={{ width: '300px' }}>
      <Card.Img variant="top"
      width={270}
      height={200}
      src="https://a.cdn-hotels.com/gdcs/production0/d1513/35c1c89e-408c-4449-9abe-f109068f40c0.jpg?impolicy=fcrop&w=800&h=533&q=medium" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default ItemCard;