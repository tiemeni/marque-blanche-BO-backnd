// const nodemailer = require("nodemailer");
// const ejs = require("ejs");

const { sendCodeVerif } = require("./src/helpers");

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "tiemanirocket@gmail.com",
//     pass: "nvpwfjnwfdqxcrly",
//   },
// });

// ejs.renderFile(
//   __dirname + "/public/mailTemplate.ejs",
//   {
//     code: "658616265",
//   },
//   (err, data_) => {
//     if (err) {
//       console.log(err);
//     } else {
//       var mainOption = {
//         from: "tiemanirocket@gmail.com",
//         to: "tiemanirocket@gmail.com",
//         subject: "test",
//         html: data_,
//       };
//       transporter.sendMail(mainOption, (err, data__) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data__);
//         }
//       });
//     }
//   }
// );

sendCodeVerif(56, "tiemanirocket@gmail.com", {});
