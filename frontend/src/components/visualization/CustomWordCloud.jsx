import React from 'react';
import WordCloud from 'react-wordcloud';
import { baseUrl } from '../../config';
import { useEffect, useState } from 'react';

const colors = {

  "Word":["#0175C4", "#0189D8", "#019DEB"],
  "Person":["#01D97C", "#01C962", "#01B34E"],
  "Brand":["#EB7E01", "#F49501", "#FDBA01"],
  "Self":["#C662D3", "#D87CE1", "#EB95EF"]
}


function getSexColor(value) {
  const boyishBlue = [1, 117, 196]; // RGB for blue
  const white = [140, 140, 140]; // RGB for white
  const girlishPink = [198, 98, 211]; // RGB for pink
  
  function interpolate(color1, color2, factor) {
    return color1.map((color, index) => color + factor * (color2[index] - color));
  }

  const factor = (value - 0.4) / 0.2; // Normalize to a 0-1 range

  if (value < 0.45 | value > 0.55) {
    if (factor <= 0.5) {
      return `rgb(${interpolate(boyishBlue, white, factor * 2).join(',')})`;
    } else {
      return `rgb(${interpolate(white, girlishPink, (factor - 0.5) * 2).join(',')})`;
    }
  } else {
    return `rgb(${white.join(',')})`;
  }

  // if (value <= 0.4) {
  //   return `rgb(${boyishBlue.join(',')})`;
  // } else if (value >= 0.6) {
  //   return `rgb(${girlishPink.join(',')})`;
  // } else {   
  //   if (factor <= 0.5) {
  //     return `rgb(${interpolate(boyishBlue, white, factor * 2).join(',')})`;
  //   } else {
  //     return `rgb(${interpolate(white, girlishPink, (factor - 0.5) * 2).join(',')})`;
  //   }
  // }
}

const callbacks = {
  getWordColor: word => getSexColor(word.averageBinarySex),
  onWordClick: console.log,
  onWordMouseOver: console.log,
  getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
}




function CustomWordCloud({ tab }) {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true); // Add this state to track loading

  const fetchData = async (tab) => {
    try {
      setLoading(true); // Set loading to true when starting to fetch
      let wordColumn = `${tab.toUpperCase()}_association`;
      let result = await fetch(`${baseUrl}/data/wordcloud?column=${wordColumn}`).then(resp => resp.json()); // Don't forget to await here

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
        // color:getWordColor
        // color: colors[tab]

        // colors: result.map(word => getWordColor(word.averageBinarySex))
        colors:result.map(word => getSexColor(word.averageBinarySex))
      };

      // console.log(result.map(word => getSexColor(word.averageBinarySex)))

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
    <div style={{ width:"84vw", height:"96vh" }}>
      {loading ? (
        <></>
        ) : (
          <WordCloud words={data} options={options} callbacks={callbacks} />
        )}
    </div>
  );
}

export default CustomWordCloud;
