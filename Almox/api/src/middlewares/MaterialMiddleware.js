const { validate: isUuid } = require("uuid");
const Material = require("../models/Material");


module.exports = {
    async validateId(request, response, next){
        const { id } = request.params;
        
        if(!isUuid(id)){
            return response.status(400).json({ error: "Invalid ID." });
        }

        try{
            const material = await Material.findById(id);
            response.material = material;

            if(!material){
                return response.status(404).json({ error: "Material not found!" });
            }

        } catch(err){
            return response.status(500).json({ error: err.message });
        }
        next();
    }
};