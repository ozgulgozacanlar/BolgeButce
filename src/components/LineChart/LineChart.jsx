import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function LineChart({ data }) {
    const svgRef = useRef(null);


    // D3.js grafiği çizme fonksiyonu
    const drawLineChart = () => {
        const svg = d3.select(svgRef.current);
        // SVG içeriğini temizle (Refresh işleminden önce)
        svg.selectAll('*').remove();
        const margin = { top: 20, right: 40, bottom: 100, left: 50 };
        const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
        const height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

        // Çizim alanı
        const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
        // Y ekseninin üst sınırını biraz genişletmek için maksimum değerin üzerine ekleme yapalım
        const maxValue = d3.max(data, d => Math.max(d.value1, d.value2));
        const yMax = Math.ceil(maxValue / 20) * 20 + 20; // Y ekseninin üst sınırını 20'şer artışla ayarlıyoruz
        console.log(yMax)
        // Zaman (X) ve lineer (Y) ölçekler
        const x = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.date))) // Tarih aralığını belirliyoruz
            .range([50, width]); // Burada X eksenini 50px kaydırıyoruz

        const y = d3.scaleLinear()
            .domain([0, yMax])
            .nice()
            .range([height, 0]);

        // X ve Y eksenleri
        const xAxis = d3.axisBottom(x)
            .tickValues(   // Her bir tarih sadece bir kez görünsün
                Array.from(new Set(data.map(d => new Date(d.date).getTime())))  // Tarihleri benzersiz hale getiriyoruz
                    .map(d => new Date(d)) // Set içerisindeki tarihleri tekrar Date objelerine dönüştürüyoruz
            )
            .tickFormat(d3.timeFormat("%b %d"))  // Ay ve gün formatında gösterecek şekilde düzenliyoruz
            .tickSize(0);
        const yAxis = d3.axisLeft(y)
            .tickValues(d3.range(0, yMax, 20)) // 0'dan başlayarak 20'şer artacak şekilde
            .tickSize(-width)  // Y ekseni tick'lerinin uzunluğunu X ekseninin genişliği kadar uzat


        // Eksenlerin eklenmesi
        g.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height})`) // X ekseninin konumunu burada ayarlanır
            .call(xAxis);

        g.append('g')
            .attr('class', 'y-axis')
            .call(yAxis)
            .selectAll('.domain')  // Y eksenindeki çizgiyi (domain) silinir
            .remove();

        // Y eksenindeki tick'lere soluk gri renk verme kısmı
        g.selectAll('.y-axis .tick line')
            .style('stroke', '#d3d3d3')  // Soluk gri renk
            .style('stroke-width', 1);  // Çizgi kalınlığı
        // Line generator'ları
        const line1 = d3.line()
            .x(d => x(new Date(d.date))) // Tarihi Date objesine çeviriyoruz
            .y(d => y(d.value1));

        const line2 = d3.line()
            .x(d => x(new Date(d.date))) // Tarihi Date objesine çeviriyoruz
            .y(d => y(d.value2));

        // İlk çizgiyi çizdirme (Value 1)
        g.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', line1)
            .attr('stroke', 'steelblue')
            .attr('fill', 'none')
            .attr('stroke-width', 2);

        // İkinci çizgiyi çizdirme (Value 2)
        g.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', line2)
            .attr('stroke', 'orange')
            .attr('fill', 'none')
            .attr('stroke-width', 2);
            
        // Veri noktalarına yuvarlaklar ekleme (Value 1 için)
        g.selectAll('.circle1')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'circle1')
            .attr('cx', d => x(new Date(d.date)))  // X ekseninde konum
            .attr('cy', d => y(d.value1))  // Y ekseninde konum
            .attr('r', 5)  // Yarıçap
            .attr('fill', 'steelblue');

        // Veri noktalarına yazı ekleme (Value 1 için)
        g.selectAll('.label1')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'label1')
            .attr('x', d => x(new Date(d.date)))
            .attr('y', d => y(d.value1) - 10)  // Yazının dairenin üstüne yerleştirilme kısmı
            .attr('text-anchor', 'middle')
            .style('fill', 'steelblue')
            .style('font-size', '10px')
            .text(d => d.value1);

        // Veri noktalarına yuvarlaklar ekleme (Value 2 için)
        g.selectAll('.circle2')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'circle2')
            .attr('cx', d => x(new Date(d.date)))  // X ekseninde konum
            .attr('cy', d => y(d.value2))  // Y ekseninde konum
            .attr('r', 5)  // Yarıçap
            .attr('fill', 'orange');

        // Veri noktalarına yazı ekleme (Value 2 için)
        g.selectAll('.label2')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'label2')
            .attr('x', d => x(new Date(d.date)))
            .attr('y', d => y(d.value2) - 10)  // Yazının dairenin üstüne yerleştirilme kısmı
            .attr('text-anchor', 'middle')
            .style('fill', 'orange')
            .style('font-size', '10px')
            .text(d => d.value2);

        // Legend ekleme ve ortalama
        const legend = g.append('g')
            .attr('transform', `translate(${width / 2 - 80}, ${height + 40})`);  // Legend'ı ortalamak için X koordinatını ayarlanır

        // Value 1 için legend kare kutucuğu ve metni
        legend.append('rect')
            .attr('x', -15)  // Kare kutucuğu konumu
            .attr('y', -10)  // Kare kutucuğunun Y konumu
            .attr('width', 10)  // Kare kutucuğunun genişliği
            .attr('height', 10)  // Kare kutucuğunun yüksekliği
            .attr('fill', 'steelblue');  // Kare kutucuğu rengi

        legend.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .style('fill', 'steelblue')
            .style('font-size', '12px')
            .text('Value 1');

        // Value 2 için legend kare kutucuğu ve metni
        legend.append('rect')
            .attr('x', 65)  // Kare kutucuğu konumu
            .attr('y', -10)  // Kare kutucuğunun Y konumu
            .attr('width', 10)  // Kare kutucuğunun genişliği
            .attr('height', 10)  // Kare kutucuğunun yüksekliği
            .attr('fill', 'orange');  // Kare kutucuğu rengi

        legend.append('text')
            .attr('x', 80)
            .attr('y', 0)
            .style('fill', 'orange')
            .style('font-size', '12px')
            .text('Value 2');
    };

    useEffect(() => {
        drawLineChart();
    }, [data]);

    return <svg ref={svgRef} style={{ width: '100%', height: '100%' }} ></svg>;
    
}
