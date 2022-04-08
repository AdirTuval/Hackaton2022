import { makeStyles } from "@material-ui/core"
import React, { useState, useEffect, useRef } from "react"
import image from "./super_map.jpeg"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { nodeList } from "./Backend/data";
import { Products } from "./newNodeList";
import { myMap } from "./newNodeList";

// import { Button } from '@material-ui/core'
import { Modal, Button } from 'antd';
import Autocomplete from '@mui/material/Autocomplete';


import TextField from '@mui/material/TextField';



const useStyles = makeStyles({
    splitScreen: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
    },
    topPane: {
        height: '80%',
        width: "100%"
    },
    bottomPane: {
        height: '20%',
        width: '100%',

        // width: '60%',

    }
})

const Map = () => {
    const styles = useStyles();
    const [img, setImage] = useState(null)
    const [dialogContent, setDialogContent] = useState(0)
    const searchRef = useRef("");

    const canvas = useRef(null)
    // const [topText, setTopText] = useState('')
    // const [bottomText, setBottomText] = useState('')
    const [routeFlag, setRouteFlag] = useState(false)

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const createNodeMap = (nodeList) => {
        let map = new Map();
        nodeList.forEach(node => {
            map.set(node.id, node);
        })
        return map;
    };

    const x_factor = 17
    const y_factor = 18

    const offset = 20



    const drawPath = (ctx) => {

        // let ctx = canvas.current.getContext("2d")

        const nodes_in_path = [0,24,25,26,27,28]
        const nodes = createNodeMap(nodeList)

        ctx.fillStyle = "green";
        ctx.beginPath();
        let loc = nodes_in_path[0]
        console.log(nodes.get(loc))
        ctx.lineWidth = 8;
        ctx.moveTo(nodes.get(loc)["corx"] * x_factor + offset, nodes.get(loc)["cory"] * y_factor + offset);

        for (let i = 0; i < nodes_in_path.length - 1; i++) {
            loc = nodes_in_path[i + 1]
            console.log(nodes.get(loc))
            ctx.lineTo(nodes.get(loc)['corx'] * x_factor + offset, nodes.get(loc)['cory'] * y_factor + offset);
        }
        ctx.stroke();
    }
    const drawNodes = (ctx) => {
        const nodes = nodeList
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
            ctx.arc(node['corx'] * x_factor + offset, node['cory'] * y_factor + offset, 4, 0, 2 * Math.PI)
            ctx.fill()
        }
        );
        ctx.fillStyle = "red";
    }

    useEffect(() => {

        const image = new Image();
        image.src = "https://i.ibb.co/sqJBdPK/super-map.jpg"
        image.onload = () => {
            setImage(image)
        }
        // draw(canvas.getContext('2d'))

    }, [])



    useEffect(() => {
        if (img && canvas) {
            const ctx = canvas.current.getContext("2d")
            ctx.drawImage(img, 10, 10, canvas.current.width, canvas.current.height)
            // ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise);
            drawNodes(ctx)
            if (routeFlag) {
                drawPath(ctx)
            }

        }
    }, [img, canvas, routeFlag])

    const popup = (props) => {
        return (< Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
            <p>Some contents...</p>
            <p>{dialogContent}</p>
            <p>Some contents...</p>
        </Modal >)
    }

    return (
        <div className={styles.splitScreen}>

            <div className={styles.topPane} >
                <TransformWrapper
                    initialScale={1}
                >
                    <TransformComponent>
                        <canvas
                            ref={canvas}
                            width={390}
                            height={600}
                            onMouseMove={(e) => {
                                const cols = 23
                                // console.log("y ", e.clientY, " x ", e.clientX)
                                let y = Math.floor(Math.max((e.clientY - offset),0) / y_factor)
                                let x = Math.floor(Math.max((e.clientX - offset),0) / x_factor)
                                let id = Math.floor((cols * y) + x)
                                console.log("y^ ", y)
                                console.log("x^ ", x)
                                console.log("id^ ", id)

                                // console.log("id: ", nodeList[id]['product'])
                                let content = `product: ${id}`
                                // console.("content: ", content)
                                if (id >= 0) {
                                    setDialogContent(content)
                                    // showModal()
                                }
                            }}
                        />
                    </TransformComponent>
                </TransformWrapper>
            </div>
            <div className={styles.bottomPane}>
                <Button variant="outlined" color="error"
                    onClick={() => {
                        setRouteFlag(true)
                    }}
                >
                    Route
                </Button>

            </div>
            <div>
                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>

                {popup()}

            </div>
            <div>
                <Autocomplete
                    // disablePortal
                    id="combo-box-demo"
                    freeSolo
                    options={Products.map((node) => node.name)}
                    renderInput={(params) => <TextField {...params} label="freeSolo" inputRef={searchRef}

                    />}

                />
                <Button variant="outlined" color="error"
                    onClick={() => {
                        let name = searchRef.current.value
                        // console.log(myMap.get(name))
                        // drawPath()
                    }}
                >
                    Find!
                </Button>
            </div>

        </div >
    )
}

export default Map