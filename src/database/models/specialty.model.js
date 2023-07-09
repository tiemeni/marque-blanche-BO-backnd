const mongoose = require('mongoose');

const specialtyModel = mongoose.Schema({
    label: {
        type: String,
        require
    },
    title: {
        type: String
    },
    reference : {
    	type: String
    },
    active: {
    type: Boolean,
    required: true
    },
    webAlert:{
    type: String
    },
    secretaryAlert: {
        type: String
    }
});

module.exports = mongoose.model('Specialty', specialtyModel);
