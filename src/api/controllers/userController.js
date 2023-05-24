const User = require('../../models/utilisateur');
const UserRole = require('../../models/droits');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { nom, prenom, dateNaiss, sexe, telephone, ville, email, pwd, droits } = req.body;
    if (!nom || !prenom || !dateNaiss || !sexe || !telephone || !ville || !email || !pwd || !droits ) return res.status(400).json({ 'message': 'Entrez les champs requis.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict
    // for (let i = 0; droits.length; i++){
    //     const roleExist = await UserRole.findById(droits[i]).exec();
    //     console.log(roleExist);
    //     return
    //     // if (roleExist == null || undefined) return res.status(409).json({ 'message': `Role ${droits[i]} n'existe pas!` });
    // }

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);

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
            "droits": droits
        });

        console.log(result);

        res.status(201).json({ 'success': `Utilisateur ${email} crée!` });
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