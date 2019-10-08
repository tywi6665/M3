import React, { useState, useEffect, useContext } from 'react';
import { SpendingDataContext } from "../useContext/SpendingDataContext";
import * as d3 from "d3";

const LineChart = ({ width }) => {

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

    const svgHeight = 100,
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

        const lines = document.getElementsByClassName("line");
        d3.select("rect")
            .on("mouseout", handleMouseout)
            .on("mouseover", handleMouseover)
            .on("mousemove", handleMousemove)

        function handleMouseout() {
            d3.select(".mouse-line")
                .style("opacity", "0");
            d3.selectAll(".mouse-per-line circle")
                .style("opacity", "0");
            d3.selectAll(".mouse-per-line text")
                .style("opacity", "0");
        };

        function handleMouseover() {
            d3.select(".mouse-line")
                .style("opacity", "1");
            d3.selectAll(".mouse-per-line circle")
                .style("opacity", "1");
            d3.selectAll(".mouse-per-line text")
                .style("opacity", "1");
        };

        function handleMousemove(d) {
            let mouse = d3.mouse(this);
            d3.select(".mouse-line")
                .attr("d", function () {
                    let d = "M" + mouse[0] + "," + svgHeight;
                    d += " " + mouse[0] + "," + 0;
                    return d;
                });
            d3.select(".mouse-per-line")
                .attr("transform", function (d, i) {
                    // console.log(mouse[0])
                    // const x = d3.scaleTime().domain(d3.extent(spending, (d) => { return d.date; }))
                    //     .range([0, svgWidth])
                    // let xDate = x.invert(mouse[0]),
                    //     bisect = d3.bisector(function (d) { return d.date; }).right,
                    //     idx = bisect(d.values, xDate);
                    // console.log(xDate, bisect, idx)

                    let beginning = 0,
                        end = lines[i].getTotalLength(),
                        target = null;

                    while (true) {
                        let target = Math.floor((beginning + end) / 2);
                        var pos = lines[i].getPointAtLength(target);
                        if ((target === end || target === beginning) && pos.x !== mouse[0]) {
                            break;
                        }
                        if (pos.x > mouse[0]) end = target;
                        else if (pos.x < mouse[0]) beginning = target;
                        else break; //position found
                    }

                    // d3.select(this).select('text')
                    //     .text(y.invert(pos.y).toFixed(2));

                    return "translate(" + mouse[0] + "," + pos.y + ")";
                });
        };
    }, [width, spending]);

    return (
        <svg height={`${svgHeight}%`} width={svgWidth}>
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
                <path className="mouse-line"></path>
                <g className="mouse-per-line">
                    <circle r="7"></circle>
                    <text transform="translate(10,3)"></text>
                </g>
                <rect height={`${svgHeight}%`} width={svgWidth} fill="none" pointerEvents="all"></rect>
            </g>
        </svg>
    );
}

export default LineChart;