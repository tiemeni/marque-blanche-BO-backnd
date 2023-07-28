const mongoose = require('mongoose');
const { PROFESSION } = require('../../constants/entity');

const professionModel = mongoose.Schema({
    name: {
        type: String,
        require
    },
})

module.exports = mongoose.model(PROFESSION, professionModel);