import React from "react";
import { Link } from "react-router-dom";
import '../style/landing.css'



export default function LandingPage() {
    return (
        <div className="landing">
            <h1 className="welcomeMsg">WELCOME FROM VIDEOGAMES APP</h1>
            <Link to="/home">
                <button className="homeButton">LET'S GO</button>
            </Link>
        </div>
    )
}