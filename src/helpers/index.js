const dns = require('dns')

module.exports.startServer = async ({ connectDB, server, startServer, PORT }) => {
    console.clear();
    //---this is just for developpment purpose
    return dns.resolve("www.google.com", (err) => {
        if (err) {
            console.log('you are not connected');
            return null;
        } else {
            console.log("setting up the server ...")
            connectDB()
                .then(() => {
                    server.listen(PORT, () => {
                        console.clear()
                        console.log(`started on Port ${PORT} !`)
                    });
                })
                .catch(e => {
                    console.log('storage service error : ' + e);
                    startServer()
                })
        }
    })
}