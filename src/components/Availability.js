import React from "react"
import "./Availability.css"
import SearchRes from "./SearchRes"
import { useState } from "react"
import show_avail from "./Shows_Avail"
function Availability() {
    const [show, setShow] = useState(false)
    const [input, setInput] = useState("")
    const [netflix, setNetflix] = useState(false) // Default values set to true
    const [apple, setApple] = useState(false)
    const [hotstar, setHotstar] = useState(false)
    const [prime, setPrime] = useState(false)
    const [hulu, setHulu] = useState(false)

    async function handleSubmit(e) {
        if (e.key === "Enter") {
            setShow(true)
            const { n, a, p, h, hu } = await show_avail(input)
            if (!n && !a && !p && !h && !hu) {
                alert("No Information Found")
                setShow(false)
            }
            setNetflix(n)
            setApple(a)
            setPrime(p)
            setHotstar(h)
            setHulu(hu)
            // console.log({ n, a, p, h, hu })
            setInput("")
            const inputElement = document.querySelector("#availInput")
            inputElement.value = ""
        }
    }
    return (
        <div id="fullBackground">
            <h1 id="headingForSearch">Check For Movie Availability</h1>
            <input
                id="availInput"
                type="text"
                onChange={(e) => {
                    setInput(e.target.value)
                }}
                onKeyDown={handleSubmit}
            ></input>
            {show && (
                <SearchRes
                    netflix={netflix}
                    hotstar={hotstar}
                    appletv={apple}
                    prime={prime}
                    hulu={hulu}
                />
            )}
        </div>
    )
}

export default Availability
