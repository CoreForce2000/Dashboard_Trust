import LegendStyle from "./Legend.module.css";

function Legend({ names, colors }) {
    const legendItems = [];

    for (let i = 0; i < names.length; i++) {

        let legendStyle = LegendStyle.legendItem;
        if(i==0) {
            legendStyle = LegendStyle.legendItemLeft;
        }else if(i==names.length-1) {
            legendStyle = LegendStyle.legendItemRight;
        }

        legendItems.push(
            <div className={legendStyle} style={{ backgroundColor: colors[i] }}>
                {names[i]}
            </div>
        );
    }

    return <div className={LegendStyle.legend}>{legendItems}</div>;
}

export default Legend;