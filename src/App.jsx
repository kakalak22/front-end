import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Footer, Header, OverlayNav } from "./client/common";
import { Home } from "./client/View";
import { Login } from "./client/View";

function App() {
  return (
    <div>
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
