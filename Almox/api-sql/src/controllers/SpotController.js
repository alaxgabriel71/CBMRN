const Spot = require("../models/Spot")

module.exports = {
    async index(request, response) {
        try {
            const spots = await Spot.findAll()
            return response.status(200).json({ spots })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { name } = request.body

        if(!name) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Spot.create({ name })
            return response.status(200).json({ message: "Spot created successfuly!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async update(request, response) {
        const { id } = request.params
        const { name } = request.body

        if(!name) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Spot.update({ name }, {
                where: {
                    _id: id
                }
            })
            return response.status(201).json({ message: "Spot updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async remove(request, response) {
        const { id } = request.params

        try {
            await Spot.destroy({
                where: {
                    _id: id
                }
            })
            return response.status(200).json({ message: "Spot removed successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}