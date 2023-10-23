import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';

const HorizontalBarChart = ({ data }) => (
  <BarChart
    width={600}
    height={600}
    data={data}
    layout="vertical"
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <XAxis type="number" padding={{ left: 0, right: 0 }} visibility={"hidden"} />
    <YAxis 
      type="category" 
      dataKey="name" 
      width={300} // Allocating half of the chart width to the YAxis labels
    />
    <Tooltip isAnimationActive={false}/>
    <Bar dataKey="value" fill="rgb(1, 221, 118)" />
  </BarChart>
);

export default HorizontalBarChart;

