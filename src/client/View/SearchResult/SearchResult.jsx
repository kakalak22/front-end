import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { Badge, Button, Container, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import ItemListRecipes from '../../components/ItemList/ItemListRecipes';
import ItemListIngredents from '../../components/ItemListIngredents/ItemListIngredents';
import "./SearchResult.scss"

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query"));
  const [searchType, setSearchType] = useState("all");
  const [caloriesFrom, setCaloriesFrom] = useState(0);
  const [caloriesTo, setCaloriesTo] = useState(0);
  const [meal, setMeal] = useState("");
  const [ingredientCaloriesFrom, setIngredientCaloriesFrom] = useState(0);
  const [ingredientCaloriesTo, setIngredientCaloriesTo] = useState(0);
  const [ingredientPriceFrom, setIngredientPriceFrom] = useState(0);
  const [ingredientPriceTo, setIngredientPriceTo] = useState(0);
  const [recipesSearchResult, setRecipesSearchResult] = useState([]);
  const [ingredientsSearchResult, setIngredientsSearchResult] = useState([]);
  const [isRecipesSearchLoading, setIsRecipesSearchLoading] = useState(false);
  const [isIngredientsSearchLoading, setIsIngredientsSearchLoading] = useState(false);
  const [recipesRef, setRecipesRef] = useState([]);
  const [ingredientsRef, setIngredientsRef] = useState([]);


  const handleCaloriesFrom = (e) => {
    e?.target.value && setCaloriesFrom(Number.parseInt(e.target.value));
  }
  const handleCaloriesTo = (e) => {
    e?.target.value && setCaloriesTo(Number.parseInt(e.target.value));
  }
  const handleIngredientCaloriesFrom = (e) => {
    e?.target.value && setIngredientCaloriesFrom(Number.parseInt(e.target.value));
  }
  const handleIngredientCaloriesTo = (e) => {
    e?.target.value && setIngredientCaloriesTo(Number.parseInt(e.target.value));
  }
  const handleIngredientPriceFrom = (e) => {
    e?.target.value && setIngredientPriceFrom(Number.parseInt(e.target.value));
  }
  const handleIngredientPriceTo = (e) => {
    e?.target.value && setIngredientPriceTo(Number.parseInt(e.target.value));
  }

  const handleSelectChange = (e) => {
    setMeal(e.target.value);
  }

  const handleSearchTypSelectChange = (e) => {
    setSearchType(e.target.value);
  }

  const fetchRecipesSearchResult = async () => {
    const result = await axios.get(
      `http://localhost:8080/recipes/search?keyword=${query}&column=name`
    );
    setRecipesSearchResult(result.data);
    setRecipesRef(result.data);
    setIsRecipesSearchLoading(true);
    console.log(recipesSearchResult)
  }

  const fetchIngredientsSearchResult = async () => {
    const result = await axios.get(
      `http://localhost:8080/ingredients/search?keyword=${query}&column=name`
    );
    setIngredientsSearchResult(result.data);
    setIngredientsRef(result.data);
    setIsIngredientsSearchLoading(true);
    console.log(ingredientsSearchResult)
  }

  const formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit: values => {
      console.log(values)
      setSearchParams(`query=${values.search}`);
      setQuery(values.search);
    },
  });
  useEffect(() => {
      const newRecipes = recipesRef.filter((item) => {
        const calo = Number.parseInt(item.calories);
        const caloMatch = (caloriesFrom < caloriesTo) ?  (calo >= caloriesFrom && calo <= caloriesTo) : true;
        const mealMatch = meal==="all" ? true : meal === item.meal;
        return caloMatch && mealMatch;
      })
      // console.log(newRecipes)
      setIsRecipesSearchLoading(true);
      setRecipesSearchResult(newRecipes);
  }, [caloriesFrom, caloriesTo, meal])

  useEffect(() => {
    const newIngredients = ingredientsRef.filter((item) => {
      const calo = Number.parseInt(item.calories);
      const price = Number.parseInt(item.price);
      const caloMatch = (ingredientCaloriesFrom < ingredientCaloriesTo) ?  (calo >= ingredientCaloriesFrom && calo <= ingredientCaloriesTo) : true;
      const pirceMatch = (ingredientPriceFrom < ingredientPriceTo) ?  (price >= ingredientPriceFrom && price <= ingredientPriceTo) : true;
      return caloMatch && pirceMatch;
    })
    // console.log(newIngredients)
    setIsIngredientsSearchLoading(true);
    setIngredientsSearchResult(newIngredients);
    
  }, [ingredientCaloriesFrom, ingredientCaloriesTo,ingredientPriceFrom, ingredientPriceTo])

  useEffect(() => {
    if (searchType === "all") {
      fetchRecipesSearchResult();
      fetchIngredientsSearchResult();
    }
  }, [query])

  return (
    <div className="home-wrapper" style={{ padding: 50, minHeight: '100vh' }} >
      <Container className='search-container'>
        <Form onSubmit={formik.handleSubmit}>
          <InputGroup size='lg'>
            <div style={{ width: '150px' }}>

              <Form.Select size='lg' style={{ width: '150px' }} onChange={handleSearchTypSelectChange}>
                <option value="all">All</option>
                <option value="recipe">Recipe</option>
                <option value="ingredient">Ingredient</option>
              </Form.Select>
            </div>
            <Form.Control
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
      {(searchType === "all" || searchType === "recipe") &&

        <React.Fragment>
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
            <InputGroup>
              <InputGroup.Text>Meal</InputGroup.Text>
              <Form.Select onChange={handleSelectChange}>
                <option value="all">All</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </Form.Select>
              <Button variant='secondary' onClick={()=>{
                handleCaloriesFrom();
                handleCaloriesTo();
                setRecipesSearchResult(recipesRef);
                }}>
                Clear Filter
              </Button>
            </InputGroup>
          </Container>
          <Container>
            {
              recipesSearchResult.length > 0 ? <React.Fragment>
                <Container style={{ padding: '20px', marginBottom: '20px' }}>
                  <h3 style={{ color: '#f54748', fontWeight: 400 }}>Found {recipesSearchResult.length} recipes matched your search</h3>
                </Container>
                <ItemListRecipes recipesSearchResult={recipesSearchResult} isSearchLoading={isRecipesSearchLoading} setIsSearchLoading={setIsRecipesSearchLoading} />
              </React.Fragment> :
                <h3>No recipe matched your search</h3>
            }

          </Container>
        </React.Fragment>
      }
      {(searchType === "all" || searchType === "ingredient") &&
        <React.Fragment>
          <Container className='heading-container'>
            <h1><Badge>Ingredients</Badge></h1>
            <InputGroup>
              <InputGroup.Text>Calories</InputGroup.Text>
              <Form.Control
                type='number'
                min={0}
                placeholder='Calories from'
                onChange={handleIngredientCaloriesFrom}
                value={ingredientCaloriesFrom}
              />
              <Form.Control
                type='number'
                placeholder='Calories to'
                onChange={handleIngredientCaloriesTo}
                min={ingredientCaloriesFrom + 1 }
                value={ingredientCaloriesTo}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Price</InputGroup.Text>
              <Form.Control
                type='number'
                min={0}
                placeholder='Price from'
                onChange={handleIngredientPriceFrom}
                value={ingredientPriceFrom}
              />
              <Form.Control
                type='number'
                placeholder='Price to'
                onChange={handleIngredientPriceTo}
                min={ingredientPriceFrom + 1}
                value={ingredientPriceTo}
              />
              <Button variant='secondary' onClick={()=>{
                handleIngredientCaloriesFrom();
                handleIngredientCaloriesTo();
                handleIngredientPriceFrom();
                handleIngredientPriceTo();
                setIngredientsSearchResult(ingredientsRef);
                }}>
                Clear Filter
              </Button>
            </InputGroup>
          </Container>
          <Container>
          {
              ingredientsSearchResult.length > 0 ? <React.Fragment>
                <Container style={{ padding: '20px', marginBottom: '20px' }}>
                  <h3 style={{ color: '#f54748', fontWeight: 400 }}>Found {ingredientsSearchResult.length} ingredients matched your search</h3>
                </Container>
                <ItemListIngredents ingredientsSearchResult={ingredientsSearchResult}isSearchLoading={isIngredientsSearchLoading} setIsSearchLoading={setIsIngredientsSearchLoading} />
              </React.Fragment> :
                <h3>No ingredient matched your search</h3>
            }

          </Container>
        </React.Fragment>
      }

    </div>
  )
}

export default SearchResult