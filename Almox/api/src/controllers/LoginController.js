const User = require("../models/User");

module.exports = {
    async check(request, response) {
        const { email, password } = request.body;

        try {
            const user = await User.findOne({ "email": `${email}` });

            if (user) {
                if (user.password === password)
                    return response.status(200).json({ name: user.name, token: "7171" });
                else
                    return response.status(404).json({ error: "Authentication failed!" });
            } else
                return response.status(404).json({ error: "Authentication failed!" });
        } catch (err) {
            return response.status(500).json({ error: err.message });
        }

    }
}