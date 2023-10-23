import MainStyle from './Main.module.css';
import Legend from './visualization/Legend';

import WordCloudPage from './main/WordCloudPage';
import WordDetailsPage from './main/WordDetailsPage';

export default function Main({ tab }) {

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

      <WordCloudPage tab={tab}/>
      <WordDetailsPage tab={tab}/>
  
  </div>
  );
}
