import React from "react";
import { getVideogame, ratingSort, sortByName, filterByGenres, getGender, filterByCreated } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import Paginated from "./paginated";
import Card from "./Card";
import SearchBar from "./searchbar";
import '../style/home.css'
import { Link } from "react-router-dom";


export default function Home() {
    const getAllVideogame = useSelector((state) => state.videogames);
    const getAllVideogameFilter = useSelector((state) => state.filterByName)
    const allGenres = useSelector((state) => state.gender)


    const dispatch = useDispatch();

    const [order, setOrder] = useState('');

    const [page, setPage] = useState(1);
    const [forPage, setForPage] = useState(15);

    const max = Math.ceil(getAllVideogame.length / forPage);


    function handleRatingSort(e) {
        e.preventDefault();
        if (e.target.value === 'all') {
            dispatch(getVideogame())
            setPage(1)
            setOrder(`Order ${e.target.value}`);
        } else {
            dispatch(ratingSort(e.target.value));
            setPage(1)
            setOrder(`Order ${e.target.value}`);
        }
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setPage(1)
        setOrder(`Order ${e.target.value}`);

    }
    function handleGenresFilter(e) {
        e.preventDefault();
        dispatch(filterByGenres(e.target.value))
        setPage(1)
        setOrder(`Order ${e.target.value}`);
    }

    function handleVideogames(e) {
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
        setPage(1)
    }

    useEffect(() => {
        dispatch(getVideogame());
        dispatch(getGender());
    }, [dispatch])



    return (

        <div className="home">
            <div className="filter">
                <select className="filters" onChange={e => handleRatingSort(e)}>
                    <option value='all' > Rating Order </option>
                    <option value='best' >de Min a Max</option>
                    <option value='wrost' >de Max a Min </option>
                </select>
                <br></br>
                <select className="filters" onChange={e => handleGenresFilter(e)} >
                    <option value='All'>ALL</option>
                    {allGenres.map((e, i) => {
                        return (
                            <option value={e.name} key={i} >{e.name}</option>
                        )
                    })}
                </select>
                <br></br>
                <select className="filters" onChange={e => handleAlphabeticalSort(e)}>
                    <option value="all" >Alphabetical Order</option>
                    <option value='asc' >A - Z</option>
                    <option value='desc' >Z -A</option>
                </select>
                <br></br>
                <select className="filters" onChange={e => handleVideogames(e)}>
                    <option >Created in</option>
                    <option value='Api' >API</option>
                    <option value='Db' >DATA BASE</option>
                </select>
            </div>
            <div className="filter">
                <br></br>
                <SearchBar />
                <br></br>
            </div>
            <div >
                <Link to='/create'>
                    <button className="crearVideogame">Create VideoGame</button>
                </Link>
            </div>
            <div className="allvideogames">
                {getAllVideogameFilter.length > 0 ? getAllVideogameFilter.slice((page - 1) * forPage, (page - 1) * forPage + forPage).map((g, i) => (
                    <div className="eachVideogames" key={i}>
                        <Card id={g.id} name={g.name} image={g.image} genres={g.genres} />
                    </div>
                )) :
                    getAllVideogame.slice((page - 1) * forPage, (page - 1) * forPage + forPage).map((g, i) => (
                        <div className="eachVideogames" key={i}>
                            <Card id={g.id} name={g.name} image={g.image} genres={g.genres} />

                        </div>
                    ))}
            </div>
            <div >
                <Paginated page={page} setPage={setPage} max={max} />
            </div>
        </div>

    )

}