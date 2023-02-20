import { useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Footer, Header, OverlayNav } from "./client/common";
import ItemDetailModal from "./client/components/ItemDetailModal";
import LoginModal from "./client/components/LoginModal";
import RegisterModal from "./client/components/RegisterModal";
import { Home } from "./client/View";
import { Login } from "./client/View";
import 'react-toastify/dist/ReactToastify.css';
import RecipeDetailModal from "./client/components/RecipeDetailModal";
import CartButton from "./client/components/CartButton";
import { useEffect, useState } from "react";
import Checkout from "./client/View/Checkout/Checkout";


function App() {
  const [showButton, setShowButton] = useState(false);
  let location = useLocation();
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
      if(location?.pathname==='/checkout'){
        setShowButton(false);
      }
    }

    // Add a scroll event listener to the window
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);
  return (
    <div style={{position:'relative'}}>
      {showButton && <CartButton />}

      {<ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />}
      <RecipeDetailModal />
      <ItemDetailModal />
      <LoginModal />
      <RegisterModal />
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="checkout" element={<Checkout/>}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
