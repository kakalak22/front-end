import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Header, OverlayNav } from "./client/common";
import { Home } from "./client/View";

function App() {
  return (
    <div>
      <Header />
      <OverlayNav />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
