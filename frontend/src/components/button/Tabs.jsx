import TabsStyle from "./Tabs.module.css";
import GlowButton from "../button/GlowButton";

export default function Tabs({ hypothesis, setHypothesis }) {

    return (
        <div className={TabsStyle.tabs}>
            <GlowButton
            color={"rgb(1, 221, 118)"} 
            active={hypothesis==="Gender"} 
            onClick={()=> setHypothesis("Gender")}
            > <h3 className="subtitle-topbar"> Gender </h3>  </GlowButton>

            <h3 className="subtitle-topbar"> | </h3>

            <GlowButton 
                color={"rgb(1, 221, 118)"} 
                active={hypothesis==="Overview"} 
                onClick={()=> setHypothesis("Overview")}
            > <h3 className="subtitle-topbar"> Overview </h3>  </GlowButton>

            <h3 className="subtitle-topbar"> | </h3>

            <GlowButton 
                color={"rgb(1, 221, 118)"} 
                active={hypothesis==="Age"} 
                onClick={()=> setHypothesis("Age")}
            > <h3 className="subtitle-topbar"> Age </h3>  </GlowButton>
        </div>

    );

}