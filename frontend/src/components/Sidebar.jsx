import SidebarStyle from './Sidebar.module.css';
import GlowButton from './button/GlowButton';
import { useState } from 'react';

export default function Sidebar({ tab, setTab }) {

  const visible = "block";

  const [wordVisibile, setWordVisible] = useState(visible);
  const [personVisibile, setPersonVisible] = useState("none");
  const [brandVisibile, setBrandVisible] = useState("none");

  return (
    <div className={SidebarStyle.sidebar}>
      <h3 className="title">In Other Words</h3>

      <div className='text' style={{paddingTop:"57px"}}> This study explored the use of word-associations to describe trust across different contexts such as brands and personal relationships with a focus on variations by gender and age</div>

      <GlowButton
        color={"rgb(1, 221, 118)"} 
        active={tab === "Word"} 
        onClick={() =>{ setTab("Word"); setWordVisible(visible); setPersonVisible("none"); setBrandVisible("none")}}
      > <h3 className='subtitle-left'> Trust </h3> </GlowButton>

      <div className='text' style={{display: wordVisibile}}> What are the first words that spring to mind when participants hear the word trust?</div>

      <GlowButton 
        color={"rgb(1, 221, 118)"} 
        active={tab === "Person"} 
        onClick={() => {setTab("Person"); setWordVisible("none"); setPersonVisible(visible); setBrandVisible("none")}}
        > <h3 className='subtitle-left'> Trusted Person </h3> </GlowButton>
      
      <div className='text' style={{display: personVisibile}}> What qualities do participants think of when tasked to think of someone they trust?</div>

      <GlowButton 
        color={"rgb(1, 221, 118)"} 
        active={tab === "Brand"} 
        onClick={() => {setTab("Brand"); setWordVisible("none"); setPersonVisible("none"); setBrandVisible(visible)}}
        > <h3 className='subtitle-left'> Trusted Brand </h3> </GlowButton>

      <div className='text' style={{display: brandVisibile}}> What features define trusted brands? </div>

    </div>
  );
}