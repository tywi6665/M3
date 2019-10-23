import React from 'react';

const ListItem = ({ transactionName, transactionAmount }) => {
    return (
        <div className="list-item">
            <div className="item-name"><div></div>{transactionName}</div>
            <div className="item-amount"><div className="down"></div>{transactionAmount}</div>
        </div>
    );
}

export default ListItem;