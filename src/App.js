import React, { useState } from "react"
import "./App.css"
import Background from "./components/background"
import Availability from "./components/Availability"

function App() {
    // State to track the checkbox toggle
    const [isChecked, setIsChecked] = useState(false)

    // Handler to toggle the state
    const handleToggle = () => {
        setIsChecked((prev) => !prev)
    }

    return (
        <>
            {/* Conditionally render Background component based on isChecked */}
            {!isChecked && <Background />}
            {isChecked && <Availability />}

            <input
                type="checkbox"
                id="checkboxInput"
                checked={isChecked}
                onChange={handleToggle}
            />
            <label htmlFor="checkboxInput" className="toggleSwitch"></label>
        </>
    )
}

export default App
