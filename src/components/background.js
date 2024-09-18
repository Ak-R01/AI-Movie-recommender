import React from "react"
import "./BackgroundCss.css"
import Chat from "./Chat"
import { useState, useRef, useEffect } from "react"
import generateResponse from "./Generator"
import "animate.css"

function Background() {
    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState("")
    const [chats, setChats] = useState([])
    const chatAreaRef = useRef(null)

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
        try {
            const response = await generateResponse(input)
            setChats([
                ...chats,
                { message: input, name: "User" },
                { message: response, name: "Bot" },
            ])
        } catch {
            setChats([
                ...chats,
                { message: input, name: "User" },
                {
                    message: "Something Went Wrong! Please Try again later.",
                    name: "Bot",
                },
            ])
        }
        setInput("")
        const inputObj = document.querySelector("input")
        inputObj.value = ""
        setLoading(false)
    }
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight
        }
    }, [chats])
    return (
        <section className="fullBackground">
            <div className="chatAreaWrapper">
                <div className="chatArea" ref={chatAreaRef}>
                    {chats.map((chat, index) => (
                        <Chat
                            key={index}
                            message={chat.message}
                            name={chat.name}
                        />
                    ))}
                </div>
            </div>
            <div className="inputBox">
                <input
                    type="text"
                    placeholder="Write Something.."
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                    onKeyDown={Submission}
                ></input>
                <button className="outputButton" onClick={handleEnterPress}>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon-2xl"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </button>
            </div>
        </section>
    )
}
export default Background
