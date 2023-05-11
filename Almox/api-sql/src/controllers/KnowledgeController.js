const Knowledge = require("../models/Knowledge")

module.exports = {
    async index(request, response) {
        try {
            const knowledges = await Knowledge.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            return response.status(200).json({ knowledges })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { notification, from, to, subject, content, status } = request.body

        if(!notification || !from || !to || !subject || !content ) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Knowledge.create({
                notification,
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
    },
    async update(request, response) {
        const { id } = request.params

        try {
            await Knowledge.update({ status: true }, {
                where: {
                    notification: Number(id)
                }
            })
            return response.status(201).json({ message: "Knowledge's status updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}