const mongoose = require('mongoose');
const { RIGHT } = require('../../constants/entity');

const droitsModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        require
    },
    active: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model(RIGHT, droitsModel);