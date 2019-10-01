import React from "react";

const Banner = ({ header, subHeader }) => {
    return (
        <div className="banner">
            <p className="header">{header}</p>
            <p className="sub-header">{subHeader}</p>
        </div>
    );
}

export default Banner;