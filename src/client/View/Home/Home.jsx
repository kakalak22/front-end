import React, { useState, useEffect } from "react";
import { Carousel, Categories, GetMeal } from "../../components";
import CartButton from "../../components/CartButton";
import Feedback from "../../components/Feedback";
import ItemListRecipes from "../../components/ItemList/ItemListRecipes";
import ItemListIngredents from "../../components/ItemListIngredents";
import "./Home.scss";

const Home = () => {

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      // Get the current scroll position
      const scrollPosition = window.scrollY;

      // Set the height at which the button should appear
      const showAtHeight = 500;

      // Show or hide the button based on the current scroll position
      if (scrollPosition >= showAtHeight) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    // Add a scroll event listener to the window
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      {showButton && <CartButton />}
    </div>
  );
};

export default Home;
