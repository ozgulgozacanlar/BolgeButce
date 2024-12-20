import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const GaugeChart = ({ value1, value2, value3, target, centerText }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 600;  // Grafik boyutunu büyütüyoruz
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const arcWidth = 16;  // Path'leri inceltiyoruz
    const gap = 5;  // Path'ler arasındaki boşluk (derece cinsinden)

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    // Dönüşüm (0-180 derece)
    const scale = d3.scaleLinear().domain([0, 100]).range([0, Math.PI]);

    const arc = d3.arc()
      .innerRadius(radius - arcWidth)
      .outerRadius(radius)
      .startAngle(0)
      .endAngle(d => scale(d))
      .cornerRadius(10);  // Path'lere yuvarlatma ekliyoruz

    // Renkler: Açık kırmızı, turuncu, açık yeşil
    const colors = ["#d46364", "#dc9465", "#7ca444"]; // Yeni renkler

    // Her dilimin başlangıç ve bitiş açılarını düzgün bir şekilde hesaplamak için
    const totalValue = value1 + value2 + value3;
    const angle1 = (value1 / totalValue) * Math.PI; // 0 ile π (180 derece) arasında
    const angle2 = (value2 / totalValue) * Math.PI;
    const angle3 = (value3 / totalValue) * Math.PI;

    // Gap değerini uygulayarak her dilim için açı hesapla
    const gapAngle = (gap / 180) * Math.PI;  // Boşluğu açıya çevir

    // Gauge arc'lerini çiz
    svg.selectAll(".arc")
      .data([
        { value: value1, angle: angle1, color: colors[0] },
        { value: value2, angle: angle2, color: colors[1] },
        { value: value3, angle: angle3, color: colors[2] }
      ])
      .enter().append("path")
      .attr("class", "arc")
      .attr("d", d => arc(d.value))
      .attr("fill", d => d.color)
      .attr("transform", (d, i) => {
        const rotationAngle = i === 0 ? -90 :
          i === 1 ? (angle1 + gapAngle - Math.PI / 2) * 180 / Math.PI :
          (angle1 + angle2 + gapAngle - Math.PI / 2) * 180 / Math.PI;
        return `rotate(${rotationAngle})`;
      });

    // Target'ın doğru açısını hesapla
    const totalAngle = angle1 + angle2 + angle3; // Tüm açıyı hesapla
    const targetAngle = (target / 100) * Math.PI - Math.PI / 2 + (3 * Math.PI / 2); // Rotate 270 degrees

    // Target için küçük bir daire ekle
    const addTargetCircle = (angle) => {
      const x = (radius - arcWidth - 10) * Math.cos(angle); // X koordinatı
      const y = (radius - arcWidth - 10) * Math.sin(angle); // Y koordinatı
      svg.append("circle")
        .attr("cx", x)
        .attr("cy", y - 20)
        .attr("r", 14)  // Küçük daire boyutu
        .attr("fill", "#7ca444")  // Dairenin rengi
        .style("opacity", 0.8)  // Hafif parıltı efekti
        .style("transition", "opacity 0.3s ease-in-out");

      // İçeride beyaz bir daire ekle
      svg.append("circle")
        .attr("cx", x)
        .attr("cy", y - 20)
        .attr("r", 5)  // Küçük iç daire boyutu
        .attr("fill", "#FFFFFF")  // İç daire beyaz
        .style("opacity", 1);  // Tam görünürlük
    };

    // Target circle'ını ekle
    addTargetCircle(targetAngle);  // Bu fonksiyon artık 270 derece dönmüş olacak

    // Merkezi etiket (target değeri)
    svg.append("text")
      .attr("class", "center-text")
      .attr("x", 0)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .style("font-size", "40px")  // Font boyutunu biraz büyütüyoruz
      .style("font-weight", "600")
      .text(`${target}%`);

    svg.append("text")
      .attr("class", "center-text")
      .attr("x", 0)
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .style("font-size", "25px")  // Font boyutunu biraz büyütüyoruz
      .style("font-weight", "400")
      .text(centerText);

    // %0 ve %100 etiketlerini ekle
    svg.append("text")
      .attr("x", -radius + 10)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "400")
      .text("0%");

    svg.append("text")
      .attr("x", radius - 10)
      .attr("y", 35)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "400")
      .text("100%");
  }, [value1, value2, value3, target]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default GaugeChart;
