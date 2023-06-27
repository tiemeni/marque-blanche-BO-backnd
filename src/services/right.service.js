const Right = require('../database/models/right.model');

module.exports = {
    createRight: async (data) => {
        let right = new Right(data);
        return await right.save();
    },
    findOneByQuery: async (query) => {
        return await Right.findOne(query);
    },
    findRightById: async (id) => {
        return await Right.findById(id);
    },
    findRightByQuery: async (query) => {
        return await Right.find(query);
    },
    findRights: async () => {
        return await Right.find({});
    },
    updateRight: async (id, query) => {
        return await Right.findOneAndUpdate({ _id: id }, query, { new: true });
    },
    deleteOne: async (query) => {
        return await Right.deleteOne(query);
    }
}