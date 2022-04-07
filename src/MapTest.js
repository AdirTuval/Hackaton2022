import { makeStyles } from "@material-ui/core"
import React, { useState, useEffect, useRef } from "react"
import image from "./super_map.jpeg"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { node_list, node_path } from "./nodeList";

import { Button } from '@material-ui/core'

import Map, { Marker } from 'react-canvas-map'


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

const drawNodes = (ctx) => {
    const nodes = node_list
    ctx.fillStyle = '#000000'

    let i = 0
    nodes.forEach(node => {
        // radius, startAngle, endAngle, counterclockwise
        ctx.beginPath();
        if (node['inBuyList'] == true) {
            ctx.fillStyle = "red";
        }
        else {
            ctx.fillStyle = "blue";

        }
        ctx.arc(node['x'], node['y'], 4, 0, 2 * Math.PI)
        ctx.fill()
    }
    );
    ctx.fillStyle = "red";
}



const MapTest = () => {
    const styles = useStyles();
    const [img, setImage] = useState(null)
    const canvas = useRef(null)
    const [topText, setTopText] = useState('')
    const [bottomText, setBottomText] = useState('')


    useEffect(() => {
        const image = new Image();
        image.src = "https://i.ibb.co/G2wzGBd/super-map.jpg"
        image.onload = () => setImage(image)
        // draw(canvas.getContext('2d'))

    }, [drawNodes])
    const drawPath = () => {
        let ctx = canvas.current.getContext("2d")
        const nodes_in_path = node_path
        ctx.fillStyle = "green";
        ctx.beginPath();

        ctx.moveTo(nodes[0]['x'], nodes[0]['y']);

        for (let i = 0; i < nodes_in_path.length - 1; i++) {
            let loc = nodes[i]
            ctx.lineTo(nodes_in_path[i + 1]['x'], nodes_in_path[i + 1]['y']);
        }
        ctx.stroke();
        ctx.fillStyle = "red";

    }
    useEffect(() => {
        if (img && canvas) {
            const ctx = canvas.current.getContext("2d")
            // ctx.fillRect(0, 0, 400, 600)
            ctx.drawImage(img, 0, 0, canvas.current.width, canvas.current.height)
            // ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
            drawNodes(ctx)
            // drawPath(ctx)

            // ctx.font = "20px Comic Sans MS"
            // ctx.fillStyle = "white"
            // ctx.textAlign = "center"

            // ctx.fillText(topText, (400 / 2), 25)
            // ctx.fillText(bottomText, (400 / 2), 256 + 40 + 25)

        }
    }, [img, canvas, topText, bottomText])

    return (
        <div className={styles.splitScreen}>
            <div className={styles.topPane}>
                <TransformWrapper
                    initialScale={1}
                >
                    <TransformComponent>
                        <canvas
                            ref={canvas}
                            width={400}
                            height={400}
                        />
                    </TransformComponent>
                </TransformWrapper>
            </div>
            <div className={styles.bottomPane}>
                <Button variant="outlined" color="error"
                    onClick={() => {
                        drawPath()
                    }}
                >
                    Route
                </Button>

            </div>
        </div>
    )
}

export default MapTest