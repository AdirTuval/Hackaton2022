import React from 'react';
import CustomBtn from './CustomBtn'


export default function NavBar({useMapPage, setUseMapPage}) {
    return (
        <div>
        {useMapPage && <CustomBtn txt={"Exit"} action={() => setUseMapPage(false)}/>}
        {!useMapPage && <CustomBtn txt={"change"} action={() => setUseMapPage(true)}/>}
        </div>
    )
        
}

