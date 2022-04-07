import React, { useRef, useState } from "react";
import SuperDropdown from './components/superDropdown'
import CustomBtn from './components/CustomBtn'
import { ReactComponent as Logo } from './assets/logo.svg';
import { ReactComponent as Camera } from './assets/camera.svg';

export default function Home({supermarket, setSupermarket, setUseMapPage}) {

    return (
        <div container className="home-page" style={{ backgroundColor: '#f5e9d6' }}>
            <div style={{ margin: 25 }}>
                <Logo />
            </div>

            <div container style={{ margin: 25}}>
                <SuperDropdown supermarket={supermarket} setSupermarket={setSupermarket}/>
            </div>

            <div container style={{ margin: 25 }}>
                <Camera />
                <p>Upload Shopping List</p>
            </div>

            <div container style={{ margin: 25 }}>
                <CustomBtn txt={"Start Shopping"} action={() => setUseMapPage(true)}/>
            </div>
        
        </div>
    );
}