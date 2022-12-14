import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "./redux/action";

function App() {
  const { posts, loading } = useSelector((state) => ({ ...state.data }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPost());
  }, []);

  return (
    <div className="App">
      {!loading ? (
        posts.map((post) => {
          return <p key={post.id}>{post.body}</p>;
        })
      ) : (
        <h3>Loading ...</h3>
      )}
    </div>
  );
}

export default App;
