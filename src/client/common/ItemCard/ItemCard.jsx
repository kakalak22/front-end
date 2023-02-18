import { Badge, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './ItemCard.scss';
import subString from '../../../utils/subString';
import { setRecipe, toggleRecipeDetailModal } from '../../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useCart } from 'react-use-cart';

const ItemCard = ({ data, type }) => {
  const dispatch = useDispatch();
  const {addItem} = useCart();
  const handleViewMore = () =>{
    dispatch(setRecipe(data))
    dispatch(toggleRecipeDetailModal(true));

  }
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
        {data.price ? <Card.Text style={{fontWeight: 600, fontSize:'15px'}}>${data.price}</Card.Text> : null}
          <Card.Text style={{height: 150}}>
            {subString(data.description,150)}
          </Card.Text>
        </div>
        {type === "add" ?
          <Stack>
            <Button className='add-to-cart-btn' onClick={()=>addItem(data)}>Add to Cart</Button>
          </Stack> :
          <Stack >
            <Button className='add-to-cart-btn' onClick={handleViewMore}>View More</Button>
          </Stack>
        }
      </Card.Body>
    </Card>
  );
}

export default ItemCard;