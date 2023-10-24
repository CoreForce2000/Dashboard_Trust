import WordDetailsPageStyle from "./WordDetailsPage.module.css";
import HorizontalBarChart from "../visualization/HorizontalBarChart";

import { useState, useEffect } from "react";
import { baseUrl } from "../../config";

const questions = {
    "Word":"Who did you think of anyone while answering this question?",
    "Brand":"Provide the name of a BRAND you thought of",
    "Person":"What is your relationship to the PERSON from the previous question?"
  }

export default function WordCloudPage({ tab, hypothesis }) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Add this state to track loading

    const fetchData = async (tab, hypothesis) => {
        try {
            setLoading(true); // Set loading to true when starting to fetch

            let columnName = "";
            if(tab == "Word") {
                columnName = "WORD_person";
            } else if(tab == "Person") {
                columnName = "PERSON_relationship";
            } else if(tab == "Brand") {
                columnName = "BRAND_name";
            }
            
            let query = "";
            if(hypothesis == "Age") {
                query = "valuecountAge"
            } else if(hypothesis == "Gender") {
                query = "valuecountSex"
            } else {
                query = "valuecount"
            }

            let data = await fetch(`${baseUrl}/data/${query}?column=${columnName}`).then(resp => resp.json()); 

            setData(data);


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
        <div className={WordDetailsPageStyle.wordDetailPage}>
            <div className={WordDetailsPageStyle.column}>
                <div className="columnTitle">{questions[tab]}</div>
                {loading ? (
                <></>
                ) : (
                    <HorizontalBarChart data={data} hypothesis={hypothesis}/>
                )}
                
            </div>
        </div>
    )
}