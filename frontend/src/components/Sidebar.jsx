import SidebarStyle from './Sidebar.module.css';
import GlowButton from './button/GlowButton';


export default function Sidebar({ tab, setTab }) {
  return (
    <div className={SidebarStyle.sidebar}>
      <h3 className="title">In Other Words</h3>

      <GlowButton
        color={"rgb(1, 221, 118)"} 
        active={tab === "Word"} 
        onClick={() => setTab("Word")}
      > <h3 className='subtitle-left'> Trust </h3> </GlowButton>

      <GlowButton 
        color={"rgb(1, 221, 118)"} 
        active={tab === "Person"} 
        onClick={() => setTab("Person")}
        > <h3 className='subtitle-left'> Trusted Person </h3> </GlowButton>
      
      <GlowButton 
        color={"rgb(1, 221, 118)"} 
        active={tab === "Brand"} 
        onClick={() => setTab("Brand")}
        > <h3 className='subtitle-left'> Trusted Brand </h3> </GlowButton>
    </div>
  );
}