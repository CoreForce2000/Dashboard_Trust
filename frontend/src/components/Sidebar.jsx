import SidebarStyle from './Sidebar.module.css';


export default function Sidebar({setTab}) {
    return (
      <div className={SidebarStyle.sidebar}>
        <h3 className={SidebarStyle.title}>Trust Study</h3>
        <div className={SidebarStyle.buttonWord} onClick={()=>setTab("Word")}>Word</div>
        <div className={SidebarStyle.buttonPerson} onClick={()=>setTab("Person")}>Person</div>
        <div className={SidebarStyle.buttonBrand} onClick={()=>setTab("Brand")}>Brand</div>
        <div className={SidebarStyle.buttonSelf} onClick={()=>setTab("Self")}>Self</div>
      </div>
    );
  }