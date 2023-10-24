import TopbarStyle from "./Topbar.module.css";
import { useState, useEffect } from "react";
import GlowButton from "../button/GlowButton";
import { baseUrl } from "../../config";
import Infotext from "../visualization/Infotext";
import Tabs from "../button/Tabs";
import Legend from "../visualization/Legend";

export default function Topbar({ hypothesis, setHypothesis }) {

    return (
        <div className={TopbarStyle.topbar}>

            <div className={TopbarStyle.info}><Infotext hypothesis={hypothesis}></Infotext></div>
            <Tabs hypothesis={hypothesis} setHypothesis={setHypothesis}></Tabs>
        </div>
    );

}
    
