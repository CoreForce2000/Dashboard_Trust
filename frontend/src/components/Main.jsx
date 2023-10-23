import React, { useEffect, useState } from 'react';
import CustomWordCloud from "./visualization/CustomWordCloud";
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import GlowButton from "./button/GlowButton";
import DemographicBarchart from "./visualization/DemographicBarchart";
import Card from "./main/Card";
import Inlay from "./main/Inlay";
import MainStyle from './Main.module.css';


export default function Main({ hypothesis }) {

  const [tab, setTab] = useState("Word");

  const questions = {
    "Word":"Q1: Write as many associations as you can with the word TRUST",
    "Person":"Q5: Think of a BRAND you trust and write as many associations as you can with it",
    "Brand":"Q3: Think of a person you TRUST and write as many associations as you can with that PERSON",
    "Self":"Q7: Now, think about yourself, why should others trust YOU? People should trust me because I am…",
  }

  return (
    <div className={MainStyle.main}>
      <div className={MainStyle.wordcloud}>

        <ButtonGroup className={MainStyle.buttonGroup}>
          <div className={MainStyle.stretchButton}> <GlowButton children={<h3 className="title">{"Trust"}</h3>} color={"rgb(1, 137, 216)"} onClick={()=>setTab("Word")}/> </div>
          <div className={MainStyle.stretchButton}> <GlowButton children={<h3 className="title">{"Trust - Person"}</h3>} color={"rgb(1, 221, 118)"} onClick={()=>setTab("Person")}/> </div>
          <div className={MainStyle.stretchButton}> <GlowButton children={<h3 className="title">{"Trust - Brand"}</h3>} color={"rgb(218, 108, 64)"} onClick={()=>setTab("Brand")}/> </div>
          <div className={MainStyle.stretchButton}> <GlowButton children={<h3 className="title">{"Trust - Self"}</h3>} color={"rgb(200, 64, 218)"} onClick={()=>setTab("Self")}/> </div>
        </ButtonGroup>

        <Card title={questions[tab]}>
          <CustomWordCloud tab={tab} hypothesis={hypothesis}/>
        </Card>

      </div>

      {/* <Card title="Advanced Analytics" subtitle="" />
      <DemographicBarchart column="sex"/> */}
  
  </div>
  );
}
