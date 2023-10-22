import './App.css'
import Sidebar from './components/Sidebar.jsx'
import Main from './components/Main.jsx'
import { useState } from 'react';

export default function App() {

  const [tab, setTab] = useState("Word");

  return (
    <div className="dashboard-container" style={{display:"flex"}}>
      <Sidebar setTab={setTab}/>
      <Main tab={tab}/>
    </div>
  )
}