const mongooseLoader = require('./mongoose');

module.exports = async () => {
    await mongooseLoader();
    console.log("Connected to MongoDB")
}