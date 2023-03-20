const Rank = require("../models/Rank")

module.exports = {
    async index(request, response) {
        try {
            const ranks = await Rank.findAll({
                order: [
                    ['_id', 'DESC']
                ]
            })
            return response.status(200).json({ ranks })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { rank } = request.body

        if(!rank) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Rank.create({ rank })
            return response.status(200).json({ message: "Rank created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}