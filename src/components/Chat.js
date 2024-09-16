import React from "react"
import "./Chatstyle.css"

export default function Chat(props) {
    return (
        <div className="chats">
            <div className="Avatar"></div>
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
