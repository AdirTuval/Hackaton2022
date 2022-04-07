import React from 'react';
import CustomBtn from './CustomBtn'


export default function NavBar({supermarket, setSupermarket}) {
    return (
        <div>
        {supermarket && <CustomBtn txt={"Exit"} action={() => setSupermarket()}/>}
        {!supermarket && <CustomBtn txt={"Shufersal Agron"} action={() => setSupermarket("Shufersal Agron")}/>}
        </div>
    )
        
}

