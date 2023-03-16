const User = require("../models/User")
const bcrypt = require("bcrypt")


module.exports = {
    async index(request, response) {
        try {
            const users = await User.findAll({
                attributes: {
                    exclude: ['password']
                }
            })
            return response.status(200).json({ users })
        } catch(err){
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async show(request, response) {
        try {
            const users = await User.findAll({
                attributes: ['_id', 'rank', 'qra', 'email', 'admin']
            })

            return response.status(200).json({ users })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async store(request, response) {
        const { admin, name, rank, qra, registration, email, password } = request.body

        if(!admin||!name||!rank||!qra||!registration||!email||!password) {
            return response.status(400).json({ error: "Operation failed!" })
        }

        try {
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            await User.create({
                admin,
                name,
                rank,
                qra,
                registration,
                email,
                password: passwordHash
            })

            return response.status(201).json({ message: "User created successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!", err })
        }
    }
}