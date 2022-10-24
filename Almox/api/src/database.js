const mongoose = require("mongoose");


function connectToDatabase() {
        mongoose.connect(process.env.ALMOX_DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on("error", (error) => console.log(error));
    db.once("open", () => console.log("Conected to the database!"));
}

module.exports = connectToDatabase;