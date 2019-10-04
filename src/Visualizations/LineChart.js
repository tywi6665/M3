import React, { useState } from 'react';
import * as d3 from "d3";
import data from "./csv.csv";

const height = 100,
    width = 100,
    margin = { top: 20, right: 0, bottom: 20, left: 20 }

const LineChart = () => {

    const [spending, setSpending] = useState(null);

    d3.csv(data).then(function (data) {
        console.log(data)
    }).catch(function (error) {
        console.log(error)
    })

    return (
        <svg height={`${height}%`} width={`${width}%`}></svg>
    );
}

export default LineChart;