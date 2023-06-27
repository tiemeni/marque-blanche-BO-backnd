const User = require('../models/user.model');
const handler = require('../../commons/response.handler')
const { httpStatus } = require('../../commons/constants')
const auth = require('../../commons/auth')
const userService = require('../../services/user.service')

const createUser = async (req, res) => {
    const data = req.body

    try {
        // if user already exist
        const isUserExist = await userService.findOneByQuery({ email: data.email })
        if (isUserExist) return handler.errorHandler(res, "User already exist", httpStatus.BAD_REQUEST)

        //create and store the new user
        const result = await userService.createUser({ ...data });

        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userService.findOneByQuery({ email: email })
        if (!user) {
            return handler.errorHandler(res, "User doesn't exist in our system", httpStatus.NOT_FOUND)
        }

        if (await auth.verifyPassword(password, user.password)) {
            const token = await auth.generateToken({ id: user._id, username: user.email, type: 'user' })
            return handler.successHandler(res, {
                user,
                access_token: token
            })
        } else {
            return handler.errorHandler(res, "Invalid password", httpStatus.NOT_ACCEPTABLE)
        }
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getUserById = async (req, res) => {
    try {
        const foundUser = await userService.findOneByQuery({ _id: req.params.userid });
        if (foundUser == null) return handler.errorHandler(res, 'No user founded', httpStatus.NOT_FOUND);
        return handler.successHandler(res, foundUser)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const foundUsers = await userService.findUsers();
        return handler.successHandler(res, foundUsers)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const updateUserById = async (req, res) => {
    try {
        const result = await userService.updateUser(req.params.userid, { $set: { ...req.body } });
        return handler.successHandler(res, result, httpStatus.CREATED);
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const result = await userService.deleteUsers({ _id: req.params.userid });
        return handler.successHandler(res, result)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const deleteAllUsers = async (req, res) => {
    try {
        const isDelete = await userService.deleteUsers();
        return handler.successHandler(res, isDelete)
    } catch (err) {
        return handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { createUser, getUserById, getAllUsers, updateUserById, deleteUserById, signIn, deleteAllUsers };
