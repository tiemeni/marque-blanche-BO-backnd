const User = require('../../models/utilisateur');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');


const handleNewUser = async (req, res) => {
    if(req.file !== undefined){
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
    if (duplicate) return res.status(409).json({error: `${duplicate.email} already exists`}); //Conflict
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
            "ville":ville,
            "email": email,
            "password": hashedPwd,
            "initiales": initiales,
            "photo": photo,
            "actif": actif,
            "droits": droits
        });

        console.log(result);

        // res.status(201).json({ 'success': `Utilisateur ${email} crée!` });
        res.json({
            body: req.body,
            file: req.file
        })
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const foundUsers = await User.find();
        console.log("found users : " + foundUsers)
        res.status(201).json(foundUsers);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

const getUserRoles = async (req, res) => {
    try {
        const foundUserRole = await User.find({email: req.params.usermail}).populate("droits");
        console.log("param : " + req.params.usermail)
        console.log("found user roles : " + foundUserRole)
        res.status(201).json(foundUserRole);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports = { handleNewUser, getAllUsers, getUserRoles };