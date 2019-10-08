import React, { useState, useEffect } from "react";

const Container = ({ number, header, subHeader, children }) => {

    const [containerWidth, setContainerWidth] = useState(null);

    return (
        <div ref={node => node && setContainerWidth(node.offsetWidth)} id={`section-${number}`} className={`container section-${number}`}>
            <div className="banner">
                <p className="header">{header[0]}<span> {header[1]}</span></p>
                <p className="sub-header">{subHeader}</p>
            </div>
            {children}
        </div>
    );
};

export default Container;