const User = require('../models/user.model');
const fs = require('fs');
const path = require('path');
const handler = require('../../commons/response.handler')
const { httpStatus } = require('../../commons/constants')
const auth = require('../../commons/auth')
const userService = require('../../services/user.service')

const createUser = async (req, res) => {
    let photo = ''
    if (req.file !== undefined) {
        photo = {
            data: fs.readFileSync(path.join('src/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }

    try {
        // if user already exist
        const isUserExist = await userService.findOneByQuery({ email: email })
        if (isUserExist) return handler.errorHandler(res, "User already exist", httpStatus.BAD_REQUEST)

        //create and store the new user
        const result = await userService.createUser({
            "nom": req.nom,
            "prenom": req.prenom,
            "dateNaiss": req.dateNaiss,
            "sexe": req.sexe,
            "telephone": req.telephone,
            "ville": req.ville,
            "email": req.email,
            "password": req.password,
            "initiales": req.initiales,
            "photo": photo,
            "actif": req.actif,
            "droits": req.droits
        });

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
            handler.errorHandler(res, "User doesn't exist in our system", httpStatus.NOT_FOUND)
        }

        if (await auth.verifyPassword(password, user.password)) {
            const token = auth.generateToken({ id: user._id, username: user.email, type: 'user' })
            handler.successHandler(res, {
                ...user,
                access_token: token
            })
        } else {
            handler.errorHandler(res, "Invalid password", httpStatus.NOT_ACCEPTABLE)
        }
    } catch (error) {
        handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getUserById = async (req, res) => {
    try {
        const foundUser = await userService.findOneByQuery({ _id: req.params.userid });
        if (foundUser == null) return handler.errorHandler(res, 'No user founded', httpStatus.NOT_FOUND);
        handler.successHandler(res, foundUser)
    } catch (error) {
        handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const foundUsers = await userService.findUsers();
        handler.successHandler(res, foundUsers)
    } catch (error) {
        handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const getUserRoles = async (req, res) => {
    try {
        if (req.params.usermail === undefined) res.status(404).json({ 'message': 'no param passed' });
        const foundUserRole = await User.find({ email: req.params.usermail }).populate("droits");
        console.log("param : " + req.params.usermail)
        console.log("found user roles : " + foundUserRole)
        res.status(201).json(foundUserRole);
    } catch (error) {
        res.status(500).json({ 'message': 'Server Error' });
    }
}

const updateUserNameById = async (req, res) => {
    try {
        const result = await userService.updateUser(req.params.userid, { $set: { ...req.body } });

        if (result.modifiedCount == 0) res.status(404).json({ 'failure': `${result.modifiedCount} user updated/found` });
        else res.status(201).json({ 'success': `${result.modifiedCount} documents updated` });
    } catch (error) {
        handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const filter = { _id: req.params.userid };
        if (filter._id === undefined) res.status(404).json({ 'message': 'no param passed' });
        const result = await User.deleteOne(filter);
        console.log(`${result.deletedCount} user was deleted`);
        if (result.deletedCount == 0) {
            res.status(404).json({ 'failure': `${result.deletedCount} user deleted/found` });
        } else {
            res.status(201).json({ 'success': `${result.deletedCount} user deleted` });
        }
    } catch (error) {
        handler.errorHandler(res, err, httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports = { createUser, getUserById, getAllUsers, getUserRoles, updateUserNameById, deleteUserById, signIn };
