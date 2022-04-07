import React, { useRef, useState } from "react";
import SuperDropdown from './components/superDropdown'
import CustomBtn from './components/CustomBtn'

export default function Home({supermarket, setSupermarket, setUseMapPage}) {

    return (
        <div className="home-page">
            <SuperDropdown supermarket={supermarket} setSupermarket={setSupermarket}/>
        
            <CustomBtn txt={"Start Shopping"} action={() => setUseMapPage(true)}/>
        </div>
    );
}