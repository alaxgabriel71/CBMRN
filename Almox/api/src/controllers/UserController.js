const { v4: uuid } = require("uuid")
const User = require("../models/User")
const bcrypt = require("bcrypt")

module.exports = {
    async show(request, response){
        try{
            const users = await User.find()
            return response.status(200).json({ users })
        } catch(err) {
            response.status(500).json({ error: err.message })
        }
    },
     async store(request, response){
        const { admin, name, registration, email, password } = request.body

        if(admin === undefined) return response.status(400).json({ error: "Missing the admin information" })
        if(!name) return response.status(400).json({ error: "Missing the military name " })
        if(!registration) return response.status(400).json({ error: "Missing the registration" })
        if(!email) return response.status(400).json({ error: "Missing the email" })
        if(!password) return response.status(400).json({ error: "Missing the password" })

        
        
        try{
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            
            const newUser = new User({
                _id: uuid(),
                admin,
                name,
                registration,
                email,
                password: passwordHash
            })

            await newUser.save()

            return response.status(201).json({ message: "User added successfully." })
        } catch(err) {
            return response.status(500).json({ error: err.message })
        }
     }
}