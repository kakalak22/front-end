import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Spinner, Stack } from 'react-bootstrap'
import { ItemCard } from '../../common'
import '../ItemList/ItemList.scss';

const ItemListIngredents = () => {
  const [ingredents, setIngredents] = useState([]);
  const [length, setLength] = useState();
  const [currentItemNum, setCurrentItemNum] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const loadIngredents = async () => {
    const result = await axios.get("http://localhost:8080/ingredients/");
    setIngredents(result.data.slice(0, currentItemNum));
    setIsLoading(false);
    setLength(result.data.length);

  };

  useEffect(() => {
    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      loadIngredents()
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [currentItemNum])

  if (ingredents.length < 1)
    return (
      <Container style={{ display: 'flex', justifyContent: 'center',padding: '50px' }}>
        <Spinner animation="border" role="status" style={{ width: 50, height: 50, color: "#f54748" }} />
      </Container>
      )


  return (
    <Container>
      <Stack direction='horizontal' className='item-list-wrapper' gap={5}>
        {ingredents.map((ingredent) => {
          return <ItemCard key={ingredent.id} type="add" data={ingredent} />
        })}
      </Stack>
      <Container className='load-more-wrapper'>
        <Stack>

        {
            length !== ingredents.length &&
            <Button className='load-more-btn'
              onClick={() => setCurrentItemNum(prevState => prevState + 3)}
            >
              {isLoading && <Spinner
                animation="border"
                role="status"
                style={{ width: 20, height: 20 }} />}
              Load More
            </Button>
          }
        </Stack>
      </Container>
    </Container>
  )
}

export default ItemListIngredents