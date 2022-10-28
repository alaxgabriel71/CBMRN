const { validate: isUuid } = require("uuid");
const Military = require("../models/Military");


module.exports = {
    async validateId(request, response, next){
        const { id } = request.params;
        
        if(!isUuid(id)){
            return response.status(400).json({ error: "Invalid ID." });
        }

        try{
            const military = await Military.findById(id);
            response.military = military;

            if(!military){
                return response.status(404).json({ error: "Military not found!" });
            }

        } catch(err){
            return response.status(500).json({ error: err.message });
        }
        next();
    }
};