import React, {useState, useEffect} from "react";
import { Carousel, Categories, GetMeal } from "../../components";
import CartButton from "../../components/CartButton";
import Feedback from "../../components/Feedback";
import ItemList from "../../components/ItemList/ItemList";
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
      <GetMeal />
      <Categories/>
      <ItemList/>
      <Feedback/>
      {showButton && <CartButton/>}
    </div>
  );
};

export default Home;
