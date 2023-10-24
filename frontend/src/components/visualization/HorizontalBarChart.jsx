import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';

export default function HorizontalBarChart({ data, hypothesis }) {

    function renderBars() {
        if (hypothesis === "Gender") {
            console.log(data)
            return (
                <>
                    <Bar dataKey="male" stackId="a" fill="rgb(1, 117, 196)" />
                    <Bar dataKey="female" stackId="a" fill="rgb(198, 98, 211)" />
                </>
            );
        } else if (hypothesis === "Age") {
            return (
                <>
                    <Bar dataKey="18-37" stackId="a" fill="rgb(1, 117, 196)" />
                    <Bar dataKey="38-55" stackId="a" fill="rgb(1, 221, 118)" />
                    <Bar dataKey="56-88" stackId="a" fill="rgb(198, 150, 100)" />
                </>
            );
        } else {
            return <Bar dataKey="value" fill="rgb(1, 221, 118)" />;
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
            <Tooltip isAnimationActive={false}/>
            {renderBars()} {/* Calling the function to render the bars */}
        </BarChart>
    );
}
