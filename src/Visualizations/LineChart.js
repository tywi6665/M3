import React, { useState, useEffect, useContext } from 'react';
import { SpendingDataContext } from "../useContext/SpendingDataContext";
import * as d3 from "d3";

const height = 100,
    width = 100,
    margin = { top: 20, right: 0, bottom: 20, left: 20 }

const LineChart = () => {

    const [rawSpending, setRawSpending] = useContext(SpendingDataContext);
    const [spending, setSpending] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const parseDate = d3.timeParse("%m/%d/%Y");

    useEffect(() => {
        if (rawSpending === null) {
            return;
        }
        let array = []
        rawSpending.forEach(transaction => {
            transaction.Transaction_Date = parseDate(transaction.Transaction_Date)
            if (transaction.Amount > 0) {
                return
            } else {
                return array.push({
                    amount: parseInt(Math.abs(transaction.Amount)),
                    date: transaction.Transaction_Date
                })
            }

        });
        setSpending(array.reverse());
    }, [rawSpending]);

    useEffect(() => {
        if (spending === null) {
            return;
        }
        console.log(spending)
        const xScale = d3.scaleTime()
            .domain(d3.extent(spending, (d) => { return d.date; }))
            .range([0, 800]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(spending, (d) => { return d.amount; })])
            .range([220 - margin.bottom, margin.top]);

        const lineGenerator = d3.line()
            .curve(d3.curveCardinal)
            .x(d => xScale(d.date))
            .y(d => yScale(d.amount));

        const line = lineGenerator(spending);
        setParsedData(line);
    }, [spending]);

    return (
        <svg height={`${height}%`} width={`${width}%`}>
            <defs>
                <linearGradient id="spending-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,191,141,1)" />
                    <stop offset="25%" stopColor="rgba(252,167,146,1)" />
                    <stop offset="50%" stopColor="rgba(206,116,198,1)" />
                    <stop offset="75%" stopColor="rgba(148,65,161,1)" />
                    <stop offset="100%" stopColor="rgba(118,48,201,1)" />
                </linearGradient>
            </defs>
            <path className="line" d={parsedData} fill="none" />
        </svg>
    );
}

export default LineChart;