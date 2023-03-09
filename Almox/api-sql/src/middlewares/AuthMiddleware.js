const jwt = require("jsonwebtoken");

module.exports = {
    async checkToken(request, response, next){
        const authHeader = request.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(!token) return response.status(401).json({ error: "Access denied!" })

        try {
            const secret = process.env.SECRET
            jwt.verify(token, secret)
            next()
        } catch(err) {
            return response.status(400).json({ error: "Access denied!" })
        }
        
    }
}