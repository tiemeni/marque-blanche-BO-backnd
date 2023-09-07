const User = require('../database/models/user.model');
const { encryptPassword } = require('../commons/auth');

const findUserByQuery = async (query) => {
    return await User.find(query)
        .select('-password')
        .populate("civility")
        .populate("groups")
        .populate("job")
        .populate("affectation")
}
module.exports = {
    createUser: async (user) => {
        user.password = await encryptPassword(user.password);
        let newUser = new User(user);
        return await newUser.save();
    },
    findOneByQuery: async (query) => {
        return await User.findOne(query)
    },
    findUserById: async (id) => {
        return await User.findById(id)
            .select('-password').populate('civility');
    },
    findUsers: async () => {
        return await User.find()
            .select('-password')
            .populate("civility")
            .populate("groups")
            .populate("job");
    },
    updateUser: async (id, query, idc = null) => {
        console.log(query)
        let request = idc ? { _id: id, idCentre: idc } : { _id: id }
        return await User.findOneAndUpdate(request, query, { new: true });
    },
    findUserByQuery: async (query) => {
        return await User.find(query)
        .populate("affectation")
        .populate("job")
    },
    findAndGroupByJob: async (query) => {
        const users = await findUserByQuery(query);
        const groupedUsers = {};
        users.forEach(user => {
            const { job } = user;
            if (!groupedUsers[job.title]) {
                groupedUsers[job.title] = [];
            }
            groupedUsers[job.title].push(user);
        });
        return groupedUsers
    },
    deleteOne: async (query) => {
        return await User.deleteOne(query);
    },
    deleteUsers: async () => {
        return await User.deleteMany();
    },
    findAndUpdate: async (id, query) => {
        return await User.findByIdAndUpdate(id, query);
    }
}
