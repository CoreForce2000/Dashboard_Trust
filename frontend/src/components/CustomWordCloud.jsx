import React from 'react';
import WordCloud from 'react-wordcloud';
import { baseUrl } from '../config';
import { useEffect, useState } from 'react';

const colors = {

  "Word":["#0175C4", "#0189D8", "#019DEB"],
  "Person":["#01D97C", "#01C962", "#01B34E"],
  "Brand":["#EB7E01", "#F49501", "#FDBA01"],
  "Self":["#C662D3", "#D87CE1", "#EB95EF"]
}


function CustomWordCloud({ tab }) {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true); // Add this state to track loading

  const fetchData = async (tab) => {
    try {
      setLoading(true); // Set loading to true when starting to fetch
      let wordColumn = `${tab.toUpperCase()}_association`;
      let result = await fetch(`${baseUrl}/posts/wordcloud?field=${wordColumn}`).then(resp => resp.json()); // Don't forget to await here

      let minValue = 0;
      let maxValue = 100;
      result.forEach((word) => {
        word.value = (word.value / 3);
        if (word.value > maxValue) {
          maxValue = word.value;
        }
        if (word.value < minValue) {
          minValue = word.value;
        }
      });

      setData(result);


      var options = {
        rotations: 2,
        rotationAngles: [0],
        fontSizes: [minValue, maxValue],
        spiral: 'archimedean', // oval-like shape
        colors: colors[tab]
      };
      setOptions(options);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  useEffect(() => {
    fetchData(tab);
  }, [tab]);

  return (
    <div style={{ width:"84vw", height:"94vh" }}>
      {loading ? (
        <></>
        ) : (
          <WordCloud words={data} options={options} />
        )}
    </div>
  );
}

export default CustomWordCloud;
