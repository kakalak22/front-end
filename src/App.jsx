import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./client/common";
import { Home } from "./client/View";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
