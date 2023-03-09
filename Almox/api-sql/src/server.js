require("dotenv").config()

const express = require("express")
const routes = require("./routes")
const cors = require("cors")

const app = express()
const port = 3300
var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,HEAD,PUT,POST,DELETE",
    headers: "Origin, Authorization, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin"  
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log("Server started: 'http://localhost:3300'")
})