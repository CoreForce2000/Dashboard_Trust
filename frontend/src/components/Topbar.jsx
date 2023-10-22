import Card from "./Card";

let topbarStyle = {
    marginBottom:"20px",
    marginTop:"20px"
}


export default function Topbar() {
    return (
        <div className="sidebar" style={topbarStyle}>
            <Card title="Trust Dashboard" />
        </div>
    );
}
