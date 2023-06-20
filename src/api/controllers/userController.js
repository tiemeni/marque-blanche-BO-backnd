const User = require('../../models/utilisateur');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.jwt


const handleNewUser = async (req, res) => {
    if (req.file !== undefined) {
        console.log("req.file not empty");
        var photo = {
            data: fs.readFileSync(path.join('src/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    const { nom, prenom, dateNaiss, sexe, telephone, ville, email, password, initiales, actif, droits } = req.body;
    // if (!nom || !prenom || !dateNaiss || !sexe || !telephone || !ville || !email || !pwd || !droits || !actif ) return res.status(400).json({ 'message': 'Entrez tous les champs requis.' });

    // check for duplicate usernames in the db
    console.log("finding email in db");
    const duplicate = await User.findOne({ email: email }).exec();
    console.log("email found");
    if (duplicate) return res.status(409).json({ error: `${duplicate.email} already exists` }); //Conflict
    // for (let i = 0; droits.length; i++){
    //     const roleExist = await UserRole.findById(droits[i]).exec();
    //     console.log(roleExist);
    //     return
    //     // if (roleExist == null || undefined) return res.status(409).json({ 'message': `Role ${droits[i]} n'existe pas!` });
    // }

    try {
        //encrypt the password
        console.log("hashing pwd");
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "nom": nom,
            "prenom": prenom,
            "dateNaiss": dateNaiss,
            "sexe": sexe,
            "telephone": telephone,
            "ville": ville,
            "email": email,
            "password": hashedPwd,
            "initiales": initiales,
            "photo": photo,
            "actif": actif,
            "droits": droits
        });

        console.log(result);
        res.json({
            body: req.body,
            file: req.file
        })
    } catch (err) {
        res.status(500).json({ 'message': 'Server Error' });
    }
}

const getUserById = async (req, res) => {
    try {
        const filter = {_id: req.params.userid};
        if (filter._id === undefined) res.status(404).json({ 'message': 'no param passed' });
        const foundUser = await User.findOne(filter);
        if(foundUser == null) return res.status(404).json({'message': 'no user found'});
        console.log("found user : " + foundUser)
        res.status(201).json(foundUser);
    } catch (error) {
        res.status(500).json({ 'message': 'Server Error' });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const foundUsers = await User.find();
        res.status(201).json(foundUsers);
    } catch (error) {
        res.status(500).json({ 'message': 'Server Error' });
    }
}

const getUserRoles = async (req, res) => {
    try {
        if (req.params.usermail === undefined) res.status(404).json({ 'message': 'no param passed' });
        const foundUserRole = await User.find({email: req.params.usermail}).populate("droits");
        console.log("param : " + req.params.usermail)
        console.log("found user roles : " + foundUserRole)
        res.status(201).json(foundUserRole);
    } catch (error) {
        res.status(500).json({ 'message': 'Server Error' });
    }
}

const updateUserNameById = async (req, res) => {
    try {
        const filter = {_id: req.params.userid};
        if (filter._id === undefined) res.status(404).json({ 'message': 'no param passed' });
        const updateDoc = {
            $set: {
                nom: req.body.nom
            }
        };
        const result = await User.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} document matched`);
        console.log(`${result.modifiedCount} documents updated`);
        if (result.modifiedCount == 0){
            res.status(404).json({'failure': `${result.modifiedCount} user updated/found`});
        }else{
            res.status(201).json({'success': `${result.modifiedCount} documents updated`});
        }
    } catch (error) {
        console.log(`Error when updating : ${error}`);
        res.status(500).json({ 'message': 'Server Error' });
    }
}

const deleteUserById = async (req, res) => {
    try {
        const filter = {_id: req.params.userid};
        if (filter._id === undefined) res.status(404).json({ 'message': 'no param passed' });
        const result = await User.deleteOne(filter);
        console.log(`${result.deletedCount} user was deleted`);
        if(result.deletedCount == 0){
            res.status(404).json({'failure': `${result.deletedCount} user deleted/found`});
        }else{
            res.status(201).json({'success': `${result.deletedCount} user deleted`});
        }
    } catch (error) {
        console.log(`Error when deleting ${error}`);
        res.status(500).json({ 'message': 'Server Error' });
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).lean()
        if (!user) {
            res.status(404).json({
                status: false,
                error: "L'utilisateur n'existe pas dans notre système"
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, username: user.email, type: 'user' }, JWT_SECRET, { expiresIn: '1h' })
            res.status(200).json({
                status: true,
                data: {
                    ...user,
                    access_token: token
                }
            })
        } else {
            res.status(406).json({ status: false, error: 'Mot de passe invalide' })
        }
    } catch (error) {
        console.log(error);
        res.status(440).json({ status: 'error', error: 'timed out' })
    }
}

module.exports = { handleNewUser, getUserById, getAllUsers, getUserRoles, updateUserNameById, deleteUserById, signIn };
