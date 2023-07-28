const mongoose = require('mongoose');
const { GROUP, CENTRE, RIGHT } = require('../../constants/entity');

const groupModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rights: [{
        type: mongoose.Types.ObjectId,
        ref: RIGHT,
    }],
    idCentre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CENTRE,
        required: true
    }
})

module.exports = mongoose.model(GROUP, groupModel);
