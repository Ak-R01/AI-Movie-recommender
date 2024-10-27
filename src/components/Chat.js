import React from "react"
import "./Chatstyle.css"
import user from "../images/user-image.png"
import bot from "../images/Bot.jpeg"
import Movie from "./Movie"
import "animate.css"

export default function Chat(props) {
    const { name, message, props: movieProps } = props
    const isUser = props.name === "User"
    const chatClass = isUser ? "userChat" : "botChat"
    if (movieProps?.Movie_1_T) {
        return (
            <>
                <Movie
                    Movie_1_T={movieProps.Movie_1_T}
                    Movie_2_T={movieProps.Movie_2_T}
                    Movie_3_T={movieProps.Movie_3_T}
                    Movie_1_D={movieProps.Movie_1_D}
                    Movie_2_D={movieProps.Movie_2_D}
                    Movie_3_D={movieProps.Movie_3_D}
                />
            </>
        )
    }
    if (!isUser) {
        return (
            <div
                className={`chats ${chatClass} animate__animated animate__fadeIn`}
            >
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
        <div className={`chats ${chatClass} animate__animated animate__fadeIn`}>
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
