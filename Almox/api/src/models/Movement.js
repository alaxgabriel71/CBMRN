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
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Moviment", movementsSchema);