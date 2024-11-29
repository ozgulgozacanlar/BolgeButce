import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MultiBarChart = ({ data, width, height }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      svg.selectAll('*').remove(); // Clear the SVG content

      const margin = { top: 20, right: 30, bottom: 80, left: 40 }; // Increased bottom margin for legend space
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      const content = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Scales
      const x0 = d3.scaleBand()
        .domain(data.map(d => d.group))
        .rangeRound([0, chartWidth])
        .paddingInner(0.1); // Reduced inner padding to decrease space between groups

      const x1 = d3.scaleBand()
        .domain(data[0].values.map(d => d.category))
        .rangeRound([0, x0.bandwidth()])
        .padding(0.1); // Reduced padding to minimize bar gap between bars

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.max(d.values, v => v.value)) || 0])
        .nice()
        .rangeRound([chartHeight, 0]);

      const colors = ['#2c84cc', '#a4c48c']; // Light blue and light green

      const xAxis = content.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x0));
      xAxis.selectAll('line').remove();

      const yAxis = content.append('g')
        .call(d3.axisLeft(y).ticks(5)); // Reducing Y-axis ticks to 5
      yAxis.selectAll('line').remove();

      // Y-axis gridlines
      content.append('g')
        .attr('class', 'y-grid')
        .call(d3.axisLeft(y).tickSize(-chartWidth).tickFormat(''))
        .selectAll('line')
        .style('stroke', '#d3d3d3')
        .style('opacity', 0.7);

   
      d3.selectAll("path").remove(); 

      // Draw bars and labels
      data.forEach((group, i) => {
        const groupG = content.append('g')
          .attr('transform', `translate(${x0(group.group)+ 18 },0)`);

        groupG.selectAll('rect')
          .data(group.values)
          .join('rect')
          .attr('x', d => x1(d.category) || 0)
          .attr('y', d => y(d.value))
          .attr('rx', 5)  // Rounded corners horizontally
          .attr('ry', 5)  // Rounded corners vertically
          .attr('width', x1.bandwidth() * 0.4) // Reduced the width to 60% of original bandwidth
          .attr('height', d => chartHeight - y(d.value))
          .attr('fill', (d, j) => colors[j % colors.length]);

        groupG.selectAll('text')
          .data(group.values)
          .join('text')
          .attr('x', d => x1(d.category) + x1.bandwidth() * 0.4 / 2) // Adjust text position for reduced width
          .attr('y', d => y(d.value) - 5)
          .attr('text-anchor', 'middle')
          .text(d => d.value)
          .style('font-weight', '600')
          .style('fill', '#333');
      });

      // Legend
      const legend = svg.append('g')
        .attr('transform', `translate(200,${height - 30})`); // Position below the chart

      data[0].values.forEach((d, i) => {
        const legendItem = legend.append('g')
          .attr('transform', `translate(${i * 100}, 0)`); // Adjust horizontal spacing

        // Legend color circle
        legendItem.append('circle')
          .attr('cx', 10)
          .attr('cy', 0)
          .attr('r', 5)
          .attr('fill', colors[i % colors.length]);

        // Legend text
        legendItem.append('text')
          .attr('x', 20)
          .attr('y', 2)
          .text(d.category)
          .style('font-size', '12px')
          .style('alignment-baseline', 'middle');
      });
    }
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} style={{ border: 'none' }} />;
};

export default MultiBarChart;
