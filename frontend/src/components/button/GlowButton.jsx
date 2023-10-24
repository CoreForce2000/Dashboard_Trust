import React, { useEffect, useRef } from 'react';
import './GlowButton.css'; // make sure to import your CSS file
// import GlowButtonStyle from './GlowButton.module.css';

const GlowButton = ({ children, color, active, onClick, width }) => {
    const divRef = useRef();
    
    useEffect(() => {
        if (divRef.current) {
            divRef.current.style.setProperty('--glow-color', color);
        }
    }, [color]);
    
    return (
        <div 
            tabindex="0" 
            style={{width: width}}
            ref={divRef} 
            className={`glowButton ${active ? 'active' : ''}`} // Apply 'active' class conditionally
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default GlowButton;
