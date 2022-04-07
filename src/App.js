import "./App.css";
<<<<<<< HEAD
import React, {useState} from "react";
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'; 
import SuperMap from "./Map";
import Home from "./Home";
import NavBar from "./components/NavBar";
import MapTest from "./MapTest";

const theme = createTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: '2rem',
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
    },
  },
});

const styles = makeStyles({
})


=======
import { CalculatePath } from "./Backend/PathFinder/PathFinder";
>>>>>>> 647ef9e (general skeleton of backend)

function App() {
  const [supermarket, setSupermarket] = React.useState();
  const [useMapPage, setUseMapPage] = React.useState(false);

  return (
    <div className="App">
<<<<<<< HEAD
      <ThemeProvider theme={theme}>

        <NavBar supermarket={supermarket} setSupermarket={setSupermarket}/>
      {supermarket && <MapTest supermarket={supermarket} setSupermarket={setSupermarket}/>}
      {!supermarket && <Home setSupermarket={setSupermarket}/>}
      </ThemeProvider>
=======
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>{CalculatePath([4, 6])}</h3>
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
>>>>>>> 647ef9e (general skeleton of backend)
    </div>
  )
}

export default App;
