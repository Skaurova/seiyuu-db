"use client"

import React, { useState } from "react"
import ComponentLoader from "@/components/ComponentLoader"
import ButtonMain from "@/components/ui/Button"

export default function TestingPage() {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);

    function handleClick() {
        setLoading(true);
        setCount(prev => prev + 1)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
          }}>
            <h1>Testing Page</h1>
            {loading && <ComponentLoader/>}
            <p>Button clicked {count} times.</p>
            <ButtonMain onClick={handleClick} className="custom-test-btn" style={{backgroundColor: "var(--main-color)"}} >Click Me</ButtonMain>
        </div>
    )
}