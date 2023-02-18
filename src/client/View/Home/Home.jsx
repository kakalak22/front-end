import React, { useState, useEffect } from "react";
import { Carousel, Categories, GetMeal } from "../../components";
import CartButton from "../../components/CartButton";
import Feedback from "../../components/Feedback";
import ItemListRecipes from "../../components/ItemList/ItemListRecipes";
import ItemListIngredents from "../../components/ItemListIngredents";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Carousel />
      {/* <GetMeal /> */}
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
