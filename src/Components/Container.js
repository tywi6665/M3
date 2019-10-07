import React, { useState, useEffect } from "react";

const Container = ({ number, header, subHeader, children, windowWidth }) => {

    // const [divWidth, setDivWidth] = useState(1300);

    // useEffect(() => {
    //     const section = document.getElementById(`section-${number}`);
    //     let width = section.style.width
    //     setDivWidth(width);
    // }, windowWidth)

    return (
        <div id={`section-${number}`} className={`container section-${number}`}>
            <div className="banner">
                <p className="header">{header[0]}<span> {header[1]}</span></p>
                <p className="sub-header">{subHeader}</p>
            </div>
            {children}
        </div>
    );
};

export default Container;