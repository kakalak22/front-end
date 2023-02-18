import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
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


function App() {
  return (
    <div>
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
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
