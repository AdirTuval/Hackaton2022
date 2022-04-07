import "./App.css";
import React, {useState} from "react";
import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'; 
import SuperMap from "./Map";
import Home from "./Home";
import NavBar from "./components/NavBar";

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



function App() {
  const [supermarket, setSupermarket] = React.useState();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar supermarket={supermarket} setSupermarket={setSupermarket}/>
      {supermarket && <SuperMap supermarket={supermarket} setSupermarket={setSupermarket}/>}
      {!supermarket && <Home setSupermarket={setSupermarket}/>}
      </ThemeProvider>
    </div>
  )
}

export default App;
