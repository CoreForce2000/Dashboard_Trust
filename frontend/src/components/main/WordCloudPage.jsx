import WordCloudPageStyle from "./WordCloudPage.module.css";
import { useState, useEffect } from "react";
import CustomWordCloud from "../visualization/CustomWordCloud";
import MyButtonGroup from "../button/MyButtonGroup";
import { baseUrl } from "../../config";

const questions = {
    "Word":"Write as many associations as you can with the word TRUST",
    "Brand":"Think of a BRAND you trust and write as many associations as you can with it",
    "Person":"Think of a person you TRUST and write as many associations as you can with that PERSON",
    "Self":"Now, think about yourself, why should others trust YOU? People should trust me because I am…",
  }

export default function WordCloudPage({ tab }) {
    
    const [hypothesis, setHypothesis] = useState("Overview");
    const [loading, setLoading] = useState(true); // Add this state to track loading
    const [text, setText] = useState("");

    const fetchData = async (hypothesis) => {
        try {
            setLoading(true); // Set loading to true when starting to fetch
            
            let text = "";
            if(hypothesis == "Age") {
                let averageAge = await fetch(`${baseUrl}/data/avgAge`).then(resp => resp.json());
                averageAge = Math.round(averageAge[0].averageAge)
                text = `Population is on average ${averageAge} years old`                
            } else if (hypothesis == "Gender") {
                let valuecountSex = await fetch(`${baseUrl}/data/demographics?column=sex`).then(resp => resp.json());
                valuecountSex = valuecountSex[0].result
                text = `Sample Men: ${valuecountSex.Male} - Sample Women: ${valuecountSex.Female}`
            } else {
                let valuecountSex = await fetch(`${baseUrl}/data/demographics?column=sex`).then(resp => resp.json());
                console.log(valuecountSex)
                valuecountSex = valuecountSex[0].result
                text = `Sample size: ${valuecountSex.Male + valuecountSex.Female}`
            }
            
            setText(text);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false once fetching is complete
        }
      };
    
      useEffect(() => {
            fetchData(hypothesis);
      }, [hypothesis]);

    return (
        <div className={WordCloudPageStyle.wordcloudPage}>

            <div className="columnTitle">{questions[tab]}</div>


            {loading ? (
                    <></>
                ) : (
                    <div style={{padding:"20px"}}>{text}</div>
            )}
            <CustomWordCloud tab={tab} hypothesis={hypothesis}/>
            
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <MyButtonGroup hypothesis={hypothesis} setHypothesis={setHypothesis}></MyButtonGroup>
            </div>

        </div>
    );

}

