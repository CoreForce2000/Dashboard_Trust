import React, { useEffect, useRef } from 'react';
import GlowButtonStyle from './GlowButton.module.css';


// const GlowButton = ({ children, color, active, onClick }) => {
//     const divRef = useRef();
    
//     useEffect(() => {
//         if (divRef.current) {
//             divRef.current.style.setProperty('--glow-color', color);
//         }
//     }, [color]);

    
//     return (
//         <div tabindex="0" 
//             ref={divRef} 
//             className={GlowButtonStyle.glowButton} 
//             onClick={onClick}>

//             {children}
//         </div>
//     );
// };

// export default GlowButton;
