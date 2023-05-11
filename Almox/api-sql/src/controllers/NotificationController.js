const Notification = require("../models/Notification")

module.exports = {
    async show(request, response) {
        const { id } = request.params
        try {
            const notifications = await Notification.findAll({
                where: {
                    to: id
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            return response.status(200).json({ notifications })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { from, to, subject, content } = request.body

        if(!from || !to || !subject || !content) return response.status(400).json({ error: "Operation failed!" })

        try {
            const notification = await Notification.create({
                from,
                to,
                subject,
                content
            })
            return response.status(200).json({ notification: notification._id })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async remove(request, response) {
        const { id } = request.params

        try {
            await Notification.destroy({
                where: {
                    _id: id
                }
            })
            return response.status(200).json({ message: "Notification deleted successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async update(request, response) {
        const { id } = request.params
        
        try {
            await Notification.update({ status: true }, {
                where: {
                    _id: id
                }
            })
            return response.status(201).json({ message: "Notification's status updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}