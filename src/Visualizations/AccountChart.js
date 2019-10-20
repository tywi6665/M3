import React, { useState, useEffect } from 'react';
import * as d3 from "d3";

const AccountChart = ({ accountHistory }) => {

    const [parsedData, setParsedData] = useState(null);
    const parseDate = d3.timeParse("%m/%d/%Y");

    const height = 60,
        width = 120,
        margin = 5;



    useEffect(() => {
        if (accountHistory === null) {
            return;
        }
        // console.log(accountHistory)
        const xScale = d3.scaleTime()
            .domain(d3.extent(accountHistory, (d) => {
                d.date = parseDate(d.date);
                return d.date;
            }))
            .range([margin, width - margin]);

        const yScale = d3.scaleLinear()
            .domain([d3.min(accountHistory, (d) => { return d.amount; }), d3.max(accountHistory, (d) => { return d.amount; })])
            .range([height - margin, margin]);

        const lineGenerator = d3.line()
            .curve(d3.curveCardinal)
            .x(d => xScale(d.date))
            .y(d => yScale(d.amount));

        const accountLine = lineGenerator(accountHistory);
        setParsedData(accountLine);
    }, [accountHistory])


    return (
        <div className="account-chart">
            <svg height={height} width={width}>
                <defs>
                    <filter id="glow">
                        <feGaussianBlur className="blur" stdDeviation="2.5" result="coloredBlur"></feGaussianBlur>
                        <feMerge>
                            <feMergeNode in="coloredBlur"></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                    </filter>
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
        </div>
    );
}

export default AccountChart;