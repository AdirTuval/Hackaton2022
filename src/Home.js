import React, { useRef, useState } from "react";
import SuperDropdown from './components/superDropdown'
import {CustomBtn} from './components/CustomBtn'

export default function Home({setSupermarket}) {

    return (
        <div className="home-page">
            <SuperDropdown setSupermarket={setSupermarket}/>
        
            <CustomBtn txt={"Shufersal Agron"} action={() => setSupermarket("Shufersal Agron")}/>
        </div>
    );
}