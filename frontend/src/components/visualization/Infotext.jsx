import { useState, useEffect } from "react";
import { baseUrl } from "../../config";

export default function HorizontalBarChart({ hypothesis }) {
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
                text = `Sample men: ${valuecountSex.Male} | Sample women: ${valuecountSex.Female}`
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
        <div style={{padding:"20px"}}>
            {loading ? (
                <></>
            ) : (
                <>{text}</>
            )}
        </div>
        
      );
}
    