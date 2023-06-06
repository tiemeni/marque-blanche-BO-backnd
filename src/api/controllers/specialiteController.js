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

const updateSpecialiteById = async (req, res) => {
    try {
        const filter = {_id: req.params.specialiteid};
        if (filter._id === undefined) res.status(404).json({ 'message': 'no param passed' });
        const updateDoc = {
            $set: {
                nom: req.body.nom
            }
        };
        const result = await Specialite.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} document matched`);
        console.log(`${result.modifiedCount} documents updated`);
        if (result.modifiedCount == 0){
            res.status(404).json({'failure': `${result.modifiedCount} specialite updated/found`});
        }else{
            res.status(201).json({'success': `${result.modifiedCount} specialite updated`});
        }
    } catch (error) {
        res.status(500).json({ 'message': 'Server Error' })
    }
}
const deleteSpecialiteById = async (req, res) => {
    try {
        const filter = {_id: req.params.specialiteid};
        if (filter._id === undefined) res.status(404).json({ 'message': 'no param passed' });
        const result = await Specialite.deleteOne(filter);
        console.log(`${result.deletedCount} specialite was deleted`);
        if(result.deletedCount == 0){
            res.status(404).json({'failure': `${result.deletedCount} specialite deleted/found`});
        }else{
            res.status(201).json({'success': `${result.deletedCount} specialite deleted`});
        }
    } catch (error) {
        console.log(`Error when deleting ${error}`);
        res.status(500).json({ 'message': 'Server Error' });
    }
}

module.exports = { handleNewSpecialite, getAllSpecialite, updateSpecialiteById, deleteSpecialiteById }