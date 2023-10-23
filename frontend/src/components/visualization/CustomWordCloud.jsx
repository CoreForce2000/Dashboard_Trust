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

function getThemeColor(tab) {
  return colors[tab][1];
}



function getSexColor(percentageDifference) {
  const boyishBlue = [1, 117, 196]; // RGB for blue
  const white = [160, 160, 160]; // RGB for white
  const girlishPink = [198, 98, 211]; // RGB for pink

  function interpolate(color1, color2, factor) {
    return color1.map((color, index) => color + factor * (color2[index] - color));
  }

  const significant = 0.0513;
  const highlySignificant = 0.0674;

  let factor;

  if (Math.abs(percentageDifference) > highlySignificant) {
    factor = 1.7;
  }else if (Math.abs(percentageDifference) > significant) {
    factor = 1;
  }else{
    factor = 0;
  }

  // console.log(
  //   [interpolate(white, girlishPink, 1.7),
  //   interpolate(white, girlishPink, 1),
  //   interpolate(white, boyishBlue, 0),
  //   interpolate(white, boyishBlue, 1),
  //   interpolate(white, boyishBlue, 1.7)]
  // );

  if (percentageDifference <= 0) {
    return `rgb(${interpolate(boyishBlue, white,  percentageDifference*15 ).join(',')})`;
  } else {
    return `rgb(${interpolate(white, girlishPink,  percentageDifference*15 ).join(',')})`;
  }
}











function CustomWordCloud({ tab, hypothesis }) {
  const [data, setData] = useState([]);
  const [callbacks, setCallbacks] = useState({});
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true); // Add this state to track loading

  const fetchData = async (tab, hypothesis) => {
    try {
      setLoading(true); // Set loading to true when starting to fetch
      let wordColumn = `${tab.toUpperCase()}_association`;
      let result = await fetch(`${baseUrl}/data/wordcloud?column=${wordColumn}`).then(resp => resp.json()); // Don't forget to await here
      let sex_demographics = await fetch(`${baseUrl}/data/demographics?column=sex`).then(resp => resp.json()); // Don't forget to await here

      let maleTotalCount = sex_demographics[0].result.Male;
      let femaleTotalCount = sex_demographics[0].result.Female;

      var minValue = 0;
      var maxValue = 100;

      result.forEach((word) => {
        word.frequency = word.value;
        word.percentage = (word.frequency / (maleTotalCount + femaleTotalCount)).toLocaleString(undefined, { style: 'percent' });
        
        
        word.value = (word.value / 3);
        if (word.value > maxValue) {
          maxValue = word.value;
        }
        if (word.value < minValue) {
          minValue = word.value;
        }

        let percentageFemale = (word.FemaleCount / femaleTotalCount)
        let percentageMale = (word.MaleCount / femaleTotalCount)

        word.sexPercentDifference = ((word.FemaleCount / femaleTotalCount) - (word.MaleCount / maleTotalCount));
      });
      
      setData(result);

      if(hypothesis == "Gender") {
        setCallbacks( {
          getWordColor:  word => getSexColor(word.sexPercentDifference),
          // onWordClick: console.log,
          // onWordMouseOver: console.log,
          getWordTooltip: word => `${word.text} count: ${word.frequency} (${word.percentage})`,
        })

      }else{
        setCallbacks( {
          getWordColor:  word => getThemeColor(tab),
          // onWordClick: console.log,
          // onWordMouseOver: console.log,
          getWordTooltip: word => `${word.text} count: ${word.frequency} (${word.percentage})`,


        })
      }

      setOptions( {
        rotations: 2,
        rotationAngles: [0],
        fontSizes: [minValue, maxValue],
        spiral: 'archimedean', // oval-like shape
        // fontFamily: 'Inter',
        fontColor: "white"
      });



    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  useEffect(() => {
    fetchData(tab, hypothesis);
  }, [tab, hypothesis]);

  return (
    <div style={{flexGrow:1}}>
      {loading ? (
        <></>
        ) : (
          <WordCloud words={data} options={options} callbacks={callbacks} />
        )}
    </div>
  );
}

export default CustomWordCloud;
