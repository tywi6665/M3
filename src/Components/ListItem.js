import React from 'react';

const ListItem = ({ transactionName, transactionAmount, transactionCategory, categoryAmount, list }) => {
    return (
        <div className="list-item">
            {list === "recent" ? [
                <>
                    <div className="item-name"><div className={transactionAmount < 0 ? "circle-down" : "circle-up"}></div>{transactionName}</div>
                    <div className="item-amount"><div className={transactionAmount < 0 ? "arrow-down" : "arrow-up"}></div>{transactionAmount < 0 ? transactionAmount.replace("-", "-$") : `$${transactionAmount}`}</div>
                </>
            ] : [
                    <>
                        <div className="item-name">{transactionCategory}</div>
                        <div className="item-amount">{categoryAmount < 0 ? categoryAmount.replace("-", "-$") : `$${categoryAmount}`}</div>
                    </>
                ]}

        </div>
    );
}

export default ListItem;