const User = require('../database/models/user.model');
const { encryptPassword } = require('../commons/auth');

module.exports = {
    createUser: async (user) => {
        user.password = await encryptPassword(user.password);
        let newUser = new User(user);
        return await newUser.save();
    },
    findOneByQuery: async (query) => {
        return await User.findOne(query);
    },
    findUserById: async (id) => {
        return await User.findById(id).select('-password');
    },
    findUserByQuery: async (query) => {
        return await User.find(query).select('-password');
    },
    findUsers: async () => {
        return await User.find({}).select('-password');
    },
    updateUser: async (id, query) => {
        return await User.findOneAndUpdate({ _id: id }, query, { new: true });
    },
    deleteOne: async (query) => {
        return await User.deleteOne(query);
    },
    deleteUsers: async () => {
        return await User.deleteMany({});
    }
}