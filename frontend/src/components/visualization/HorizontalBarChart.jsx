import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';

export default function HorizontalBarChart({ data, hypothesis }) {

    function CustomActiveShape(props) {
        const { fill, x, y, width, height } = props;
        return <rect x={x} y={y} width={width} height={height} fill={"rgb(1, 221, 118)"} />;
      }

    function renderBars() {
        if (hypothesis === "Gender") {
            console.log(data)
            return (
                <>
                    <Bar dataKey="male" stackId="a" fill="rgb(30, 88, 196)" />
                    <Bar dataKey="female" stackId="a" fill="rgb(164, 27, 182)" />
                </>
            );
        } else if (hypothesis === "Age") {
            return (
                <>
                    <Bar dataKey="18-37" stackId="a" fill="rgb(30, 88, 196)" />
                    <Bar dataKey="38-55" stackId="a" fill="rgb(1, 221, 118)" />
                    <Bar dataKey="56-88" stackId="a" fill="rgb(212, 106, 34)" />
                </>
            );
        } else {
            return <Bar activeBar={false} dataKey="value" fill="rgb(1, 221, 118)" />;
        }
    }


    return (
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
            <Tooltip cursor={false} isAnimationActive={false} contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', // dark background
                    border: 'none',
                    borderRadius: '5px',
                    color: '#fff', // white text
                }}/>
            {renderBars()} {/* Calling the function to render the bars */}
        </BarChart>
    );
}
