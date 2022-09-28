import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions";
import { Link } from "react-router-dom";
import Loading from "./Loading";

import '../style/detail.css';


export default function Details(id) {
    const games = useSelector(state => state.gamesDetail);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch])


    return (
        <div>
            {games?.id ? (
                <div className="details">
                    <div className="ddsh">
                        <h1 className="name">{games.name} </h1>
                    </div>
                    <div className="ddsh">
                        <img className="detailImg" src={games.image} alt="not found" />
                    </div>
                    <div className="ddsh">
                        <h2 className="texts">GENRE: {games.genres?.map((e) => e).join(", ")}</h2>
                    </div>
                    <div className="ddsh">
                        <h3 className="description">DESCRIPTION: {games.description} </h3>
                    </div>
                    <div className="ddsh">
                        <h2 className="dishesanddiets">RELASED: {games.released} </h2>
                    </div>
                    <div className="ddsh">
                        <h2 className="scores">RATING: {games.rating ? games.rating : 0} </h2>
                    </div>
                    <div className="ddsh">
                        <h2 className="dishesanddiets">PLATFORMS: {games.platforms.join(", ")}</h2>
                        <br></br>
                    </div >
                    <div className="ddsh">
                        <Link to="/home" className="backButton"> <p>Back to Home</p>  </Link>
                    </div>
                </div>
            ) : <Loading />}
        </div>
    );
}