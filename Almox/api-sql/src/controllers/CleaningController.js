const Cleaning = require("../models/Cleaning")

module.exports = {
    async index(request, response) {
        try {
            const cleanings = await Cleaning.findAll()
            return response.status(200).json({ cleanings })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { spot, composition } = request.body

        if(!spot || !composition) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Cleaning.create({ spot, composition })
            return response.status(200).json({ message: "Cleaning created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async update(request, response) {
        const { id } = request.params
        const { composition } = request.body

        try {
            await Cleaning.update({ composition }, {
                where: {
                    _id: id
                }
            })
            return response.status(201).json({ message: "Cleaning updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async remove(request, response) {
        const { id } = request.params

        try {
            await Cleaning.destroy({
                where: {
                    _id: id
                }
            })
            return response.status(200).json({ message: "Cleaning removed successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}