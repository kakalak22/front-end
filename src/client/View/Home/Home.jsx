import React from "react";
import { Carousel, GetMeal } from "../../components";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Carousel />
      <GetMeal />
    </div>
  );
};

export default Home;
