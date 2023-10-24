import TopbarStyle from "./Topbar.module.css";
import { useState, useEffect } from "react";
import GlowButton from "../button/GlowButton";
import { baseUrl } from "../../config";
import Infotext from "../visualization/Infotext";
import Tabs from "../button/Tabs";
import Legend from "../visualization/Legend";

export default function Topbar({ hypothesis, setHypothesis }) {

    
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
        <div className={TopbarStyle.topbar}>

            <div className={TopbarStyle.info}><Infotext hypothesis={hypothesis}></Infotext></div>
            <Tabs hypothesis={hypothesis} setHypothesis={setHypothesis}></Tabs>
            {/* <div className={TopbarStyle.legend}> {legend[hypothesis]} </div> */}
        </div>
    );

}
    
