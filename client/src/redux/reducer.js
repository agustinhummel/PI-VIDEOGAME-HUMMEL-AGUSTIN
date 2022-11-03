import { GET_DETAIL, GET_GENDER, GET_PLATFOMRS, GET_VG_BY_NAME, GET_VIDEOGAME, POST_GAME, RATING_SORT, ALPHABETICAL_SORT, GENRES_FILTER, CREATED_FILTER } from "./comunes/utils";

const initialState = {
    videogames: [],
    allvideogames: [],
    filterByName: [],
    gamesDetail: [],
    gender: [],
    platforms: [],
    apiGames: [],
    dbGames: [],
    gamesGenres: []
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VIDEOGAME:
            return {
                ...state,
                videogames: action.payload,
                allvideogames: action.payload,
                gamesDetail: action.payload,
                filterByName: [],
                gamesDetail: [],
                apiGames: action.payload.filter((vg) => !vg.createInDb),
                dbGames: action.payload.filter((vg) => vg.createInDb),
            };

        case GET_VG_BY_NAME:
            return {
                ...state,
                filterByName: state.videogames.filter(e => e.name.toLowerCase().includes(action.payload))
            }

        case GET_DETAIL:
            return {
                ...state,
                gamesDetail: action.payload
            }

        case POST_GAME:
            return {
                ...state,
            }

        case GET_GENDER:
            return {
                ...state,
                gender: action.payload
            }

        case GET_PLATFOMRS:
            return {
                ...state,
                platforms: action.payload
            }

        case RATING_SORT:
            let totalRating = state.allvideogames
            let sortedVideogamesByRating = action.payload === 'best'
                ? state.videogames.sort((a, b) => a.rating - b.rating)
                :
                action.payload === 'all'
                    ? totalRating
                    : state.videogames.sort((a, b) => b.rating - a.rating);

            return {
                ...state,
                videogames: sortedVideogamesByRating
            };

        case ALPHABETICAL_SORT:
            let orderByAlphabetical = action.payload === 'asc'
                ? state.videogames.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                })
                : state.videogames.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0
                });
            return {
                ...state,
                videogames: orderByAlphabetical
            };

        case GENRES_FILTER:
            let VideoGames = state.allvideogames;
            let genreFilter = action.payload === "All"
                ? VideoGames
                : VideoGames.filter((Vg) => Vg.genres.includes(action.payload));
            return {
                ...state,
                videogames: genreFilter,
            };

        case CREATED_FILTER:
            let createdFilter = state.apiGames;
            let createdFilter2 = state.dbGames;
            let filter = action.payload === 'Api'
                ? createdFilter.filter(e => e.createInDb === false)
                : createdFilter2.filter(e => e.createInDb === true)
            return {
                ...state,
                videogames: filter
            }

        default:
            return state;
    }

}