import SidebarStyle from './Sidebar.module.css';
import GlowButton from './button/GlowButton';


export default function Sidebar({setHypothesis}) {
    return (
      <div className={SidebarStyle.sidebar}>
        <h3 className="title">In Other Words:</h3>
          <GlowButton children={"Overview"} color={"white"} onClick={()=>setHypothesis("Overview")}/>
          <GlowButton children={"H3: Gender"} color={"white"} onClick={()=>setHypothesis("Gender")}/>
          <GlowButton children={"H4: Age"} color={"white"} onClick={()=>setHypothesis("Age")}/>
      </div>
    );
  }