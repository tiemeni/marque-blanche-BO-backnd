const jwt = require("jsonwebtoken");
const { httpStatus } = require("../commons/constants")

module.exports = async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.header("Authorization").replace("Bearer ", "");
    } else {
        res
            .status(httpStatus.UNAUTHORIZED)
            .send({
                status: false,
                error: "Not authorized to access this resource verified header",
            });
    }
    try {
        const data = jwt.verify(token, process.env.jwt);

        req.user = data.user;
        req.token = token;

        next();
    } catch (error) {
        console.log(error)
        res.status(httpStatus.UNAUTHORIZED).send({ status: false, error: "Not authorized to access this resource" });
    }
};