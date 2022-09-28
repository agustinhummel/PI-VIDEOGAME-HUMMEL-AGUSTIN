import axios from 'axios';
import {
    GET_VIDEOGAME,
    GET_VG_BY_NAME,
    GET_DETAIL,
    POST_GAME,
    GET_GENDER,
    GET_PLATFOMRS,
    RATING_SORT,
    ALPHABETICAL_SORT,
    GENRES_FILTER,
    CREATED_FILTER,

} from './comunes/utils'

export function getVideogame() {
    return async function (dispatch) {
        var response = await axios.get(`http://localhost:3001/videogames`)
        return dispatch({ type: GET_VIDEOGAME, payload: response.data })
    }
}

export function getVideogameByName(name) {
    return async function (dispatch) {
        return dispatch({ type: GET_VG_BY_NAME, payload: name })
    }
}

export function getDetail(data) {
    const id = data.match.params.id
    return async function (dispatch) {
        var response = await axios.get(`http://localhost:3001/videogames/${id}`)
        return dispatch({ type: GET_DETAIL, payload: response.data })
    }
}

export function postNewVideogame(data) {
    return async function (dispatch) {
        var response = await axios.post(`http://localhost:3001/videogames/create`, data);
        return dispatch({ type: POST_GAME, payload: response.data })
    }
}

export function getGender() {
    return async function (dispatch) {
        var response = await axios.get(`http://localhost:3001/gender`);
        return dispatch({ type: GET_GENDER, payload: response.data })
    }
}

export function getPlatforms() {
    return async function (dispatch) {
        var response = await axios.get(`http://localhost:3001/vidogames/platforms`);
        return dispatch({ type: GET_PLATFOMRS, payload: response.data })
    }
}

export function ratingSort(payload) {
    return ({
        type: RATING_SORT,
        payload
    })
}

export function sortByName(payload) {
    return ({
        type: ALPHABETICAL_SORT,
        payload
    })
}

export function filterByGenres(payload) {
    return ({
        type: GENRES_FILTER,
        payload
    })
}

export function filterByCreated(payload) {
    return ({
        type: CREATED_FILTER,
        payload
    })
}





