const Practicien = require('../../models/practicien');

const handleNewPracticien = async (req, res) => {
    const { matricule, status, prixDefault, idUtilisateur, idSpecialite } = req.body;
    // if (!nom ) return res.status(400).json({ 'message': 'Entrez le nom de la spécialité.' });
    // check for duplicate matricule in the db
    const duplicate = await Practicien.findOne({ matricule: matricule }).exec();
    if (duplicate) return res.status(409).json({ error: `${duplicate.matricule} already exist` }); //Conflict
    try {
        //create and store the new Role
        const result = await Practicien.create({
            "matricule": matricule,
            "status": status,
            "prixDefault": prixDefault,
            "idUtilisateur": idUtilisateur,
            "idSpecialite": idSpecialite
        });

        console.log(result);

        res.status(201).json({ 'success': `Practicien ${matricule} crée!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    } 
}
const getAllPracticien = async (req, res) => {
    try {
        const foundPracticien = await Practicien.find();
        console.log("found practicien : " + foundPracticien)
        res.status(201).json(foundPracticien);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

const getPracticienWithSpecialite = async (req, res) => {
    try {
        const foundpractSpec = await Practicien.find({matricule: req.params.usermat}).populate("idSpecialite");
        console.log("param : " + req.params.usermat)
        console.log("found user specialite : " + foundpractSpec)
        res.status(201).json(foundpractSpec);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports = { handleNewPracticien, getAllPracticien, getPracticienWithSpecialite }