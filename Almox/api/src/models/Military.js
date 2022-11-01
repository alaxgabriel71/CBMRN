const mongoose = require("mongoose")

const militarySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rank: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Military", militarySchema)