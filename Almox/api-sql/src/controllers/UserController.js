const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = {
    async index(request, response) {
        try {
            const users = await User.findAll({
                order: [
                    ['rank', 'DESC']
                ],
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
    },
    async remove(request, response) {
        const { id } = request.params

        try {
            await User.destroy({
                where: {
                    _id: id
                }
            })
            return response.status(200).json({ message: "User deleted successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async updateAdminLevel(request, response) {
        const { admin } = request.body
        const { id } = request.params

        if(!admin) return response.status(400).json({ error: "Operation failed!" })

        try {
            await User.update({ admin }, {
                where: {
                    _id: id
                }
            })

            return response.status(201).json({ message: "Admin level updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async updateRank(request, response) {
        const { rank } = request.body
        const { id } = request.params

        if(!rank) return response.status(400).json({ error: "Operation failed!" })

        try { 
            await User.update({ rank }, {
                where: {
                    _id: id
                }
            })
            return response.status(201).json({ message: "User rank updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async updateActive(request, response) {
        const { id } = request.params
        const { active } = request.body

        if(active === null) return response.status(400).json({ error: "Operation failed!" })

        try {
            await User.update({ active }, {
                where: {
                    _id: id
                }
            })
            return response.status(201).json({ message: "User active status updated successfully!" })
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async adjunct(request, response) {
        const { id } = request.params
        
        try {
            await User.update({ adjunct: false }, {
                where: {
                    adjunct: true
                }
            })
            try {
                await User.update({ adjunct: true }, {
                    where: {
                        _id: id
                    }
                })
                return response.status(201).json({ message: "Adjunct updated successfully!" })
            } catch(err) {
                return response.status(500).json({ error: "Try again later!" })
            }
        } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
        }
    },
    async newPassword(request, response) {
        const { id } = request.params
        const { currentPassword, newPassword } = request.body

        if(!currentPassword || !newPassword) return response.status(400).json({ error: "Operation failed!"})
        
        try {
            const user = await User.findOne({
                where: {
                    _id: id
                }
            })
            const match = await bcrypt.compare(currentPassword, user.password)
            if(match) {
                const salt = await bcrypt.genSalt(12)
                const passwordHash = await bcrypt.hash(newPassword, salt)
                await User.update({ password: passwordHash }, {
                    where: {
                        _id: id
                    }
                })
                return response.status(201).json({ message: "Password updated successfully!" })
            } else {
                return response.status(401).json({ error: "Confirm the current password!" })
            }
        } catch(err) {
            return response.status(500).json({ error: "Try again later!"})
        }
    }
}