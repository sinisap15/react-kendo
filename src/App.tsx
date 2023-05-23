import React from "react";
import kendoka from "./kendoka.svg";
import "./App.scss";
import ProductsGrid from "./components/Grid";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={kendoka} className="App-logo" alt="kendoka" />
        <h1>Welcome to Kendo React!</h1>
      </header>
      <div className="gridContainer">
        <ProductsGrid />
      </div>
    </div>
  );
}

export default App;
