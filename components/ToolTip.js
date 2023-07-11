"use client";
import { useState } from "react";

export default function Tooltip({ text, position, children }) {
    const [active, setActive] = useState(false);
    const handleMouseOver = () => {
        setActive(true);
    }

    return (
        <div className="projectCard flex" onMouseOver={() => handleMouseOver()} onMouseOut={() => setActive(false)}>
            {children}
            {active === true && <div style={{ marginTop: 30, backgroundColor: '#000000', width: 'auto', height: '200vh' }}>{text}</div>}
        </div>
    )
}