exports.successHandler = (res, data, statusCode = 200) => {
    res.status(statusCode).json({ success: true, data });
}

exports.errorHandler = (res, message, statusCode = 400, data = null) => {
    res.status(statusCode).json({ success: false, message: message, data });
}