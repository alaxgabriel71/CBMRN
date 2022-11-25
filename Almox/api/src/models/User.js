const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)