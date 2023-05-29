const Guard = require("../models/Guard")

module.exports = {
    async index(request, response) {
        try {
            const guards = await Guard.findAll()
            return response.status(200).json({ guards })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { name, active } = request.body

        if(!name) return response.status(400).json({ error: "Operation failed!" })
        
        try {
            await Guard.create({
                name,
                active
            })
            return response.status(200).json({ message: "Guard created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async update(request, response) {
        const { id } = request.params
        const { active, schedules } = request.body

        if(!schedules) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Guard.update( { active, schedules }, {
                where: {
                    _id: id
                }
            })
            return response.status(201).json({ message: "Guard updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async updateStatus(request, response) {
        const { id } = request.params
        const { active } = request.body

        try {
            await Guard.update( { active }, {
                where: {
                    _id: id
                }
            })
            return response.status(201).json({ message: "Guard status updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async remove(request, response) {
        const { id } = request.params

        try {
            await Guard.destroy({
                where: {
                    _id: id
                }
            })
            return response.status(200).json({ message: "Guard deleted successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}