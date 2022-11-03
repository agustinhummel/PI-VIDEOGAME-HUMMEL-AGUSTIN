const { Videogame, Gender } = require('../db');
const api = "https://api.rawg.io/api/games"
const api2 = "https://api.rawg.io/api/platforms"
const axios = require('axios');
const express = require('express');
const router = express.Router();
const { YOUR_API_KEY } = process.env;


const getVideogames = async (req, res) => {
    const { name } = req.query
    if (name) {
        let videogamesName = await axios.get(`${api}?key=${YOUR_API_KEY}&search=${name}&page_size=15`)
        let VGname = await videogamesName.data.results.map(e => {
            return {
                id: e.id,
                name: e.name,
                released: e.released,
                rating: e.rating,
                description: e.description_raw,
                platforms: e.platforms.map((p) => p.platform.name),
                image: e.background_image,
                genres: e.genres.map((g) => g.name)
            }
        })
        const dbName = await Videogame.findAll({ where: { name } })
        const totalName = VGname.concat(dbName);
        res.status(200).json(totalName);
    }
    else {
        try {
            const apiUrl = `${api}?key=${YOUR_API_KEY}&page_size=40`;
            const promise1 = axios.get(apiUrl + "&page=1");
            const promise2 = axios.get(apiUrl + "&page=2");
            const promise3 = axios.get(apiUrl + "&page=3");

            await Promise.all([promise1, promise2, promise3]).then(
                (values) => {
                    apiInfo = values[0].data.results
                        .concat(values[1].data.results)
                        .concat(values[2].data.results);
                }
            );
            const apiGame = await apiInfo.map(e => {
                return {
                    id: e.id,
                    name: e.name,
                    released: e.released,
                    rating: e.rating,
                    description: e.description_raw,
                    platforms: e.platforms.map((p) => p.platform.name),
                    image: e.background_image,
                    genres: e.genres.map((g) => g.name).join(', '),
                    createInDb: false

                }
            });
            const bdVideogame = await Videogame.findAll();
            const allVideogame = apiGame.concat(bdVideogame)
            res.status(200).json(allVideogame)
        } catch (error) {
            res.status(404).send(error.message)
        }
    }

}

const getDbInfo = async () => {
    const data = await Videogame.findAll({ include: [Gender] });
    return data;
}

const getAllVideogame = async () => {
    const apiInfo = await getVideogames();
    const dbInfo = await getDbInfo();
    const infoTotal = [...apiInfo, dbInfo];
    return infoTotal
}


const getById = async (req, res) => {
    const { id } = req.params
    try {
        if (isNaN(id)) {
            const videogameDB = await Videogame.findByPk(id);
            res.status(200).json(videogameDB)
        } else {
            const videogameApi = await axios.get(`${api}/${id}?key=${YOUR_API_KEY}`)
            let totalApi = {
                id: videogameApi.data.id,
                name: videogameApi.data.name,
                released: videogameApi.data.released,
                rating: videogameApi.data.rating,
                description: videogameApi.data.description_raw,
                platforms: videogameApi.data.platforms.map((p) => p.platform.name),
                image: videogameApi.data.background_image,
                genres: videogameApi.data.genres.map((g) => g.name)
            }
            res.status(200).json(totalApi);
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
}

const createVideogame = async (req, res) => {
    const { name, released, rating, description, platforms, image, genres } = req.body;
    try {
        const videogames = await Videogame.create({
            name, description, released, rating, platforms, image, genres
        });
        genres.forEach(async (g) => {
            let generos = await Gender.findAll({ where: { name: g } });
            videogames.addGender(generos);
        })
        res.status(200).send(`${videogames.name}: created`)

    } catch (error) {
        res.status(404).send(`error!`)
    }
}

const getPlatforms = async (req, res) => {
    try {
        let apiPlatfomrs = await axios.get(`${api2}?key=${YOUR_API_KEY}`)
        var platfomrs = apiPlatfomrs.data.results.map((p) => p.name);
        res.status(200).json(platfomrs)
    }
    catch (error) {
        res.status(404).send(error.message)
    }
}


module.exports = {
    getVideogames,
    getAllVideogame,
    getById,
    createVideogame,
    getPlatforms,
    router,
}