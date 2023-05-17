const VehicleChecklist = require("../models/VehicleChecklist")

module.exports = {
    async index(request, response) {
        try {
            const vehicleChecklists = await VehicleChecklist.findAll({
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            return response.status(200).json({ vehicleChecklists })
        } catch(err) {
             return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { vehicle, driver, status, remark } = request.body

        if(!vehicle || !driver || !status) return response.status(400).json({ error: "Operation failed!" })

        try {
            await VehicleChecklist.create({
                vehicle,
                driver,
                status,
                remark
            })
            return response.status(200).json({ message: "Checklist created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}