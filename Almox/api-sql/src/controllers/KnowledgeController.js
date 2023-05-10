const Knowledge = require("../models/Knowledge")

module.exports = {
    async index(request, response) {
        try {
            const knowledges = await Knowledges.findAll()
            return response.status(200).json({ knowledges })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { from, to, subject, content, status } = request.body

        if(!from || !to || !subject || !content ) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Knowledge.create({
                from,
                to,
                subject,
                content,
                status
            })
            return response.status(200).json({ message: "Knowledge created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}