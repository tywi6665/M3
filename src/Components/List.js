import React, { useState, useContext, useEffect } from 'react';
import { SpendingDataContext } from "../useContext/SpendingDataContext";
import ListItem from "./ListItem";

const List = () => {

    const [rawSpending, setRawSpending] = useContext(SpendingDataContext);
    const [recentTransactions, setRecentTransactions] = useState(null)

    useEffect(() => {
        if (rawSpending === null) {
            return;
        }

        let recent = rawSpending.slice(0, 10);
        setRecentTransactions(recent);
    }, [rawSpending])

    return (
        <div className="list">
            {!recentTransactions ? (
                <p>Loading Your Transaction History</p>
            ) : (
                    recentTransactions.map((recentTransaction, i) => {
                        return (
                            <ListItem
                                transactionName={recentTransaction.Description}
                                transactionAmount={recentTransaction.Amount}
                                key={i}
                            />
                        )
                    })
                )}
        </div>
    );
}

export default List;