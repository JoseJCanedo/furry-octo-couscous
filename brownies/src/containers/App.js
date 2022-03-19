import React, { useEffect, useState } from "react";
import "../scss/App.scss";
import axios from "../axios";

function App() {
  const[results, setResults] = useState('');

  useEffect(() => {
  axios.get("api/hello").then((response) => {
    setResults(response.data);
  });
  }, []);

  return <div className="App"><h1>{results}</h1></div>;
}

export default App;