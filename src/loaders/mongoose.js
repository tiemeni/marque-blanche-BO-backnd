const mongoose = require('mongoose');
const {env} = require("../config/env/variables")

// db connection
const connectDB = () => {
    return new Promise((a, r) => {
        mongoose.connect(env.DATABASE_URI, {
            useUnifiedTopology: true
        })
            .then((succ) => {
                a(succ);
            })
            .catch(e => {
                r(e);
            })
    })

}
module.exports = connectDB
