import React from "react";

const Container = ({ number, header, subHeader, children }) => {
    return (
        <div className={`container section-${number}`}>
            <div className="banner">
                <p className="header">{header}</p>
                <p className="sub-header">{subHeader}</p>
            </div>
            {children}
        </div>
    );
};

export default Container;