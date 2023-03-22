const Garrison = require("../models/Garrison")

module.exports = {
    async index(request, response) {
        try {
            const garrisons = await Garrison.findAll()
            return response.status(200).json({ garrisons })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async getOne(request, response) {
        const { id } = request.params

        try {
            const garrison = await Garrison.findOne({
                where: {
                    _id: id
                }
            })
            return response.status(200).json({ garrison })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { name, composition, max, min, active } = request.body

        if(!name || !composition || !max || !min) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Garrison.create({ 
                name,
                active,
                composition,
                max,
                min
             })
            return response.status(200).json({ message: "Garrison created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!", error: err.message })
        }
    },
    async update(request, response) {
        const { id } = request.params
        const { name, active, composition, max, min } = request.body

        try {
            await Garrison.update({
                name, 
                active, 
                composition, 
                max, 
                min
            }, 
            {
                where: {
                    _id: id
                }
            })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}