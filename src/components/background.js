import React from "react"
import "./BackgroundCss.css"
import Chat from "./Chat"
import { useState } from "react"
import generateResponse from "./Generator"

function Background() {
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState("")
    const [chats, setChats] = useState([])
    const Submission = (e) => {
        if (input === "") {
            return
        }
        if (e.key === "Enter") {
            handleEnterPress()
        }
    }
    async function handleEnterPress() {
        if (loading) {
            return
        }
        setLoading(true)
        setChats([...chats, { message: input, name: "User" }])

        const response = await generateResponse(input)
        setChats([
            ...chats,
            { message: input, name: "User" },
            { message: response, name: "Bot" },
        ])

        setInput("")
        const inputObj = document.querySelector("input")
        inputObj.value = ""
        setLoading(false)
    }
    return (
        <section className="fullBackground">
            <div className="chatArea">
                {chats.map((chat, index) => (
                    <Chat key={index} message={chat.message} name={chat.name} />
                ))}
                <input
                    type="text"
                    placeholder="Write Something.."
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                    onKeyDown={Submission}
                ></input>
            </div>
        </section>
    )
}
export default Background
