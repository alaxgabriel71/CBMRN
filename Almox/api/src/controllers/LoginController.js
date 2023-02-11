const User = require("../models/User");
const bcrypt = require("bcrypt");

module.exports = {
    async check(request, response) {
        const { email, password } = request.body;

        if(!email) return response.status(400).json({ error: "Email is required!" });
        if(!password) return response.status(400).json({ error: "Password is required!" });

        try {
            const user = await User.findOne({ "email": `${email}` });
            
            if (user) {
                const passwordMatches = await bcrypt.compare(password, user.password);
                if (passwordMatches)
                    return response.status(200).json({ name: user.name, token: "7171" });
                else
                    return response.status(401).json({ error: "Authentication failed!" });
            } else
                return response.status(401).json({ error: "Authentication failed!" });
        } catch (err) {
            return response.status(500).json({ error: err.message });
        }

    }
}