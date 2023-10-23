import React, { useEffect, useState } from 'react';
import CustomWordCloud from "./visualization/CustomWordCloud";
import ButtonGroup from './button/MyButtonGroup';
import GlowButton from "./button/GlowButton";
import DemographicBarchart from "./visualization/DemographicBarchart";
import Card from "./main/Card";
import Inlay from "./main/Inlay";
import MainStyle from './Main.module.css';
import Legend from './visualization/Legend';
import HorizontalBarChart from './visualization/HorizontalBarChart';

export default function Main({ tab }) {


  const [hypothesis, setHypothesis] = useState("Overview");

  const questions = {
    "Word":"Write as many associations as you can with the word TRUST",
    "Brand":"Think of a BRAND you trust and write as many associations as you can with it",
    "Person":"Think of a person you TRUST and write as many associations as you can with that PERSON",
    "Self":"Now, think about yourself, why should others trust YOU? People should trust me because I am…",
  }

  const sexColors = [
    "rgb(224, 54, 246)",
    "rgb(198, 98, 211)",
    "rgb(160, 160, 160)",
    "rgb(1, 117, 196)",
    "rgb(0, 87, 221)"
  ]

  const ageColors = [
    "rgb(224, 54, 246)",
    "rgb(121, 54, 246)",
    "rgb(0, 87, 221)"
  ]
  
  const legendHidden = <div style={{visibility:"hidden"}}><Legend names={[""]} colors={["#000"]}></Legend></div>
  const legendSex = <Legend names={[".01", ".05", "n.s.", ".05", ".01"]} colors={sexColors}></Legend>
  const legendAge = <Legend names={["18-37", "38-55", "56-88"]} colors={ageColors}></Legend>

  const legend = {
    "Overview":legendHidden,
    "Gender":legendSex,
    "Age":legendAge
  }

  


  return (
    <div className={MainStyle.main}>
      <div className={MainStyle.wordcloud}>

          {/* <GlowButton children={"Overview"} color={"white"} onClick={()=>setHypothesis("Overview")}/>
          <GlowButton children={"Gender"} color={"white"} onClick={()=>setHypothesis("Gender")}/>
          <GlowButton children={"Age"} color={"white"} onClick={()=>setHypothesis("Age")}/> */}


        {/* <Card title={questions[tab]}> */}
          {/* <div style={{display:"flex", justifyContent:"center", padding:"10px", fontSize:"31px"}}>{questions[tab]}</div> */}
          <div className={MainStyle.instructionDiv}>
            <div className="instructionTitle">{questions[tab]}</div>
          </div>

          <div style={{display:"flex", flexGrow:1, color:"white"}}>
            <CustomWordCloud tab={tab} hypothesis={hypothesis}/>
          </div>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <ButtonGroup hypothesis={hypothesis} setHypothesis={setHypothesis}></ButtonGroup>

          </div>

          <HorizontalBarChart></HorizontalBarChart>
          
        {/* </Card> */}

      </div>


      {/* <Card title="Advanced Analytics" subtitle="" />
      <DemographicBarchart column="sex"/> */}
  
  </div>
  );
}
