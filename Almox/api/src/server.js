require("dotenv").config();

const express = require("express");
const cors = require("cors")

const routes = require("./routes");
const connectToDatabase = require("./database");

connectToDatabase();


const app = express();
const port = 3333;
var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
    methods: "GET,HEAD,PUT,POST,DELETE",
    headers: "Origin, Authorization, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers"  
}

/* app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
    res.setHeader("Access-Control-Allow-Credentials", 'true');
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    app.use(cors());
    next();
}); */

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`The server started at the ${port} port.`)
});
