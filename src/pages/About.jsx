import React, { useState, useEffect } from 'react';
import { MultiBarChart , GaugeChart, KPICard, TreeMapChart,LineChart , TableChart } from "../components";

export default function About() {
  const dataBarchart = [
    { group: 'Group 1', values: [{ category: 'Bölge', value: 30 }, { category: 'Banka', value: 70 }] },
    { group: 'Group 2', values: [{ category: 'Bölge', value: 50 }, { category: 'Banka', value: 80 }] },
    { group: 'Group 3', values: [{ category: 'Bölge', value: 40 }, { category: 'Banka', value: 60 }] },
    { group: 'Group 4', values: [{ category: 'Bölge', value: 90 }, { category: 'Banka', value: 30 }] },
  ];

  const dataTreeMap = {
    name: "root",
    children: [
      { name: "Category 1", value: 55.8 },
      { name: "Category 2", value: 26.7 },
      { name: "Category 3", value: 17.5 },
    ]
  };
  // Line chart için dummy veri
  const data = [
    { date: '2024-01-05', value1: 30, value2: 20 },
    { date: '2024-02-05', value1: 40, value2: 28 },
    { date: '2024-03-05', value1: 22, value2: 62 },
    { date: '2024-04-05', value1: 60, value2: 45 },
    { date: '2024-05-05', value1: 55, value2: 15 },
    { date: '2024-06-05', value1: 35, value2: 49 },
    { date: '2024-07-05', value1: 90, value2: 75 },
  ];

  const tableData = {
    headers: ['Trigger/Dönem', 'Oca.24', 'Şub.24', 'Mar.24', 'Mar.23','Ara.23','Oca.24', 'Şub.24', 'Mar.24'],
    data: [
      ['Apple', '','','','684.202', '684.202', '256.141', '789.064', '392.820'],
      ['Banana', '','','','684.202', '198.523', '478.620', '391.621', '820.231'],
      ['Orange','','','', '684.202', '234.902', '876.502', '754.820', '556.703'],
      ['Grape', '','','','684.202', '113.284', '493.828', '394.820', '293.920'],
      ['Melon','','','', '684.202', '749.231', '927.140', '639.102', '189.301'],
      ['Strawberry', '','','','684.202', '501.234', '679.102', '924.681', '392.841'],
      ['Peach', '','','','684.202', '821.643', '384.920', '918.462', '102.938'],
      ['Pineapple', '','','','684.202', '498.203', '192.840', '738.293', '493.920'],
      ['Mango', '','','','684.202', '203.958', '230.948', '564.283', '847.102']
    ]
  };
  return (
    <div className="d-flex justify-content-center align-items-center pt-5">
      <div className="d-flex flex-column align-items-center" style={{ gap: '20px' }}>
        
        {/* İlk satırdaki grafikler (MultiBarChart ve TreeMapChart) */}
        <div className="d-flex justify-content-between w-100">
          <div className="card" style={{ width: '600px', height: '400px' , flex: 1, marginRight: '20px'}}>
            <h4>Multi Bar Chart</h4>
            <MultiBarChart data={dataBarchart} width={600} height={350} />
          </div>
          <div className="card" style={{ width: '600px', height: '400px', flex: 1, marginRight: '20px' }}>
            <h4>TreeMap Chart</h4>
            <TreeMapChart data={dataTreeMap} width={550} height={400} />
          </div>
        </div>
  
        {/* İkinci satırdaki grafikler (GaugeChart ve KPI Card) */}
        <div className="d-flex justify-content-between w-100">
          <div className="card" style={{ width: '600px', height: '400px' , flex: 1, marginRight: '20px'}}>
            <h4>Gauge Chart</h4>
            <GaugeChart value1={35} value2={35} value3={25} target={63.5} centerText={"Hedef Gerçekleşen"} />
          </div>
          <div className="card" style={{ width: '600px', height: '400px', flex: 1, marginRight: '20px' }}>
            <h4>KPI Card</h4>
            <div className="d-flex flex-column align-items-center">
              <KPICard text={"Geçen Ay"} value={"%92"} />
              <br />
              <KPICard text={"Geçen Ay"} value={"%83"} />
              <br />
              <KPICard text={"Gerçekleşen Kar Küm (Bin TL)"} value={"1.124.253"} />
            </div>
          </div>
        </div>
  
        {/* Üçüncü satırdaki grafikler (LineChart ve TableChart) */}
        <div className="d-flex justify-content-between align-items-stretch w-100">
          <div className="card" style={{ flex: 1, marginRight: '20px' }}>
            <div className="card-body">
              <h2 className="card-title">Karlılık</h2>
              <LineChart data={data} />
            </div>
          </div>
          <div className="card" style={{ flex: 1, marginRight: '20px' }}>
            <div className="card-body">
              <h2 className="card-title">Ödeme Sistemleri</h2>
              <TableChart tableData={tableData} />
            </div>
          </div>
        </div>
  
      </div>
    </div>
  );
  

}
