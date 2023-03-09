const Material = require("../models/Material")

module.exports = {
    async index(request, response) {
        try {
            const materials = await Material.findAll()
            return response.status(200).json({ materials })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}