import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ItemCard.scss';
import subString from '../../../utils/subString';

const ItemCard = ({ data, type }) => {
  return (
    <Card style={{ width: '300px' }} border="light" className='card-wrapper'>
      <Card.Img variant="top"
        width={270}
        height={200}
        src={data.image} />
      <Card.Body
      >
        <Card.Title style={{height: 50}}>{data.name}</Card.Title>
        <div>
          <Card.Text style={{height: 150}}>
            {subString(data.description,150)}
          </Card.Text>
        </div>
        {type === "add" ?
          <Stack >
            <Button className='add-to-cart-btn'>Add to Cart</Button>
          </Stack> :
          <Stack >
            <Button className='add-to-cart-btn'>View More</Button>
          </Stack>
        }
      </Card.Body>
    </Card>
  );
}

export default ItemCard;