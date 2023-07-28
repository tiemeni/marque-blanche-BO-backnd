const Motif = require('../database/models/motif');
const { encryptPassword } = require('../commons/auth');

module.exports = {
    createMotif: async (motif) => {
        let newMotif = new Motif(motif);
        return await newMotif.save();
    },
    findMotifById: async (id) => {
        return await Motif.findById(id);
    },
    findMotifs: async () => {
        return await Motif.find({});
    },
    findMotifsByQuery: async query => {
        return await Motif.find(query)
    },
    findOneByQuery: async (query) => {
        return await Motif.findOne(query);
    },
    updateMotif: async (id, query) => {
        return await Motif.findOneAndUpdate({ _id: id }, query, { new: true });
    },
    deleteOne: async (query) => {
        return await Motif.deleteOne(query);
    },
    deleteMotifs: async () => {
        return await Motif.deleteMany({});
    }
}