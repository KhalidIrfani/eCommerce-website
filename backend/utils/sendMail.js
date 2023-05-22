const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const jwt = require('jsonwebtoken')
// const Mailjet = require('node-mailjet');
// const mailjet = Mailjet.apiConnect(
//     process.env.MJ_APIKEY_PUBLIC,
//     process.env.MJ_APIKEY_PRIVATE,
// );

const SendMail = async () => {

    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'faniirfani00759@gmail.com', // Change to your recipient
        from: 'faniirfani00759@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    await sgMail
        .send(msg)


}
module.exports = SendMail



// const request = mailjet
// .post("send", { 'version': 'v3.1' })
// .request({
//     "Messages": [
//         {
//             "From": {
//                 "Email": "khalidirfani1234@gmail.com",
//                 "Name": "Mailjet Pilot"
//             },
//             "To": [
//                 {
//                     "Email": "faniirfani00759@gmail.com",
//                     "Name": "passenger 1"
//                 }
//             ],
//             "Subject": "Your email flight plan!",
//             "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
//             "HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
//         }
//     ]
// })
// request
// .then((result) => {
//     console.log(result.body)
// })
// .catch((err) => {
//     console.log(err.statusCode)
// })
