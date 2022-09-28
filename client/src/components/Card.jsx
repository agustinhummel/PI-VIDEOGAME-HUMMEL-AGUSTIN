import React from "react";
import { Link } from "react-router-dom";
import '../style/card.css'


export default function Card({ id, name, image, genres }) {
    return (
        <div className="videogames">
            <Link to={`/videogames/${id}`} >
                <div className="genrescointainer" >
                    <img className="img" src={image} alt="img" />
                </div>
                <div className="namecointainer" >
                    <h2 className="gamesName">{name}</h2>
                </div>
                <div className="genrescointainer">
                    <h3 className="genres">{genres}</h3>
                </div>

            </Link>
        </div>
    )
}