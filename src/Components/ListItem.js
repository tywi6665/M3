import React from 'react';

const ListItem = ({ transactionName, transactionAmount }) => {
    return (
        <div className="list-item">
            <div className="item-name"><span></span>{transactionName}</div>
            <div className="item-amount"><span></span>{transactionAmount}</div>
        </div>
    );
}

export default ListItem;