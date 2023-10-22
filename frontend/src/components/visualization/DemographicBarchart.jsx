import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { baseUrl } from '../../config';
import { useState, useEffect } from 'react';

function DemographicBarchart({ column })  {

    const [data, setData] = useState([]); // Initialize state with an empty array
    const [loading, setLoading] = useState(true); // Add this state to track loading

    const fetchData = async (columm) => {
      try {
        setLoading(true); // Set loading to true when starting to fetch
        let result = await fetch(`${baseUrl}/data/demographics?column=${column}`).then(resp => resp.json()); // Don't forget to await here
  
        console.log(result)
        setData(result);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false once fetching is complete
      }
    };
    
    useEffect(() => {
      fetchData(column);
    }, [column]);

    return (
        (
          <>
          {loading ? (
              <></>
              ) : (
                <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="count" fill="#8884d8" activeBar={<Rectangle fill="black" stroke="blue" />} />
                {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
              </BarChart>
              )}
          </>
        )
    );
  }

export default DemographicBarchart;
