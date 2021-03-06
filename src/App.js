import "./App.css";
import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Home from "./Home";
import NavBar from "./components/NavBar";
import MapTest from "./MapTest";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e1667",
    },
    secondary: {
      main: "#c7d8ed",
    },
  },
  typography: {
    fontFamily: ["Roboto"],
    h4: {
      fontWeight: 600,
      fontSize: 28,
      lineHeight: "2rem",
    },
    h5: {
      fontWeight: 100,
      lineHeight: "2rem",
    },
  },
});

const styles = makeStyles({});

function App() {
  const [supermarket, setSupermarket] = React.useState();
  const [useMapPage, setUseMapPage] = React.useState(false);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <NavBar useMapPage={useMapPage} setUseMapPage={setUseMapPage}/> */}
        {useMapPage && (
          <MapTest supermarket={supermarket} setSupermarket={setSupermarket} />
        )}
        {!useMapPage && (
          <Home
            supermarket={supermarket}
            setSupermarket={setSupermarket}
            setUseMapPage={setUseMapPage}
          />
        )}
      </ThemeProvider>
    </div>
  );
}

export default App;
