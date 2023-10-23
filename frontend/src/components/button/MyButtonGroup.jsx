import GlowButton from './GlowButton';
import MyButtonGroupStyle from './MyButtonGroup.module.css'

function MyButtonGroup( { hypothesis, setHypothesis } ) {

  let style = {width:"100px", textAlign:"center"}

  return (
    <div className={MyButtonGroupStyle.group}>
      <GlowButton 
      children={"Gender"} 
      color={"rgb(1, 221, 118)"} 
      active={hypothesis==="Gender"} 
      onClick={()=> setHypothesis("Gender")}
      />

      <GlowButton 
          children={"Overview"} 
          color={"rgb(1, 221, 118)"} 
          active={hypothesis==="Overview"} 
          onClick={()=> setHypothesis("Overview")}
      />

      <GlowButton 
          children={"Age"} 
          color={"rgb(1, 221, 118)"} 
          active={hypothesis==="Age"} 
          onClick={()=> setHypothesis("Age")}
      />
    </div>

  );
}

export default MyButtonGroup;