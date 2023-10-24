import MainStyle from './Main.module.css';
import Legend from './visualization/Legend';

import Topbar from './main/Topbar';
import WordCloudPage from './main/WordCloudPage';
import WordDetailsPage from './main/WordDetailsPage';


import { useState } from 'react';

export default function Main({ tab }) {
  const [hypothesis, setHypothesis] = useState("Overview");

  return (
    <div className={MainStyle.main}>
      <Topbar hypothesis={hypothesis} setHypothesis={setHypothesis}></Topbar>
      <div className={MainStyle.mainGrid}>
        <WordCloudPage tab={tab} hypothesis={hypothesis}/>
        <WordDetailsPage tab={tab}  hypothesis={hypothesis}/>
      </div>
  
  </div>
  );
}
