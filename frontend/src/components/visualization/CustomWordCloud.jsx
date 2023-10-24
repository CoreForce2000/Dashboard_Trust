import React from 'react';
import WordCloud from 'react-wordcloud';
import { baseUrl } from '../../config';
import { normalizeNumbers } from '../../helpers';
import { useEffect, useState } from 'react';
import { ResponsiveContainer } from 'recharts';

const colors = {

  "Word":["#0175C4", "#0189D8", "#019DEB"],
  "Person":["#01D97C", "#01C962", "#01B34E"],
  "Brand":["#EB7E01", "#F49501", "#FDBA01"],
  "Self":["#C662D3", "#D87CE1", "#EB95EF"]
}

const boyishBlue = [1, 1, 196]; // RGB for blue  "rgb(1, 117, 196)"
const limeGreen = [147, 212, 183]
const green = [1, 221, 118] 
const black = [26,28,26]
const white = [220, 220, 220]; // RGB for white
const girlishPink = [164, 27, 182]; // RGB for pink "rgb(198, 98, 211)"

function getThemeColor(tab) {
  return `rgb(${ black.join(',') })`;
}

function interpolate(color1, color2, factor) {
  return color1.map((color, index) => color + factor * (color2[index] - color));
}
function interpolateInverse(color1, color2, factor) {
  return color1.map((color, index) => color - factor * (color2[index] - color));
}

function getSexColor(percentageDifference) {


  if (percentageDifference <= 0) {
    percentageDifference = percentageDifference <-7 ? -7 : percentageDifference;
    return `rgb(${interpolateInverse(black, boyishBlue,  percentageDifference*10 ).join(',')})`;
  } else {
    percentageDifference = percentageDifference > 7 ? 7 : percentageDifference;
    return `rgb(${interpolate(black, girlishPink,  percentageDifference*15 ).join(',')})`;
  }
}

function getAgeColor(percentageDifference) {

  if (percentageDifference <= 0) {
    return `rgb(${interpolateInverse(black, boyishBlue,  percentageDifference/5 ).join(',')})`;
  } else {
    return `rgb(${interpolate(black, oldishOrange,  percentageDifference/5 ).join(',')})`;
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
      let result = await fetch(`${baseUrl}/data/wordcloud?column=${wordColumn}`).then(resp => resp.json()); 
      let sex_demographics = await fetch(`${baseUrl}/data/demographics?column=sex`).then(resp => resp.json()); 
      let age_demographics = await fetch(`${baseUrl}/data/avgAge`).then(resp => resp.json()); 

      let avgAge = age_demographics[0].averageAge;

      let maleTotalCount = sex_demographics[0].result.Male;
      let femaleTotalCount = sex_demographics[0].result.Female;

      let wordValues = []
      result.forEach((word) => wordValues.push(word.value));

      let normalizedValues = normalizeNumbers(wordValues);

      let minSize = 20;
      let maxSize = 160;

      result.forEach((word, i) => {
        word.frequency = word.value;
        word.percentage = (word.frequency / (maleTotalCount + femaleTotalCount)).toLocaleString(undefined, { style: 'percent' });
        
        word.value = (normalizedValues[i] * (maxSize)) < minSize ? minSize : (normalizedValues[i] * (maxSize));

        word.percentageFemale = (word.FemaleCount / femaleTotalCount)
        word.percentageMale = (word.MaleCount / maleTotalCount)

        word.sexPercentDifference = (word.percentageFemale - word.percentageMale);

        word.ageDifference = (word.averageAge - avgAge);

        const significant = 0.0513;
        const highlySignificant = 0.0674;

        if(Math.abs(word.sexPercentDifference) > highlySignificant) {
          word.pValue = "p<.01"
        }else if(Math.abs(word.sexPercentDifference) > significant) {
          word.pValue = "p<.05"
        }else{
          word.pValue = "n.s."
        }
        
        // console.log(ageDifference)
          
      });

      
      setData(result);

      if(hypothesis == "Gender") {
        setCallbacks( {
          getWordColor:  word => getSexColor(word.sexPercentDifference),
          // onWordClick: console.log,
          // onWordMouseOver: console.log,
          getWordTooltip: word => `"${word.text}", f: ${word.percentageFemale.toLocaleString(undefined, { style: 'percent' })} m: ${word.percentageMale.toLocaleString(undefined, { style: 'percent' })}, ${word.pValue}`,
        })

      }else if(hypothesis == "Age") {
        setCallbacks( {
          getWordColor:  word => getAgeColor(word.ageDifference),
          // onWordClick: console.log,
          // onWordMouseOver: console.log,
          getWordTooltip: word => `"${word.text}", mean age: ${Math.round(word.averageAge)}`,
        })

      }else{
        setCallbacks( {
          getWordColor:  word => getThemeColor(tab),
          // onWordClick: console.log,
          // onWordMouseOver: console.log,       
          getWordTooltip: word => `"${word.text}", count: ${word.frequency} (${word.percentage})`,
        })
      }

      setOptions( {
        rotations: 2,
        rotationAngles: [0],
        fontSizes: [minSize, maxSize],
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
