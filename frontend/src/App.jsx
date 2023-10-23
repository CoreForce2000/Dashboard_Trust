import './App.css'
import Sidebar from './components/Sidebar.jsx'
import Main from './components/Main.jsx'
import { useState } from 'react';

export default function App() {

  const [hypothesis, setHypothesis] = useState("Overview");

  
  console.log(hypothesis)


  return (
    <div className="dashboard-container">
      <Sidebar setHypothesis={setHypothesis}/>
      <Main hypothesis={hypothesis}/>
    </div>
  )
}