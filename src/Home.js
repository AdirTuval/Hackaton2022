import React, { useRef, useState } from "react";


export default function Home({setSupermarket}) {

    return (
        <div >
            HOME!
            <button onClick={() => setSupermarket("RAMI LEVI")}>
                    Rami Levi
                </button>
        </div>
    );
}