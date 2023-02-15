import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer, Header, OverlayNav } from "./client/common";
import ItemDetailModal from "./client/components/ItemDetailModal";
import LoginModal from "./client/components/LoginModal";
import RegisterModal from "./client/components/RegisterModal";
import { Home } from "./client/View";
import { Login } from "./client/View";

function App() {
  return (
    <div>
      <ItemDetailModal/>
      <LoginModal/>
      <RegisterModal/>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
