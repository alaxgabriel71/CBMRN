const VehicleList = require("../models/VehicleList")

module.exports = {
    async index(request, response) {
        try {
            const vehiclesLists = await VehicleList.findAll()
            return response.status(200).json({ vehiclesLists })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async getOne(request, response) {
        const { id } = request.params
        try {
            const vehicleList = await VehicleList.findOne({ where: {
                _id: id
            }})
            return response.status(200).json({ list: vehicleList.list })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { name, vehicle, list } = request.body

        if(!name || !vehicle || !list) {
            return response.status(400).json({ error: "Operation failed!" })
        }

        try {
            await VehicleList.create({
                name,
                vehicle,
                list
            })
            try {
                const vehicleList = await VehicleList.findOne({
                    where: {
                        name
                    }
                })
                return response.status(200).json({ message: "Vehicle List created successfully!", id: vehicleList._id })
            } catch(err) {
                return response.status(500).json({ message: "Try again later!", error: err })
            }
        } catch(err) {
            return response.status(500).json({ message: "Try again later!", error: err })
        }
    },
    async updateOne(request, response) {
        const { id } = request.params
        const { list } = request.body

        if(!list) return response.status(400).json({ error: "Operation failed!" })

        try {
            await VehicleList.update({ list }, {
                where: {
                    _id: id
                }
            })
            return response.status(201).json({ message: "Vehicle materials list updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async insertOneMaterial(request, response) {
        const { id } = request.params
        const { material } = request.body

        if(!material) return response.status(400).json({ error: "Operation failed!" })

        try{
            const vehicleMaterialsList = await VehicleList.findOne({ where: {
                _id: id
            }})
            const list = vehicleMaterialsList.list
            material.id = list.length+1
            list.push(material)
            try{
                await VehicleList.update({ list }, {
                    where: {
                        _id: id
                    }
                })
                return response.status(201).json({ message: "Material added successfuly!" })
            } catch(err) {
                return response.status(500).json({ error: "Try again later!" })
            }
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}