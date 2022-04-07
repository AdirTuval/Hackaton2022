import "./App.css";
import React, {useState} from "react";
import Map from "./Map";
import Home from "./Home";

function App() {
  const [supermarket, setSupermarket] = React.useState();
  if (supermarket) {
    return <Map supermarket={supermarket} setSupermarket={setSupermarket}/>;
  }
  else {
    return <Home setSupermarket={setSupermarket}/>;
  }
}

export default App;
