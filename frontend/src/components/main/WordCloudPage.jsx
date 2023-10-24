import WordCloudPageStyle from "./WordCloudPage.module.css";
import { useState, useEffect } from "react";
import CustomWordCloud from "../visualization/CustomWordCloud";
import { baseUrl } from "../../config";

const questions = {
    "Word":"Write as many associations as you can with the word TRUST",
    "Brand":"Think of a BRAND you trust and write as many associations as you can with it",
    "Person":"Think of a person you TRUST and write as many associations as you can with that PERSON",
    "Self":"Now, think about yourself, why should others trust YOU? People should trust me because I am…",
  }

export default function WordCloudPage({ tab, hypothesis }) {
    
    return (
        <div className={WordCloudPageStyle.wordcloudPage}>

            <div className="columnTitle">{questions[tab]}</div>
            <CustomWordCloud tab={tab} hypothesis={hypothesis}/>
            
        </div>
    );
}

