const Admin = require("../models/Admin")

module.exports = {
    async index(request, response) {
        try {
            const adminLevels = await Admin.findAll()
            return response.status(200).json({ adminLevels })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { level } = request.body

        if(!level) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Admin.create({ level })
            return response.status(201).json({ message: "Admin level created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}