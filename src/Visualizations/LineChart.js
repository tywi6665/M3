import React, { useState, useEffect, useContext } from 'react';
import { SpendingDataContext } from "../useContext/SpendingDataContext";
import * as d3 from "d3";

const height = 100,
    width = 100,
    margin = { top: 20, right: 0, bottom: 20, left: 20 }

const LineChart = () => {

    const [rawSpending, setRawSpending] = useContext(SpendingDataContext);
    const [spending, setSpending] = useState(null);

    useEffect(() => {
        if (rawSpending === null) {
            return;
        }
        let array = []
        rawSpending.forEach(transaction => {
            return array.push({
                Amount: transaction.Amount,
                Date: transaction.Transaction_Date
            })
        });
        setSpending(array.reverse())
    }, [rawSpending])

    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleLinear().range([height - margin.bottom, margin.top]);
    const lineGenerator = d3.line();


    console.log(spending)

    return (
        <svg height={`${height}%`} width={`${width}%`}>
            <linearGradient id="spending-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" color="rgba(255,191,141,1)" />
                <stop offset="25%" color="rgba(252,167,146,1)" />
                <stop offset="50%" color="rgba(206,116,198,1)" />
                <stop offset="75%" color="rgba(148,65,161,1)" />
                <stop offset="100%" color="rgba(118,48,201,1)" />
            </linearGradient>
            <path className="line" d={spending} fill="none" />
        </svg>
    );
}

export default LineChart;