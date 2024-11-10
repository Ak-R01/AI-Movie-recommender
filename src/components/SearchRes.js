import React from "react"
import hulu from "../images/hulu-Green-digital.png"
import netflix from "../images/Netflix_Symbol_RGB.png"
import prime from "../images/amazon_prime_logo_brand_icon.png"
import appletv from "../images/apple.png"
import hotstar from "../images/hotstar.jpeg"

function SearchRes(props) {
    // State hooks to control visibility of each service
    const showNetflix = props.netflix
    const showPrime = props.prime
    const showAppleTV = props.appletv
    const showHulu = props.hulu
    const showHotstar = props.hotstar

    return (
        <div className="Services">
            {showNetflix && (
                <div className="service-item">
                    <img src={netflix} alt="Netflix" />
                </div>
            )}
            {showPrime && (
                <div className="service-item">
                    <img src={prime} alt="Prime Video" />
                </div>
            )}
            {showHotstar && (
                <div className="service-item">
                    <img src={hotstar} alt="Hotstar" />
                </div>
            )}
            {showAppleTV && (
                <div className="service-item">
                    <img src={appletv} alt="Apple TV" />
                </div>
            )}
            {showHulu && (
                <div className="service-item">
                    <img src={hulu} alt="Hulu" />
                </div>
            )}
        </div>
    )
}

export default SearchRes
