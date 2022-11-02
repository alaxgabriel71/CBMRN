const Movement = require('../models/Movement');
const { v4: uuid } = require('uuid');

module.exports = {
    async show(request, response){
        try{
            const movements = await Movement.find().sort({_id: -1});
            return response.status(200).json({ movements });
        } catch(err){
            return response.status(500).json({ error: err.message });
        }
    },

    async store(request, response){
        const { operation, date, description } = request.body;

        if(!operation || !date || !description)
            return response.status(400).json({ message: "Movement operation, date or description not informed." });

        const movement = new Movement({
            _id: uuid(),
            operation,
            date,
            description
        });

        try{
            await movement.save();
            return response.status(201).json({ message: "Movement added successfully." });
        } catch(err){
            return response.status(500).json({ error: err.message });
        }
    },

    async removeAll(request, response){
        try{
            await Movement.deleteMany({});
            return response.status(200).json({ message: 'Movements history deleted successfully.' });
        } catch(err) {
            return response.status(500).json({ error: err.message });
        }
    }
};