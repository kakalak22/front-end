import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./client/common";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Header />} />
      </Route>
    </Routes>
  );
}

export default App;
