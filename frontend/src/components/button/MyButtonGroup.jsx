import Pagination from 'react-bootstrap/Pagination';

function MyButtonGroup( { hypothesis, setHypothesis } ) {

  let style = {width:"100px", textAlign:"center"}

  return (
    <Pagination data-bs-theme="dark">
      <Pagination.Item style={style} key={1} active={hypothesis==="Gender"} onClick={()=> setHypothesis("Gender")}>Gender</Pagination.Item>
      <Pagination.Item style={style}key={2} active={hypothesis==="Overview"} onClick={()=> setHypothesis("Overview")}>Overview</Pagination.Item>
      <Pagination.Item style={style}key={3} active={hypothesis==="Age"} onClick={()=> setHypothesis("Age")}>Age</Pagination.Item>

    </Pagination>
  );
}

export default MyButtonGroup;