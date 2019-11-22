import React, { useState, useContext, useEffect } from 'react';
import { SpendingDataContext } from "../useContext/SpendingDataContext";
import ListItem from "./ListItem";

const List = ({ section }) => {

    const [rawSpending, setRawSpending] = useContext(SpendingDataContext);
    const [recentTransactions, setRecentTransactions] = useState(null);
    const [transactionCategories, setTransactionCategories] = useState(null);

    useEffect(() => {
        if (rawSpending === null) {
            return;
        }

        let recent = rawSpending.reverse().slice(0, 10);
        setRecentTransactions(recent);

        let categories = [];
        function categoryFrequency(arr) {
            let categoryArr = [];
            arr.forEach(transaction => {
                if (transaction.Category === "") {
                    return
                }
                categoryArr.push({
                    category: transaction.Category,
                    amount: transaction.Amount
                });
            });
            let result = categoryArr.reduce((acc, o) => (acc[o.category] = (acc[o.category] || 0) + 1, acc), {});
            categories.push(Object.entries(result));
        };
        categoryFrequency(rawSpending);
        setTransactionCategories(categories);

    }, [rawSpending]);

    return (
        <div className="list">
            {section === "recent" ? [
                (!recentTransactions ? (
                    <p>Loading Your Transaction History</p>
                ) : (
                        recentTransactions.map((recentTransaction) => {
                            return (
                                <ListItem
                                    list={section}
                                    transactionName={recentTransaction.Description}
                                    transactionAmount={recentTransaction.Amount}
                                    key={recentTransaction.Amount}
                                />
                            )
                        })
                    ))] : [
                    (!transactionCategories ? (
                        <p>Loading Your Transaction History</p>
                    ) : (
                            transactionCategories.map((transactionCategoriesArr) => {
                                return (
                                    transactionCategoriesArr.map(transactionCategory => {
                                        return (
                                            <ListItem
                                                list={section}
                                                transactionCategory={transactionCategory[0]}
                                                categoryAmount={transactionCategory[1]}
                                                key={transactionCategory[0]}
                                            />
                                        )
                                    })
                                )
                            })
                        ))]
            }

        </div>
    );
}

export default List;