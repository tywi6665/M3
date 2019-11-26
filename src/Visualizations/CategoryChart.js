import React, { useContext, useState, useEffect } from 'react';
import { SpendingDataContext } from "../useContext/SpendingDataContext";
import * as d3 from "d3";

const CategoryChart = ({ width }) => {

    const [rawSpending, setRawSpending] = useContext(SpendingDataContext);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        if (categories === null) {
            return;
        }

        console.log(width);

    }, [width])

    const svgHeight = 300,
        svgWidth = width,
        margin = { top: 20, right: 15, bottom: 20, left: 15 };

    return (
        <svg height={svgHeight} width={svgWidth}></svg>
    );
}

export default CategoryChart;