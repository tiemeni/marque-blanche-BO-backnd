const Group = require('../database/models/group.model');

module.exports = {
    createGroup: async (data) => {
        let group = new Group(data);
        return await group.save();
    },
    findOneByQuery: async (query) => {
        return await Group.findOne(query).populate('rights');
    },
    findGroupById: async (id) => {
        return await Group.findById(id).populate('rights');
    },
    updateGroup: async (id, idc, query) => {
        return await Group.findOneAndUpdate({ _id: id, idCentre: idc }, query, { new: true });
    },
    findGroups: async () => {
        return await Group.find({}).populate('rights');
    },
    findGroupsByQuery: async (query) => {
        return await Group.find(query).populate('rights');
    },
}