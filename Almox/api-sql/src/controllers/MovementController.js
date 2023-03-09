const Movement = require("../models/Movement")

module.exports = {
    async index(request, response) {
        try {
            const movements = await Movement.findAll()
            return response.status(200).json({ movements })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}