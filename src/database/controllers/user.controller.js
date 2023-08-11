const handler = require('../../commons/response.handler')
const { httpStatus, COOKIE_NAME } = require('../../commons/constants')
const auth = require('../../commons/auth')
const userService = require('../../services/user.service')
const { env } = require('../../config/env/variables')

const createUser = async (req, res) => {
    const data = req.body
    try {
        // if user already exist
        const condition = req.idCentre ? { email: data.email, idCentre: req.idCentre } : { email: data.email }
        const isUserExist = await userService.findOneByQuery(condition)
        if (isUserExist) return handler.errorHandler(res, "User already exist", httpStatus.BAD_REQUEST)

        //create and store the new user
        const payload = req.idCentre ? { ...data, idCentre: req.idCentre } : { ...data }
        const result = await userService.createUser(payload);

        return handler.successHandler(res, result, httpStatus.CREATED)
    } catch (err) {
        return handler.errorHandler(res, err.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const condition = req.idCentre ? { email: email, idCentre: req.idCentre } : { email: email }
        const user = await userService.findOneByQuery(condition)
        if (!user) {
            return handler.errorHandler(res, "User doesn't exist in our system", httpStatus.NOT_FOUND)
        }

        if (await auth.verifyPassword(password, user.password)) {
            const token = await auth.generateToken({ id: user._id, username: user.email, type: 'user' })
            res.cookie(COOKIE_NAME, token, {
                maxAge: env.EXPIRE_DATE,
                sameSite: 'Lax',
            })
            return handler.successHandler(res, {
                user,
                access_token: token
            })
        } else {
            return handler.errorHandler(res, "Invalid password", httpStatus.NOT_ACCEPTABLE)
        }
    } catch (err) {
        return handler.errorHandler(res, err.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getUserById = async (req, res) => {
    try {
        const condition = req.idCentre ? { _id: req.params.userid, idCentre: req.idCentre, isPraticien: req.query.isPraticien ?? false } : { _id: req.params.userid, isPraticien: req.query.isPraticien ?? false }
        const foundUser = await userService.findOneByQuery(condition);
        if (foundUser == null) return handler.errorHandler(res, 'No user founded', httpStatus.NOT_FOUND);
        return handler.successHandler(res, foundUser)
    } catch (err) {
        return handler.errorHandler(res, err.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getPraticienByIdLieu = async (req, res) => {
    let concernedPraticens = []
    try {
        const condition = req.query.idCentre ? { idCentre: req.query.idCentre, isPraticien: true } : { isPraticien: true }
        const foundUser = await userService.findUserByQuery(condition);
        if (foundUser == null) return handler.errorHandler(res, 'No user founded', httpStatus.NOT_FOUND);
        req.query.idLieu && foundUser?.map((e, _i) => {
            if ((e.affectation.indexOf(req.query.idLieu) != -1) && (e.job == req.query.idSpeciality)) {
                concernedPraticens.push(e)
            }
        })
        return handler.successHandler(res, concernedPraticens)
    } catch (err) {
        return handler.errorHandler(res, err.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getUsersGroupByJob = async (req, res) => {
    try {
        if (!req.query.isPraticien) return handler.errorHandler(res, "Les utilisateurs ne peuvent être groupé par spécialités.", httpStatus.BAD_REQUEST)

        const users = await userService.findAndGroupByJob({
            idCentre: req.idCentre,
            isPraticien: req.query.isPraticien
        })

        return handler.successHandler(res, users)
    } catch (error) {
        return handler.errorHandler(res, error.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getAllUsers = async (req, res) => {
    let foundUsers;
    try {
        const condition = req.idCentre ? { isPraticien: req.query.isPraticien ?? false, idCentre: req.idCentre } : { isPraticien: req.query.isPraticien ?? false }
        foundUsers = await userService.findUserByQuery(condition);
        return handler.successHandler(res, foundUsers)
    } catch (err) {
        return handler.errorHandler(res, err.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const updateUserById = async (req, res) => {
    try {
        const result = await userService.updateUser(req.params.userid, req.idCentre, { $set: { ...req.body } });
        return handler.successHandler(res, result, httpStatus.CREATED);
    } catch (err) {
        return handler.errorHandler(res, err.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const result = await userService.deleteOne({ _id: req.params.userid });
        return handler.successHandler(res, result)
    } catch (err) {
        return handler.errorHandler(res, err.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const deleteAllUsers = async (req, res) => {
    try {
        const isDelete = await userService.deleteUsers();
        return handler.successHandler(res, isDelete)
    } catch (err) {
        return handler.errorHandler(res, err.message, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { createUser, getPraticienByIdLieu, getUserById, getAllUsers, updateUserById, deleteUserById, signIn, deleteAllUsers, getUsersGroupByJob };
