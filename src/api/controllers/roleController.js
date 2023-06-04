const Role = require('../../models/droits');

const handleNewRole = async (req, res) => {
    const { nom } = req.body;
    if (!nom ) return res.status(400).json({ 'message': 'Entrez le nom du role.' });

    // check for duplicate usernames in the db
    const duplicate = await Role.findOne({ nom: nom }).exec();
    if (duplicate) return res.status(409).json({ error: `${duplicate.nom} already exist` }); //Conflict 

    try {
        //create and store the new Role
        const result = await Role.create({
            "nom": nom
        });

        console.log(result);

        res.status(201).json({ 'success': `Role ${nom} crée!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllRoles = async (req, res) => {
    try {
        const foundRoles = await Role.find();
        console.log("found roles : " + foundRoles)
        res.status(201).json(foundRoles);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports = { handleNewRole, getAllRoles };