const nodemailer = require("nodemailer");



const sendCodeVerif = async (code, mail) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "tiemanirocket@gmail.com",
            pass: "nvpwfjnwfdqxcrly",
        },
    });

    var mainOption = {
        from: "tiemanirocket@gmail.com",
        to: mail,
        subject: "CODE DE VERIFICATION",
        html: "<H1>" + code + "</H1>"
    }
    return transporter.sendMail(mainOption, (err, data__) => {
        if (err) {
            return err
        } else {
            return data__
        }
    });
}

sendCodeVerif("1212", "tiemanirocket@gmail.com")
    .then(data => {
        console.log(data)
    })