// TreeMapComponent.jsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TreeMapChart = ({ data, width = 500, height = 400 }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const colors = ["#7ca444", "#dc9465" ,"#d46364"];

    // D3 hiyerarşi ve alan hesaplama
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    d3.treemap()
      .size([width, height])
      .padding(1)
      .round(true)(root);

    // Rect elemanları oluştur ve renklendir
    const nodes = svg.selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    nodes.append("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("fill", (d, i) => colors[i % colors.length])
      .attr("stroke", "#fff");

    // Yüzde değerlerini metin olarak ekle
    nodes.append("text")
      .attr("x", 5)
      .attr("y", 20)
      .text(d => `${d.data.value}%`)
      .attr("fill", "#fff")
      .style("font-size", "12px");

  }, [data, width, height]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default TreeMapChart;