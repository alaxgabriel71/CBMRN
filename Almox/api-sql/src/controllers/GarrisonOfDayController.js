const GarrisonOfDay = require("../models/GarrisonOfDay")

module.exports = {
    async index(request, response) {
        try {
            const garrisonsOfDay = await GarrisonOfDay.findAll()
            return response.status(200).json({ garrisonsOfDay })
        } catch(err) {
            return response.status(500).json({ error: "Try again later! "})
        }
    },
    async store(request, response) {
        const { name, composition, vehicle } = request.body

        if(!name || !composition || !vehicle) return response.status(400).json({ error: "Operation failed!" })

        try {
            await GarrisonOfDay.create({
                name,
                composition,
                vehicle
            })
            return response.status(200).json({ message: "Garrison defined successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async update(request, response) {
        const { id } = request.params
        const { composition, vehicle } = request.body

        if(!composition) return response.status(400).json({ error: "Operation failed!" })

        try {
            await GarrisonOfDay.update({ composition, vehicle }, {
                where: {
                    _id: id
                }
            })
            return response.status(201).json({ message: "Garrison of Day updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}