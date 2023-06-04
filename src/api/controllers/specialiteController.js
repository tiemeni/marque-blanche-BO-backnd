const Specialite = require('../../models/specialite');

const handleNewSpecialite = async (req, res) => {
    const { nom } = req.body;
    if (!nom ) return res.status(400).json({ 'message': 'Entrez le nom de la spécialité.' });
    // check for duplicate usernames in the db
    const duplicate = await Specialite.findOne({ nom: nom }).exec();
    if (duplicate) return res.status(409).json({ error: `${duplicate.nom} already exist` }); //Conflict
    try {
        //create and store the new Role
        const result = await Specialite.create({
            "nom": nom
        });

        console.log(result);

        res.status(201).json({ 'success': `Specialite ${nom} crée!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    } 
}
const getAllSpecialite = async (req, res) => {
    try {
        const foundSpecialite = await Specialite.find();
        console.log("found specialite : " + foundSpecialite)
        res.status(201).json(foundSpecialite);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports = { handleNewSpecialite, getAllSpecialite }