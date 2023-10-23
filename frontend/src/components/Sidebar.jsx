import SidebarStyle from './Sidebar.module.css';
import GlowButton from './button/GlowButton';


export default function Sidebar({setTab}) {
    return (
      <div className={SidebarStyle.sidebar}>
        <h3 className="title">In Other Words:</h3>


          <GlowButton children={<h3 className="title">{"'Trust'"}</h3>} color={"rgb(1, 137, 216)"} onClick={()=>setTab("Word")}/>
          <GlowButton children={<h3 className="title">{"Trusted Person"}</h3>} color={"rgb(1, 221, 118)"} onClick={()=>setTab("Person")}/>
          <GlowButton children={<h3 className="title">{"Trusted Brand"}</h3>} color={"rgb(218, 108, 64)"} onClick={()=>setTab("Brand")}/> 
          <GlowButton children={<h3 className="title">{"Trust Me"}</h3>} color={"rgb(200, 64, 218)"} onClick={()=>setTab("Self")}/>
        
      </div>
    );
  }