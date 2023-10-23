import InlayStyle from "./Inlay.module.css";

export default function Inlay({ children }) {

    return (
      <div className={InlayStyle.inlay}>

        {children}
      </div>
    );
  }

