import CardStyle from "./Card.module.css";

export default function Card({ title, subtitle, children }) {

    return (
      <div className={CardStyle.card}>
        <div className={CardStyle.title}> {title} </div>
        <div className={CardStyle.subtitle}> {subtitle} </div>

        {children}
      </div>
    );
  }

