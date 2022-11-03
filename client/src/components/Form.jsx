import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewVideogame, getGender, getPlatforms } from "../redux/actions";
import { Link, useHistory } from "react-router-dom";
import '../style/form.css';
import Loading from "./Loading";


export default function Form() {
    const allGender = useSelector((state) => state.gender)
    const allPlatforms = useSelector((state) => state.platforms)
    const dispatch = useDispatch();
    const history = useHistory();
    const [input, setInput] = useState({
        name: '',
        released: '',
        rating: '',
        description: '',
        platforms: [],
        image: '',
        genres: [],
    })

    useEffect(() => {
        dispatch(getGender())
        dispatch(getPlatforms())
    }, [dispatch])

    const [errors, setErrors] = useState({});

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        )
    }

    const handleCheck = function (e) {
        if (e.target.checked) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        }
        if (!e.target.checked) {
            setInput({
                ...input,
                platforms: input.platforms.filter(el => el !== e.target.value)
            })
        }
    }

    const handleCheck2 = function (e) {
        if (e.target.checked) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        }
        if (!e.target.checked) {
            setInput({
                ...input,
                genres: input.genres.filter(el => el !== e.target.value)
            })
        }
    }

    const submit = function (e) {
        e.preventDefault();
        if (
            input.name && input.name !== " " &&
            input.description &&
            input.rating && input.rating > 1 && input.rating <= 5 &&
            input.image &&
            input.platforms.length &&
            input.genres.length
        ) {
            dispatch(postNewVideogame(input));
            alert(`The game "${input.name}" has been created successfully`)
            setInput({
                name: '',
                released: '',
                rating: '',
                description: '',
                platforms: [],
                image: '',
                genres: [],
            });
            history.push('/home');
        } else {
            alert(`Some important data is missing`);
        }
    }


    return (
        <div>
            {allPlatforms.length ? (
                <div className="addVideogames">
                    <h1 className="msg">CREATE NEW VIDEOGAME</h1>
                    <form onSubmit={(e => submit(e))}>
                        <div className="form">
                            <div className="prettierForm">
                                <div className="input-name">
                                    <label className="msgs">Name: </label>
                                    <input className={errors.name && 'inputs'} type="text" name="name" onChange={(e => handleInputChange(e))} value={input.name} />
                                    {errors.name && <p className="errors">{errors.name}</p>}
                                </div>
                                <div className="input-name">
                                    <label className="msgs">Description: </label>
                                    <textarea name="description" onChange={(e => handleInputChange(e))} value={input.description} />
                                    {errors.description && (<p className="errors">{errors.description}</p>)}
                                </div>
                                <div className="input-name">
                                    <label className="msgs">Released: </label>
                                    <input className={errors.released && 'inputs'} type="date" name="released" onChange={(e => handleInputChange(e))} value={input.released} />
                                </div>
                                <div className="input-name">
                                    <label className="msgs" >Rating: </label>
                                    <input className={errors.rating && 'inputs'} type="number" name="rating" onChange={(e => handleInputChange(e))} value={input.rating} />
                                    {errors.rating && <p className="errors" >{errors.rating}</p>}
                                </div>
                                <div >
                                    <label className="msgs">Platforms: </label>
                                    {allPlatforms.map((p, i) => {
                                        return (
                                            <div key={i} className="checkSelect" >
                                                <label className="dietTypes">{p}</label>
                                                <input className="checks" type="checkbox" name="platforms" value={p} onChange={(e => handleCheck(e))} />
                                            </div>
                                        )
                                    })}
                                    {input.platforms.length === 0 && (<p className="errors">{errors.platforms}</p>)}
                                </div>
                                <div >
                                    <label className="msgs">Genres: </label>
                                    {allGender.map((p, i) => {
                                        return (
                                            <div key={i} className="checkSelect" >
                                                <label className="dietTypes">{p.name}</label>
                                                <input className="checks" type="checkbox" name="genres" value={p.name} onChange={(e => handleCheck2(e))} />
                                            </div>
                                        )
                                    })}
                                    {input.genres.length === 0 && (<p className="errors">{errors.genres}</p>)}
                                </div>
                                <div className="input-name">
                                    <label className="msgs">Image</label>
                                    <input className={errors.image && 'inputs'} name="image" type="text" onChange={(e => handleInputChange(e))} value={input.image} />
                                    {errors.image && <p className="errors">{errors.image}</p>}
                                </div>
                                <div>
                                    <button className="submitButton" type="submit">CREATE</button>
                                </div>
                                <Link to="/home"><button className="goBackButton">Back to Home</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            ) : <Loading />}
        </div>
    )
}

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "The name is required for created a videogame";
    } else if (!input.description || input.description.length > 255) {
        errors.description = "The description is requiere";
    } else if (!input.rating || input.rating > 5 || input.rating < 0) {
        errors.rating = "Rating must be a number between 0-5";
    } else if (!input.image || input.image.length > 255) {
        errors.image = "The url of image is require and its length less than 255";
    } else if (input.genres.length === 0) {
        errors.genres = "The game requires at least one genre";
    } else if (input.platforms.length === 0) {
        errors.platforms = "The game requires at least one platform";
    }
    return errors;
}