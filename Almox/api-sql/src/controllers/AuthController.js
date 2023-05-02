const jwt = require("jsonwebtoken")

module.exports = {
    async verify(request, response){
        const authHeader = request.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(!token) return response.status(401).json({ auth: false })

        try{
            const secret = process.env.SECRET
            jwt.verify(token, secret)

            return response.status(200).json({ auth: true })
        } catch(err) {
            return response.status(400).json({ auth: false, error: err.message })
        }

    }
}