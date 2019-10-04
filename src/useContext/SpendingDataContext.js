import React, { useState } from 'react';
import * as d3 from "d3";
import data from "../Visualizations/csv.csv";

const SpendingDataContext = React.createContext([{}, () => { }]);

const SpendingDataProvider = ({ children }) => {

    const [rawSpendingData, setRawSpendingData] = useState(null);

    d3.csv(data).then(function (data) {
        return data;
    }).catch(function (error) {
        console.log(error)
    })

    return (
        <SpendingDataContext.Provider value={[rawSpendingData, setRawSpendingData]}>
            {children}
        </SpendingDataContext.Provider>
    );
};

export { SpendingDataContext, SpendingDataProvider };