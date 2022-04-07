import React from 'react';
import CustomBtn from './CustomBtn'


export default function NavBar({supermarket, setSupermarket}) {
    return (
        <div>
        {useMapPage && <CustomBtn txt={"Exit"} action={() => setSupermarket()}/>}
        {!useMapPage && <CustomBtn txt={"Shufersal Agron"} action={() => setSupermarket("Shufersal Agron")}/>}
        </div>
    )
        
}

