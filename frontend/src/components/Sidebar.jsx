import SidebarStyle from './Sidebar.module.css';
import GlowButton from './button/GlowButton';


export default function Sidebar({setTab}) {
    return (
      <div className={SidebarStyle.sidebar}>
        <h3 className="title">In Other Words</h3>

          <GlowButton children={"Trust"} color={"rgb(1, 221, 118)"} onClick={()=>setTab("Word")}/>
          <GlowButton children={"Trusted Person"} color={"rgb(1, 221, 118)"} onClick={()=>setTab("Person")}/>
          <GlowButton children={"Trusted Brand"} color={"rgb(1, 221, 118)"} onClick={()=>setTab("Brand")}/> 
          {/* <GlowButton children={<h3 className="title">{"Trust Me"}</h3>} color={"rgb(200, 64, 218)"} onClick={()=>setTab("Self")}/> */}
        
      </div>
    );
  }