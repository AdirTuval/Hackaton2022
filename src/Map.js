import React, { useRef, useState } from "react";


export default function Map({supermarket, setSupermarket}) {

    return (
        <div >
            {supermarket}
            <button onClick={() => setSupermarket()}>
                    Exit
                </button>
            
        </div>
    );
}