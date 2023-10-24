import WordCloudPageStyle from "./WordCloudPage.module.css";
import { useState, useEffect } from "react";
import CustomWordCloud from "../visualization/CustomWordCloud";
import { baseUrl } from "../../config";
import Legend from "../visualization/Legend";

const questions = {
    "Word":"Write as many associations as you can with the word TRUST",
    "Brand":"Think of a BRAND you trust and write as many associations as you can with it",
    "Person":"Think of a person you TRUST and write as many associations as you can with that PERSON",
    "Self":"Now, think about yourself, why should others trust YOU? People should trust me because I am…",
  }

export default function WordCloudPage({ tab, hypothesis }) {
    
    const sexColors = [
        "rgb(166, 25, 183)",
        "rgb(130, 68, 169)",
        "rgb(1, 180, 96)",
        "rgb(1, 117, 196)",
        "rgb(0, 87, 221)"
    ]

    const ageColors = [
        "rgb(30, 88, 196)",
        "rgb(1, 180, 96)",
        "rgb(212, 106, 34)"
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
        <div className={WordCloudPageStyle.wordcloudPage}>

            <div className="columnTitle">
                <div className="columnText">{questions[tab]}</div>
            </div>
            <div className={WordCloudPageStyle.wordCloudDiv}>
                <CustomWordCloud tab={tab} hypothesis={hypothesis}/>
                {legend[hypothesis]}
            </div>
            
        </div>
    );
}

