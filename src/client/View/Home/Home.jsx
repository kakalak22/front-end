import React from "react";
import { Carousel, Categories, GetMeal } from "../../components";
import Feedback from "../../components/Feedback";
import ItemDetailModal from "../../components/ItemDetailModal";
import ItemList from "../../components/ItemList/ItemList";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <Carousel />
      <GetMeal />
      <Categories/>
      <ItemList/>
      <Feedback/>
      <ItemDetailModal/>
    </div>
  );
};

export default Home;
