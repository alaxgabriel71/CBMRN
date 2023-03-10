const Movement = require("../models/Movement")

module.exports = {
    async index(request, response) {
        try {
            const movements = await Movement.findAll()
            return response.status(200).json({ movements })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { user_id, user_name, operation, date, mili, description, remark } = request.body

        if(!user_id || !user_name || !operation || !date || !description) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Movement.create({
                user_id,
                user_name,
                operation,
                date,
                mili,
                description,
                remark
            })

            return response.status(201).json({ message: "Movement stored successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    } 
}