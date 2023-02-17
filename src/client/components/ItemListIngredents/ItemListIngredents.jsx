import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import { ItemCard } from '../../common'
import '../ItemList/ItemList.scss';

const ItemListIngredents = () => {
  const [ingredents, setIngredents] = useState([]);

  const loadIngredents = async () => {
    const result = await axios.get("http://localhost:8080/ingredients/");
    setIngredents(result.data.slice(0, 6));
  };

  useEffect(()=>{
    loadIngredents()
  },[])

  return (
    <Container>
      <Stack direction='horizontal' className='item-list-wrapper' gap={5}>
        {ingredents.map((ingredent) => {
          return <ItemCard key={ingredent.id} type="add" data={ingredent} />
        })}
      </Stack>
      <Container className='load-more-wrapper'>
        <Stack>

          <Button className='load-more-btn'>
            Load More
          </Button>
        </Stack>
      </Container>
    </Container>
  )
}

export default ItemListIngredents