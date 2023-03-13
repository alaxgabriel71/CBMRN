const Material = require("../models/Material")

module.exports = {
    async index(request, response) {
        try {
            const materials = await Material.findAll()
            return response.status(200).json({ materials })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { name, remark } = request.body
        var { quantity } = request.body

        if(!name) return response.status(400).json({ error: "Operation failed!" })
        if(!quantity) quantity = 1
        
        try {
            await Material.create({
                name,
                quantity,
                remark
            })

            return response.status(201).json({ message: "Material created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async update(request, response) {
        const { id } = request.params
        const { name, quantity, remark } = request.body

        if(!id || (!name && !quantity && !remark)) return response.status(400).json({ error: "Operation failed!" })

        try {
            await Material.update({ 
                name, 
                quantity, 
                remark 
            }, 
            { where: {
                _id: id
            }})

            return response.status(200).json({ message: "Material updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async remove(request, response) {
        const { id } = request.params

        try {
            await Material.destroy({
                where: {
                    _id: id
                }
            })

            return response.status(200).json({ message: "Material deleted successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}