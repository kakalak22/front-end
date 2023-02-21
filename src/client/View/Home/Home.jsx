import axios from "axios";
import React, { useState, useEffect } from "react";
import { Carousel, Categories, GetMeal } from "../../components";
import CartButton from "../../components/CartButton";
import Feedback from "../../components/Feedback";
import ItemListRecipes from "../../components/ItemList/ItemListRecipes";
import ItemListIngredents from "../../components/ItemListIngredents";
import "./Home.scss";

const Home = () => {
  const [recipeArr, setRecipeArr] = useState([]);
  const [ingredientArr, setIngredientArr] = useState([]);
  // const test = JSON.parse(localStorage.getItem("test"));
  // console.log(test);
  // const recipe = { name: test.food_name, image: `https://images.eatthismuch.com/${test.images[0].image}`, description: test.description, calories: test.calories }
  // const ingredients = test.ingredients.map(({ food }) => {
  //   const obj = { name: food.food_name, image: `https://images.eatthismuch.com/${food.images[0].image}`, calories: food.calories, description: food.description, price: 5 }
  //   return obj;
  // }
  // )
  // console.log("-recipe-")
  // console.log(recipe)
  // console.log("---ingredient---")
  // console.log(ingredients)
  // // const header = {
  //   'Access-Control-Allow-Origin': '*'
  // }
  const loadRecipes = async (index) => {
    const result = await axios.get(`http://www.whateverorigin.org/get?url=https://www.eatthismuch.com/api/v1/recipe/${907030 + index}/`);
    const test = JSON.parse(result.data.contents);
    console.log(test)
    // const recipe = { name: test.food_name, image: `https://images.eatthismuch.com/${test.images[0].image}`, description: test.description, calories: test.calories }
    // const ingredients = test.ingredients.map(({ food }) => {
    //   const obj = { recipeName: test.food_name, name: food.food_name, image: `https://images.eatthismuch.com/${food.images[0].image}`, calories: food.calories, description: food.description, price: 5 }
    //   return obj;
    // }
    // )
    // setRecipeArr(prev => [...prev, recipe]);
    // setIngredientArr(prev=> [...prev, ingredients]);
    // console.log("--recipe--");
    // console.log(recipeArr);
  };
  useEffect(() => {
    const arrr = Array.from(Array(1).keys());
    arrr.forEach((value, index)=> {loadRecipes(value)})
    localStorage.setItem("recipe", JSON.stringify(recipeArr))
    localStorage.setItem("ingredient", JSON.stringify(ingredientArr))
  }, [])
  return (
    <div className="home-wrapper">
      <Carousel />
      <div className="title-wrapper">
        <h2>Today's Meal Plan</h2>
      </div>
      <GetMeal />
      <div className="title-wrapper">
        <h2>Recipes</h2>
      </div>
      <ItemListRecipes />
      <div className="title-wrapper">
        <h2>Ingredient</h2>
      </div>
      <ItemListIngredents />
      <Feedback />
    </div>
  );
};

export default Home;
