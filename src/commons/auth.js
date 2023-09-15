const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {env} = require("../config/env/variables")

module.exports = {
    encryptPassword: async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },
    verifyPassword: async (password, passwordDB) => {
        const result = await bcrypt.compare(password, passwordDB);
        return result;
    },
    generateToken: async (payload) => {
        return await jwt.sign(payload, process.env.jwt || env.jwt, {
            expiresIn: "7d"
        });
    },
    verifyToken: async (token) => {
        return await jwt.verify(token, process.env.jwt || env.jwt);
    }
}