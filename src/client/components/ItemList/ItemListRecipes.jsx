import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container, Spinner, Stack } from 'react-bootstrap'
import { ItemCard } from '../../common'
import './ItemList.scss';

const ItemListRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItemNum, setCurrentItemNum] = useState(3);

  const loadRecipes = async () => {
    const result = await axios.get("http://localhost:8080/recipes/");
    setRecipes(result.data.slice(0, currentItemNum));
    setIsLoading(false)
  };

  useEffect(() => {
    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      loadRecipes()
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [currentItemNum])

  if (recipes.length < 1)
    return <Container style={{display:'flex', justifyContent: 'center', padding: '50px'}}>
      <Spinner animation="border" role="status" style={{ width: 50, height: 50, color:"#f54748" }} />
    </Container>

  return (
    <Container>
      <Stack direction='horizontal' className='item-list-wrapper' gap={5}>
        {recipes.map((recipe) => {
          return <ItemCard key={recipe.id} type="view" data={recipe} />
        })}
      </Stack>
      <Container className='load-more-wrapper'>
        <Stack>

          <Button className='load-more-btn' onClick={() => setCurrentItemNum(prevState => prevState + 3)}>
          {isLoading && <Spinner animation="border" role="status" style={{ width: 20, height: 20 }} />}Load More
          </Button>
        </Stack>
      </Container>
    </Container>
  )
}

export default ItemListRecipes