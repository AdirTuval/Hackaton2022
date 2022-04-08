import { makeStyles } from "@material-ui/core"
import React, { useState, useEffect, useRef } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { nodeList } from "./data/SupermarketLayout";
import { Products as products } from "./data/Products";
import { Modal, Button } from 'antd';
import Autocomplete from '@mui/material/Autocomplete';
import { CalculatePath } from "./Backend/PathFinder/PathFinder"

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

const MapTest = () => {
    const styles = useStyles();
    const [img, setImage] = useState(null)
    const [dialogContent, setDialogContent] = useState(0)
    const searchRef = useRef("");
    const [productArray, setProductAraay] = useState(["Banana", "Milk", "Potato", "Lettuce","Shampoo"])


    const loadNodeMap = (nodeList) => {
        let nodes = new Map();
        nodeList.forEach(node => {
            nodes.set(node.id, node);
        })
        return nodes;
    };

    const nodes = loadNodeMap(nodeList);
    
    const productsMap = new Map();
    products.forEach(product => {
        productsMap.set(product.name, product);
    });

    const convertProductsToNodesID = products => {
        return products.map(product => {
            return productsMap.get(product).nodeId;
        });
    };

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



    const x_factor = 17
    const y_factor = 18
    const offset = 20


    const drawPath = (ctx, path) => {

        ctx.fillStyle = "green";
        ctx.beginPath();
        let loc = path[0]
        ctx.strokeStyle = 'green';
        ctx.lineWidth = 8;
        ctx.moveTo(nodes.get(loc)["corx"] * x_factor + offset, nodes.get(loc)["cory"] * y_factor + offset);

        for (let i = 0; i < path.length - 1; i++) {
            loc = path[i + 1]
            ctx.lineTo(nodes.get(loc)['corx'] * x_factor + offset, nodes.get(loc)['cory'] * y_factor + offset);
        }
        ctx.stroke();
    }
    const drawNodes = (ctx, products) => {
        console.log(products)
        ctx.fillStyle = '#000000'
        products.forEach(nodeId => {
                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.arc(nodes.get(nodeId)['corx'] * x_factor + offset, nodes.get(nodeId)['cory'] * y_factor + offset, 4, 0, 2 * Math.PI)
                ctx.fill();
        });
        ctx.fillStyle = "red";
    }

    useEffect(() => {
        loadNodeMap(nodes);
        const image = new Image();
        image.src = "https://i.ibb.co/sqJBdPK/super-map.jpg"
        image.onload = () => {
            setImage(image)
        }
        // draw(canvas.getContext('2d'))

    }, [])



    useEffect(() => {
        const productsToNodesIDArray = convertProductsToNodesID(productArray);
        const productsPath = CalculatePath(productsToNodesIDArray)
        if (img && canvas) {
            const ctx = canvas.current.getContext("2d")
            ctx.drawImage(img, 10, 10, canvas.current.width, canvas.current.height)
            if (routeFlag) {
                drawPath(ctx, productsPath)
                drawNodes(ctx, productsToNodesIDArray)
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

                {popup()}

            {/* <div style={{flex:1, alignItems: "center"}}> */}
                <Autocomplete
                    // disablePortal
                    id="combo-box-demo"
                    freeSolo
                    options={products.map((node) => node.name)}
                    renderInput={(params) => <TextField {...params} label="Search Product" inputRef={searchRef}

                    />}

                />
                <Button variant="outlined" color="error" style={{width:"100%"}}
                    onClick={() => {
                        let name = searchRef.current.value
                        setProductAraay([searchRef.current.value])
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

export default MapTest