import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Badge, Button, Container, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import ItemListRecipes from '../../components/ItemList/ItemListRecipes';
import "./SearchResult.scss"

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [caloriesFrom, setCaloriesFrom] = useState(0);
  const [caloriesTo, setCaloriesTo] = useState(0);

  const handleCaloriesFrom = (e) =>{
    setCaloriesFrom(Number.parseInt(e.target.value));
  }
  const handleCaloriesTo = (e) =>{
    setCaloriesTo(Number.parseInt(e.target.value));
  }

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  useEffect(()=>{
    if(caloriesFrom < caloriesTo ){
      console.log("object");
    }
  },[caloriesFrom,caloriesTo])

  return (
    <div className="home-wrapper" style={{ padding: 50, minHeight: '100vh' }} >
      <Container className='search-container'>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup>
            <Form.Control
              className='password-input'
              type='text'
              placeholder='Search'
              name='search'
              value={formik.values.search}
              onChange={formik.handleChange}
            />
            <Button style={{ backgroundColor: '#f54748', borderColor: '#f54748' }} type='submit'>
              <FaSearch />
            </Button>
          </InputGroup>
        </Form>
      </Container>
      <Container className='heading-container'>
        <h1><Badge>Recipes</Badge></h1>
        <InputGroup>
          <InputGroup.Text>Calories</InputGroup.Text>
          <Form.Control
            type='number'
            min={0} 
            placeholder='Calories from'
            onChange={handleCaloriesFrom}
            value={caloriesFrom}
          />
          <Form.Control 
            type='number'
            placeholder='Calories to'
            onChange={handleCaloriesTo}
            min={caloriesFrom}
            value={caloriesTo}
          />
        </InputGroup>
      </Container>
      <Container>
        <h5>Found 3 recipes matched search query</h5>

        <ItemListRecipes />
      </Container>

      <Container className='heading-container'>
        <h1><Badge>Ingredients</Badge></h1>
        <InputGroup>
          <InputGroup.Text>Calories</InputGroup.Text>
          <Form.Control
            type='number'
            min={0} 
            placeholder='Calories from'
            onChange={handleCaloriesFrom}
            value={caloriesFrom}
          />
          <Form.Control 
            type='number'
            placeholder='Calories to'
            onChange={handleCaloriesTo}
            min={caloriesFrom}
            value={caloriesTo}
          />
        </InputGroup>
      </Container>
      <Container>
        <h5>Found 3 recipes matched search query</h5>

        <ItemListRecipes />
      </Container>

    </div>
  )
}

export default SearchResult