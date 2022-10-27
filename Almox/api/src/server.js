require("dotenv").config();

const express = require("express");
const cors = require("cors")

const routes = require("./routes");
const connectToDatabase = require("./database");

connectToDatabase();


const app = express();
const port = 3333;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    app.use(cors());
    next();
});

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`The server started at the ${port} port.`)
});
