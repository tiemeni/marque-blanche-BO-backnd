const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        return await jwt.sign(payload, process.env.jwt, {
            expiresIn: '1h'
        });
    },
    verifyToken: async (token) => {
        return await jwt.verify(token, proce);
    }
}