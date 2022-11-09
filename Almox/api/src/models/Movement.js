const mongoose = require('mongoose');

const movementsSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    mili: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    remark: {
        type: String,
        required: false,
        default: ''
    }
});

module.exports = mongoose.model("Moviment", movementsSchema);