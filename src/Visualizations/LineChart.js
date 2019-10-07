import React, { useContext } from 'react';
import { SpendingDataContext } from "../useContext/SpendingDataContext";
import * as d3 from "d3";

const height = 100,
    width = 100,
    margin = { top: 20, right: 0, bottom: 20, left: 20 }

const LineChart = () => {

    const [spending, setSpending] = useContext(SpendingDataContext);

    return (
        <svg height={`${height}%`} width={`${width}%`}></svg>
    );
}

export default LineChart;