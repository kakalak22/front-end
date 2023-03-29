import axios from "axios";
import React, { useState, useEffect } from "react";
import { Carousel, Categories, GetMeal } from "../../components";
import CartButton from "../../components/CartButton";
import Feedback from "../../components/Feedback";
import ItemListRecipes from "../../components/ItemList/ItemListRecipes";
import ItemListIngredents from "../../components/ItemListIngredents";
import SearchButton from "../../components/SearchButton/SearchButton";
import "./Home.scss";

const Home = () => {
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
