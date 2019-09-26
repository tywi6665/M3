import React from "react";

const Container = ({ number, children }) => {
    return (
        <div className={`container section-${number}`}>
            {children}
        </div>
    );
};

export default Container;