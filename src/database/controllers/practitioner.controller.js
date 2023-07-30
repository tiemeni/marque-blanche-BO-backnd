const Practicien = require('../models/practitioner.model');
const utilisateur = require('../models/user.model');

const handleNewPracticien = async (req, res) => {
    const { matricule, status, prixDefault, idUtilisateur, idSpecialite } = req.body;
    console.log(matricule)
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
        res.status(500).json({ 'message': 'Server Error' });
    }
}

const getPracticienWithSpecialite = async (req, res) => {
    try {
        const foundpractSpec = await Practicien.find({matricule: req.params.usermat}).populate("idSpecialite");
        console.log("param : " + req.params.usermat)
        console.log("found user specialite : " + foundpractSpec)
        res.status(201).json(foundpractSpec);
    } catch (error) {
        res.status(500).json({ 'message': 'Server Error' });
    }
}

const updatePracticienById = async (req, res) => {
    try {
        const filter = {idUtilisateur: req.params.userid};
        if (filter.idUtilisateur === undefined) res.status(404).json({ 'message': 'no param passed' });
        const updateDoc = {
            $set: {
                prixDefault: req.body.prixDefault
            }
        };
        const result = await Practicien.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} document matched`);
        console.log(`${result.modifiedCount} documents updated`);
        if (result.modifiedCount == 0){
            res.status(404).json({'failure': `${result.modifiedCount} practicien updated/found`});
        }else{
            res.status(201).json({'success': `${result.modifiedCount} documents updated`});
        }
        // const foundPracticien = await Practicien.findOne();
    } catch (error) {
        console.log(`Error when updating : ${error}`);
        res.status(500).json({ 'message': 'Server Error' });
    }
}

const deletePracticienById = async (req, res) => {
    try {
        const practFilter = {idUtilisateur: req.params.userid};
        const userFilter = {_id: req.params.userid};
        if (practFilter.idUtilisateur === undefined) res.status(404).json({ 'message': 'no param passed' });
        const deletePractResult = await Practicien.deleteOne(practFilter);
        console.log(`${deletePractResult.deletedCount} user was deleted`);
        // const deleteUserResult = await utilisateur.deleteOne(userFilter);
        // console.log(`${deleteUserResult.deletedCount} user was deleted`);
        if(deletePractResult.deletedCount == 0){ //&& deleteuserResult.deletedCount == 0){
            res.status(404).json({'failure': `${deletePractResult.deletedCount} user deleted/found`});
        }else{
            res.status(201).json({'success': `${deletePractResult.deletedCount} user deleted`});
            const deleteUserResult = await utilisateur.deleteOne(userFilter);
            console.log(`${deleteUserResult.deletedCount} ${userFilter._id} deleted`)
        }
    } catch (error) {
        console.log(`Error when deleting ${error}`);
        res.status(500).json({ 'message': 'Server Error' });
    }
}

module.exports = { handleNewPracticien, getAllPracticien, getPracticienWithSpecialite, updatePracticienById, deletePracticienById }