const Military = require("../models/Military");
const { v4: uuid } = require('uuid');

module.exports = {
    async show(request, response){
        try{
            const military = await Military.find().sort({name: -1});
            return response.status(200).json({ military });
        } catch(err){
            response.status(500).json({ error: err.message });
        }
    },
    
    async store(request, response){
        const { name, rank } = request.body;
        
        if(!name) 
            return response.status(400).json({ error: "Military name not informed." });

        const military = new Military({
                _id: uuid(),
                name
            }
        )

        try{
            await military.save();
            return response.status(201).json({ message: "Military added successfuly." });
        } catch(err){
            response.status(500).json({ error: err.message });
        }
    },

    async update(request, response){
        const { name, rank } = request.body;
        
        if(!name) 
            return response.status(400).json({ error: "Military new name not informed." });
        else
            response.military.name = name;

        response.military.rank = rank;
        try{
            await response.military.save();
            return response.status(200).json({ message: "Military updated successfuly" });
        } catch(err){
            response.status(500).json({ error: err.message});
        }
    },

    async remove(request, response){
        try{
            await response.military.remove();
            return response.status(200).json({ message: "Military deleted successfully." });
        } catch(err){
            response.status(500).json({ error: err.message });
        }
    }
}

