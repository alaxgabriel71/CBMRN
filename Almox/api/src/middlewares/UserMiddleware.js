const User = require("../models/User");

module.exports = {
    async validateEmail(request, response, next){
        const { email } = request.body;

        try{
            const user = await User.findOne({"email": `${email}`});
            if(user) return response.status(409).json({ conflict: "This email is already registered" });
        } catch(err){
            return response.status(500).json({ error: err.message });
        }

        next();
    }
}