import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Stack } from 'react-bootstrap'
import { ItemCard } from '../../common'
import './ItemList.scss';

const ItemListRecipes = () => {
  const dummyData = [1, 2, 3, 4, 5, 6]
  const [recipes, setRecipes] = useState([]);

  const loadRecipes = async () => {
    const result = await axios.get("http://localhost:8080/recipes/");
    setRecipes(result.data.slice(0, 6));
  };

  useEffect(()=>{
    loadRecipes()
  },[])

  return (
    <Container>
      <Stack direction='horizontal' className='item-list-wrapper' gap={5}>
        {recipes.map((recipe) => {
          return <ItemCard key={recipe.id} type="view" data={recipe} />
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

export default ItemListRecipes