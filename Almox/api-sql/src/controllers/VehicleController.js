const Vehicle = require("../models/Vehicle")

module.exports = {
    async index(request, response) {
        try {
            const vehicles = await Vehicle.findAll()
            return response.status(200).json({ vehicles })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { name, materials, plate } = request.body

        if(!name) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Vehicle.create({ name, materials, plate })
            return response.status(200).json({ message: "Vehicle created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}