import React, { useContext } from 'react';
import { SpendingDataContext } from "../useContext/SpendingDataContext";
import * as d3 from "d3";

const height = 100,
    width = 100,
    margin = { top: 20, right: 0, bottom: 20, left: 20 }

const LineChart = () => {

    const [spending, setSpending] = useContext(SpendingDataContext);

    return (
        <svg height={`${height}%`} width={`${width}%`}>
            <linearGradient id="spending-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:rgba(255,191,141,1);stop-opacity:1" />
                <stop offset="25%" style="stop-color:rgba(252,167,146,1);stop-opacity:1" />
                <stop offset="50%" style="stop-color:rgba(206,116,198,1);stop-opacity:1" />
                <stop offset="75%" style="stop-color:rgba(148,65,161,1);stop-opacity:1" />
                <stop offset="100%" style="stop-color:rgba(118,48,201,1);stop-opacity:1" />
            </linearGradient>
            <path className="line" d={spending} fill="none" />
        </svg>
    );
}

export default LineChart;