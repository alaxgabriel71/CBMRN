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
    async getOne(request, response) {
        const { id } = request.params

        try {
            const vehicle = await Vehicle.findOne({ where: {
                _id: id
            }})
            return response.status(200).json({ vehicle })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { name, active, model, seats, plate, list } = request.body

        if(!name) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Vehicle.create({ name, active, model, seats, plate, list })
            return response.status(201).json({ message: "Vehicle created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async updateList(request, response) {
        const { id } = request.params
        const { list } = request.body

        try {
            await Vehicle.update({ list }, {
                where: {
                    _id: id
                }}
            )
            return response.status(200).json({ message: "Vehicle list updated successfully!" })
        } catch(err) {
            return response.status(500).json({ message: "Try again later!", error: err })
        }
    },
    async update(request, response) {
        const { id } = request.params
        const { name, active, model, seats, plate } = request.body

        try {
            await Vehicle.update({ 
                name, 
                active, 
                model, 
                seats, 
                plate 
            }, 
            {
                where: {
                    _id: id
                }
            })
            return response.status(201).json({ message: "Vehicle updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async remove(request, response) {
        const { id } = request.params

        try {
            await Vehicle.destroy({ where: {
                _id: id
            }})
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}