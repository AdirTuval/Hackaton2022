import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import image from './super_map.jpeg';
import {makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    splitScreen: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
    },
    topPane: {
        height: '80%'
    },
    bottomPane: {
        height: '20%'
    }
})

export default function Map({supermarket, setSupermarket}) {
    const styles = useStyles();

    return (
            <div className={styles.splitScreen}>
                <div className={styles.topPane}>
                    <TransformWrapper 
                    initialScale={1}
                    >
                        <TransformComponent>
                        <img src={image} alt="map" style={{ width: "100%"}} />
                        </TransformComponent>
                     </TransformWrapper>   
                </div>
                <div className={styles.bottomPane}>
                    navbar
                </div>
            </div>
    );
}