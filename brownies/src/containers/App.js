import React, { useEffect, useState } from "react";
import "../scss/App.scss";
import axios from "../axios";
import Cards from "../components/Cards";
//import { Carousel } from 'react-bootstrap';

function App() {
  const[results, setResults] = useState('');

  useEffect(() => {
    axios.get("api/recipe").then((response) => {
    setResults(response.data);
  });
  }, []);

  return <div className="App"><Cards results={results} /></div>;
}

export default App;