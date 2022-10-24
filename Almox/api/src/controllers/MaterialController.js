const { v4: uuid } = require("uuid");
const Material = require("../models/Material");

module.exports = {
    async index(request, response){
        try{
            const materials = await Material.find();
            return response.status(200).json({ materials });
        } catch (err){
            response.status(500).json({ error: err.message });
        }
    },

    async store(request, response){
        const { name } = request.body;
        var { quantity } = request.body;

        if(!name) {
            return response.status(400).json({ error: "Missing material name." })
        }

        if(!quantity){
            quantity = 1;
        }

        const material = new Material({
            _id: uuid(),
            name,
            quantity, 
        });

        try{
            await material.save();

            return response.status(201).json({ message: "Material added successfully!" })
        } catch(err){
            response.status(500).json({ error: err.message })
        }
    },

    async update(request, response){
        const { name, quantity } = request.body;

        if(!name && !quantity) return response.status(400).json({ error: "New name or new quantity of material not informed!" });
        
        if(name) response.material.name = name;
        if(quantity) response.material.quantity = quantity;

        try{
            await response.material.save();
            return response.status(200).json({ message: "Material updated successfully!" });
        } catch(err){
            response.status(500).json({ error: err.message })
        }
    },

    async remove(request, response){
        try{
            await response.material.remove();
            return response.status(200).json({ message: "Material deleted successfully." });
        } catch(err){
            return response.status(500).json({ error: err.message });
        }
    },
}