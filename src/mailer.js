const nodemailer = require("nodemailer");

class Mailer {
    static mailer;

    initMailer() {
	/*
        this.mailer = nodemailer.createTransport({
            service: process.env.AUTH_EMAIL_SERVICE,
            auth: {
                user: process.env.AUTH_EMAIL_ADDRESS,
                pass: process.env.AUTH_EMAIL_PASSWORD
            }
        });

        this.mailer.verify((error, succees) => {
            if (succees) {
                console.log("Mailer successfully initialized.");
            }
            if(error) {
                console.log("Mailer failed to initialize.");
                process.exit(0);
            }
        });
	*/
    }

    async sendVerificationMail(to, token) {
        const mailOptions = {
            from: process.env.AUTH_EMAIL_ADDRESS,
            to: to,
            subject: "Authenticate your account!",
            html: `<a href="http://${ process.env.HOST }:${ process.env.PORT }/api/users/verify?token=${ token }">Click here to verify your email!</a>`
        };

        return await this.mailer.sendMail(mailOptions);
    }

    async sendTokenMail(to, token) {
        const mailOptions = {
            from: process.env.AUTH_EMAIL_ADDRESS,
            to: to,
            subject: "Your Token!",
            html: `<p>${ token }</p>`
        };

        return await this.mailer.sendMail(mailOptions);
    }
}

module.exports.mailer = new Mailer;
