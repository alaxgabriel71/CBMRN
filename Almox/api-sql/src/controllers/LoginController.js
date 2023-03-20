const User = require("../models/User")
const Admin = require("../models/Admin")
const Rank = require("../models/Rank")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = {
    async check(request, response) {
        const { email, password } = request.body

        if(!email || !password) return response.status(400).json({ error: "Operation failed!" })
         try {
            const user = await User.findOne({ where: { email: `${email}`} })
            
            if(!user) return response.status(404).json({ error: "User not found!" })

            await bcrypt.compare(password, user.password)

            const secret = process.env.SECRET
            const token = jwt.sign({ }, secret, { expiresIn: '7d' })

            const admin = await Admin.findOne({ where: {
               _id: `${user.admin}`
            }})

            const rank = await Rank.findOne({ where: {
               _id: `${user.rank}`
            }})

            return response.status(200).json({ id: user._id, name: `${user.rank} ${user.qra}`, admin: admin.level, token })
         } catch(err) {
            return response.status(500).json({ error: "Try again later!" })
         }
    }
}