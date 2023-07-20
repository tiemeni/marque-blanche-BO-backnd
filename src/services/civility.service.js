const Civility = require('../database/models/civility.model');

module.exports = {
    createCivility: async (data) => {
        let civility = new Civility(data);
        return await civility.save();
    },
    findOneByQuery: async (query) => {
        return await Civility.findOne(query);
    },
    findCivilities: async () => {
        
        return await Civility.find({});
    },
}