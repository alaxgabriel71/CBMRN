const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model("Material", materialSchema);