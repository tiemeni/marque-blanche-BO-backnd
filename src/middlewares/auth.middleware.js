const jwt = require("jsonwebtoken");
const { httpStatus, COOKIE_NAME } = require("../commons/constants")
const { env } = require("../config/env/variables")

module.exports = async (req, res, next) => {
    let token;
    console.log(req.cookies)
    if (req.cookies[COOKIE_NAME]) {
        token = req.cookies[COOKIE_NAME]
    } else {
        res
            .status(httpStatus.UNAUTHORIZED)
            .send({
                status: false,
                error: "Not authorized to access this resource verified header",
            });
    }
    try {
        const data = jwt.verify(token, process.env.jwt || env.jwt);
        req.user = data.user;
        req.token = token;
        next();
    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).send({ status: false, error: "Not authorized to access this resource" });
    }
};
