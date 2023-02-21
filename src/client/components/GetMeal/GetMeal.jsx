import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Form, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { image1 } from "../../../assets";
import { setRecipe, toggleRecipeDetailModal } from "../../../redux/action";
import subString from "../../../utils/subString";
import "./GetMeal.scss";

const GetMeal = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchMenu = async (calories, meal) => {
    const result = await axios.get(`http://localhost:8080/menu/?calories=${calories}&meal=${meal}`);
    setMenu(result.data);

  }

  const formik = useFormik({
    initialValues: {
      calories: '',
      meal: '',
    },
    onSubmit: values => {
      setIsLoading(true)
      fetchMenu(values.calories, values.meal);
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [isLoading])

  const handleViewRecipe = (data) => {
    dispatch(setRecipe(data))
    dispatch(toggleRecipeDetailModal(true));

  }
  return (
    <Container className="get-meal-wrapper">
      <Form onSubmit={formik.handleSubmit}>
        <Container className="form-get-meal-wrapper">
          <Form.Control
            style={{ width: '40%' }}
            min={1000}
            max={5000}
            type='number'
            placeholder='Input calories from 1000 to 5000'
            name='calories'
            value={formik.values.phone}
            onChange={formik.handleChange}
            required
          />
          <Form.Select
            value={formik.values.meal}
            onChange={formik.handleChange}
            aria-label="Default select example"
            style={{ width: '40%' }}
            name="meal"
            required
          >
            <option>Select number of meal</option>
            <option value={1}>1 Meal</option>
            <option value={2}>2 Meals</option>
            <option value={3}>3 Meals</option>
            <option value={4}>4 Meals</option>
          </Form.Select>
          <Button className="btn-login" variant="primary" type="submit">
            Get Suggested Meal
          </Button>
        </Container>
      </Form>
      {isLoading && <Container style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spinner animation="border" role="status" style={{ width: 50, height: 50, color: "#f54748" }} />
      </Container>}
      {!isLoading && <Container>
        {menu.map((recipe, index) =>
          <Container key={index} style={{textAlign:'start', padding:' 0 50px'}}>
            {index === 0 && <h2 style={{marginBottom:'20px'}}><Badge bg="success">Breakfast</Badge></h2>}
            {index === 1 && <h2 style={{marginBottom:'20px'}}><Badge bg="success">Lunch</Badge></h2>}
            {index === 2 && <h2 style={{marginBottom:'20px'}}><Badge bg="success">Dinner</Badge></h2>}
            {index === 3 && <h2 style={{marginBottom:'20px'}}><Badge bg="success">Snack</Badge></h2>}
            <Container  className="item-recipe" >
              <img src={recipe.image} alt="" width={150} height={150} />
              <Container className="item-recipe__info" >
                <h3 onClick={() => handleViewRecipe(recipe)} >{recipe.name}</h3>
                <p>Calories: <span>{recipe.calories}</span></p>
                <p>{subString(recipe.tutorial, 250)}</p>
              </Container>
            </Container>
          </Container>
        )}
      </Container>}
    </Container>
  )
};

export default GetMeal;
