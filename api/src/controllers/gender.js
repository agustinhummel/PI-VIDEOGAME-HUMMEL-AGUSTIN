const { Gender } = require('../db');
const api = "https://api.rawg.io/api/genres";
const { YOUR_API_KEY } = process.env;
const axios = require('axios');


const getGender = async (req, res) => {
    const dbData = await Gender.findAll();
    if (dbData.length > 0) res.status(200).json(dbData)
    else {
        try {
            const apiUrl = await axios.get(`${api}?key=${YOUR_API_KEY}`)
            const apiInfo = apiUrl.data.results.map(e => {
                return {
                    id: e.id,
                    name: e.name
                }
            });
            await Gender.bulkCreate(apiInfo)
            res.status(200).json(apiInfo);
        } catch (error) {
            res.status(404).send(error.message)
        }
    }
}
module.exports = {
    getGender
}