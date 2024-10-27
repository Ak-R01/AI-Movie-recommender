import React from "react"
import "./Moviecss.css"

function Movie(props) {
    return (
        <div className="Movie">
            <div className="movieContainer">
                <h1>{props.Movie_1_T}</h1>
                <p>{props.Movie_1_D}</p>
            </div>
            <div className="movieContainer">
                <h1>{props.Movie_2_T}</h1>
                <p>{props.Movie_2_D}</p>
            </div>
            <div className="movieContainer">
                <h1>{props.Movie_3_T}</h1>
                <p>{props.Movie_3_D}</p>
            </div>
        </div>
    )
}

export default Movie
