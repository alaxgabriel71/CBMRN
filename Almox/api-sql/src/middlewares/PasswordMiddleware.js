const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = {
    async checkPassword(request, response, next) {
        const { id, registration, password } = request.body

        if(!id || !registration || !password) return response.status(400).json({ error: "Operation failed!" })

        try {
            const user = await User.findOne({ where: {
                _id: id
            }})

            if(!user || user.registration !== registration) return response.status(400).json({ error: "Operation failed!" })

            const match = await bcrypt.compare(password, user.password)
            if(match) next()
            else return response.status(401).json({ error: "Access denied!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    }
}