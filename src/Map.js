import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import image from "./super_map.jpeg";
import { makeStyles } from "@material-ui/core/styles";
import Map, { Marker } from "react-canvas-map";

const useStyles = makeStyles({
  splitScreen: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100vw",
    height: "100vh",
  },
  topPane: {
    height: "80%",
  },
  bottomPane: {
    height: "20%",
  },
});

export default function SuperMap({ supermarket, setSupermarket }) {
  const styles = useStyles();

  return (
    <div className={styles.splitScreen}>
      <div className={styles.topPane}>
        <TransformWrapper initialScale={1}>
          <TransformComponent>
            <Map image={image}></Map>
            {/* <img src={image} alt="map" style={{ width: "100%"}} /> */}
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className={styles.bottomPane}>navbar</div>
    </div>
  );
}
