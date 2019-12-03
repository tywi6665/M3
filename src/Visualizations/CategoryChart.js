import React, { useContext, useState, useEffect } from 'react';
import { SpendingDataContext } from "../useContext/SpendingDataContext";
import * as d3 from "d3";

const CategoryChart = ({ width }) => {

    const [rawSpending, setRawSpending] = useContext(SpendingDataContext);
    const [categories, setCategories] = useState(null);

    const svgHeight = 300,
        svgWidth = width,
        innerRadius = 100,
        outerRadius = 300,
        margin = { top: 20, right: 15, bottom: 20, left: 15 };

    useEffect(() => {
        if (categories === null) {
            return;
        }

        const packLayout = d3.pack()
            .size([outerRadius, outerRadius]);

        // const rootNodes = d3.hierarchy(categories);

    }, [width]);

    return (
        <svg height={svgHeight} width={window.innerWidth > 1000 ? 422 : svgWidth}>
            <g>
                {/* Once data is parsed, map through array to output correct number of category circles */}
            </g>
        </svg>
    );
}

export default CategoryChart;