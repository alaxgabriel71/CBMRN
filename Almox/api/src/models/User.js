const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    admin: {
        regular: {
            type: Boolean,
            required: false,
            default: false
        },
        moderator: {
            type: Boolean,
            required: false,
            default: false
        },
        commander: {
            type: Boolean,
            required: false,
            default: false
        }
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