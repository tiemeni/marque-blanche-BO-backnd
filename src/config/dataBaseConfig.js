const mongoose = require('mongoose');

// db connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true
        });
    }catch(err){
        console.error(err);
    }
}
module.exports = connectDB