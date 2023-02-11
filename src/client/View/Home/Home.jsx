import React from "react";
import { Carousel, Categories, GetMeal } from "../../components";
import ItemList from "../../components/ItemList/ItemList";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Carousel />
      <GetMeal />
      <Categories/>
      <ItemList/>
    </div>
  );
};

export default Home;
