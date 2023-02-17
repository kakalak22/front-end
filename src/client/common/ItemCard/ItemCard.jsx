import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ItemCard.scss';
import subString from '../../../utils/subString';

const ItemCard = ({ data, type }) => {
  console.log(subString(data.description))
  // console.log("data",data)
  return (
    <Card style={{ width: '300px' }} border="light" >
      <Card.Img variant="top"
        width={270}
        height={200}
        src={data.image} />
      <Card.Body
      >
        <Card.Title style={{height: 50}}>{data.name}</Card.Title>
        <div>
          <Card.Text style={{height: 200}}>
            {subString(data.description,250)}
          </Card.Text>
        </div>
        {type === "add" ?
          <Stack >
            <Button className='add-to-cart-btn'>Add to Cart</Button>
          </Stack> :
          <Stack >
            <Button className='add-to-cart-btn'>View</Button>
          </Stack>
        }
      </Card.Body>
    </Card>
  );
}

export default ItemCard;