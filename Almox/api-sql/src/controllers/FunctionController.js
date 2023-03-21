const Function = require("../models/Function")

module.exports = {
    async index(request, response) {
        try {
            const functions = await Function.findAll()
            return response.status(200).json({ functions })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { name } = request.body

        if(!name) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Function.create({ name })
            return response.status(200).json({ message: "Function created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}