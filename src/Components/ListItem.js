import React from 'react';

const ListItem = ({ transactionName, transactionAmount, transactionCategory, categoryAmount, list }) => {
    return (
        <ul className="list-item">
            {list === "recent" ? [
                (<li>
                    <div className="item-name">
                        <div className={transactionAmount < 0 ? "circle-down" : "circle-up"}></div>
                        {transactionName}
                    </div>
                    <div className="item-amount">
                        <div className={transactionAmount < 0 ? "arrow-down" : "arrow-up"}></div>
                        {transactionAmount < 0 ? transactionAmount.replace("-", "-$") : `$${transactionAmount}`}
                    </div>
                </li>)
            ] : [
                    (<li>
                        <div className="item-name">{transactionCategory.toUpperCase()}</div>
                        <div className="item-amount">{`$${Math.abs(categoryAmount)}`}</div>
                    </li>)
                ]}

        </ul>
    );
}

export default ListItem;