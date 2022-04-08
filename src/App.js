import "./App.css";
import React, { useState } from "react";
import { CalculatePath } from "./Backend/PathFinder/PathFinder";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h3>{CalculatePath([548, 57, 539])}</h3>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
