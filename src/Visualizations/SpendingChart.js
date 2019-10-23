import React, { useState, useEffect, useContext } from 'react';
import { SpendingDataContext } from "../useContext/SpendingDataContext";
import * as d3 from "d3";

const LineChart = ({ width }) => {

    const [rawSpending, setRawSpending] = useContext(SpendingDataContext);
    const [spending, setSpending] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const [hoverAmount, setHoverAmount] = useState("--");
    const [hoverDate, setHoverDate] = useState("--");
    const parseDate = d3.timeParse("%m/%d/%Y");

    useEffect(() => {
        if (rawSpending === null) {
            return;
        }
        let array = []
        rawSpending.forEach(transaction => {
            transaction.Transaction_Date = parseDate(transaction.Transaction_Date)
            if (parseInt(transaction.Amount) > 0 || parseInt(transaction.Amount) === 0) {
                return
            } else {
                return array.push({
                    amount: parseInt(Math.abs(transaction.Amount)),
                    date: transaction.Transaction_Date
                })
            }

        });
        setSpending(array.sort((a, b) => (a.date > b.date) ? 1 : -1));
    }, [rawSpending]);

    const svgHeight = 230,
        svgWidth = width,
        margin = { top: 20, right: 15, bottom: 20, left: 15 };

    useEffect(() => {
        if (spending === null) {
            return;
        }

        const xScale = d3.scaleTime()
            .domain(d3.extent(spending, (d) => { return d.date; }))
            .range([0, svgWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(spending, (d) => { return d.amount; })])
            .range([220 - margin.bottom, margin.top]);

        const lineGenerator = d3.line()
            .curve(d3.curveCardinal)
            .x(d => xScale(d.date))
            .y(d => yScale(d.amount));

        const spendingLine = lineGenerator(spending);
        setParsedData(spendingLine);

        const mouseOver = d3.select(".mouse-over");
        const circle = d3.select(".mouse-over circle");
        const formatValue = d3.format(",.2f");
        const formatDate = d3.timeFormat("%m/%d/%Y");
        // const formatCurrency = d => `$${formatValue(d)}`;

        d3.select("rect")
            .on("mouseout", () => mouseOver.attr("style", "opacity: 0"))
            .on("mouseover", () => mouseOver.attr("style", "opacity: 1"))
            .on("mousemove", handleMousemove)

        function handleMousemove() {
            let mouse = d3.mouse(this);
            const x0 = xScale.invert(mouse[0]);
            const bisectDate = d3.bisector(d => d.date).left;
            const i = bisectDate(spending, x0, 1);
            const d0 = spending[i - 1];
            const d1 = spending[i];
            const d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            mouseOver
                .attr("transform", `translate(${xScale(d.date)}, ${yScale(d.amount)})`);

            circle.attr("style", "opacity: 1");

            setHoverAmount(`${d.amount}`);
            setHoverDate(formatDate(d.date));

            // mouseOver.select('line.x')
            //     .attr('x1', 0)
            //     .attr('x2', -xScale(d.date))
            //     .attr('y1', 0)
            //     .attr('y2', 0);

            mouseOver.select('line.y')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', -220)
                .attr('y2', 60);


            // mouseOver.select('text')
            //     .attr('x', 9)
            //     .attr('dy', '.35em')
            //     .text(formatCurrency(d.amount));
        };
    }, [width, spending]);

    return (
        <>
            <svg height={svgHeight} width={svgWidth}>
                <defs>
                    <filter id="glow">
                        <feGaussianBlur className="blur" stdDeviation="4.5" result="coloredBlur"></feGaussianBlur>
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
                <g className="mouse-over">
                    <circle r="7"></circle>
                    {/* <line className="x"></line> */}
                    <line className="y"></line>
                    {/* <text></text> */}
                </g>
                <rect height={svgHeight} width={svgWidth} fill="none" pointerEvents="all"></rect>
            </svg>
            <div className="hover-data">
                <p>Transaction Amount: $<span>{`${hoverAmount}`}</span></p>
                <p>Transaction Date: <span>{`${hoverDate}`}</span></p>
            </div>
        </>
    );
}

export default LineChart;