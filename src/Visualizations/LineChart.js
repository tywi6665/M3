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

        const mouseOver = d3.select(".mouse-over");

        d3.select("rect")
            .on("mouseout", () => mouseOver.attr("style", "opacity: 0"))
            .on("mouseover", () => mouseOver.attr("style", "opacity: 1"))
            .on("mousemove", handleMousemove)

        // function handleMouseout() {
        //     d3.select(".mouse-line")
        //         .style("opacity", "0");
        //     d3.selectAll(".mouse-over circle")
        //         .style("opacity", "0");
        //     d3.selectAll(".mouse-over text")
        //         .style("opacity", "0");
        // };

        // function handleMouseover() {
        //     d3.select(".mouse-over")
        //         .style("opacity", "1");
        //     d3.selectAll(".mouse-over circle")
        //         .style("opacity", "1");
        //     d3.selectAll(".mouse-over text")
        //         .style("opacity", "1");
        // };

        function handleMousemove() {
            let mouse = d3.mouse(this);
            // d3.select(".mouse-line")
            //     .attr("d", function () {
            //         let path = "M" + mouse[0] + "," + svgHeight;
            //         path += " " + mouse[0] + "," + 0;
            //         return path;
            //     });

            const x0 = xScale.invert(mouse[0]);
            const bisectDate = d3.bisector(d => d.date).right;
            const i = bisectDate(spending, x0, 1);
            const d0 = spending[i - 1];
            const d1 = spending[i];
            const d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            mouseOver
                .attr("transform", `translate(${xScale(d.date)}, ${yScale(d.amount)})`);

            mouseOver.select('line.x')
                .attr('x1', 0)
                .attr('x2', -xScale(d.date))
                .attr('y1', 0)
                .attr('y2', 0);

            mouseOver.select('line.y')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', svgHeight - yScale(d.amount));

            // let beginning = 0,
            //     end = lines[i].getTotalLength(),
            //     target = null;

            // while (true) {
            //     let target = Math.floor((beginning + end) / 2);
            //     var pos = lines[i].getPointAtLength(target);
            //     if ((target === end || target === beginning) && pos.x !== mouse[0]) {
            //         break;
            //     }
            //     if (pos.x > mouse[0]) end = target;
            //     else if (pos.x < mouse[0]) beginning = target;
            //     else break; //position found
            // }

            // d3.select(this).select('text')
            //     .text(y.invert(pos.y).toFixed(2));

            // return "translate(" + mouse[0] + "," + pos.y + ")";

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
                <circle r="7"></circle>
                <line className="x"></line>
                <line className="y"></line>
                <text transform="translate(10,3)"></text>
            </g>
            <rect height={`${svgHeight}%`} width={svgWidth} fill="none" pointerEvents="all"></rect>
        </svg>
    );
}

export default LineChart;