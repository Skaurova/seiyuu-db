"use client";

import React from "react"
import '../../styles/components/ButtonMain.css';

interface ButtonProps {
    children: React.ReactNode;
    onClick?:() => void;
    className?: string;
    style?: React.CSSProperties;
}

export default function ButtonMain({ children, onClick, className, style }: ButtonProps) {
    return (
        <button onClick ={onClick} className={`button-main ${className ?? ''}`} style={{ fontWeight: 600, ...style }}>
            {children}
        </button>
    )
}