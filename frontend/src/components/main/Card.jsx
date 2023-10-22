
let cardStyle = {
    borderRadius:"10px",
    margin:"7px",
    backgroundColor:"#21222D",
    padding: "25px 20px 25px 20px",
}

let titleStyle = {
    color:"white",
    fontSize:"20px",
}

let subtitleStyle = {
    color:"#87888C",
    fontSize:"17px",
}

export default function Card(props) {
    return (
      <div className="sidebar" style={cardStyle}>
        <div className="title" style={titleStyle}> {props.title} </div>
        <div className="subtitle" style={subtitleStyle}> {props.subtitle} </div>
        {props.children}
      </div>
    );
  }