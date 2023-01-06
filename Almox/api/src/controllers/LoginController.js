const User = require("../models/User");

module.exports = {
    async index(request, response){
        const { email, password } = request.body;

        try{
            const user = await User.findOne({"email": `${email}`});
    
            if(user) return response.status(200).json({ name: user.name });
            else return response.status(404).json({ error: "User not found!" });
        } catch(err){
            return response.status(500).json({ error: err.message });
        }

    }
}