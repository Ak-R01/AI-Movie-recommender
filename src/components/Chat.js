import React from "react"
import "./Chatstyle.css"
import user from "../images/user-image.png"
import bot from "../images/Bot.jpeg"

export default function Chat(props) {
    const isUser = props.name === "User"
    const chatClass = isUser ? "userChat" : "botChat"
    if (!isUser) {
        return (
            <div className={`chats ${chatClass}`}>
                <div className="Avatar">
                    <img src={bot} alt="User"></img>
                </div>
                <div className="userInfo">
                    <div className="userName">
                        <h4>{props.name}</h4>
                    </div>
                    <div className="userMessage">
                        <p>{props.message}</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={`chats ${chatClass}`}>
            <div className="userInfo">
                <div className="userName">
                    <h4>{props.name}</h4>
                </div>
                <div className="userMessage">
                    <p>{props.message}</p>
                </div>
            </div>
            <div className="Avatar">
                <img src={user} alt="USer"></img>
            </div>
        </div>
    )
}
