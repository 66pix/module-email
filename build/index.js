/// <reference path="typings/main/definitions/bluebird/index.d.ts" />
/// <reference path="typings-custom/email-templates.d.ts" />
/// <reference path="typings/nodemailer/nodemailer.d.ts" />
"use strict";
var config = require('./config');
var path = require('path');
var emailTemplates = require('email-templates');
var EmailTemplate = emailTemplates.EmailTemplate;
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var transporter;
/* istanbul ignore if  */
if (config.get('NODE_ENV') === 'production') {
    transporter = nodemailer.createTransport({
        secure: true,
        port: config.get('EMAIL_PORT'),
        host: config.get('EMAIL_HOST'),
        auth: {
            user: config.get('EMAIL_USERNAME'),
            pass: config.get('EMAIL_PASSWORD')
        }
    });
}
else {
    var stubTransport = require('nodemailer-stub-transport');
    transporter = nodemailer.createTransport(stubTransport());
}
var templatePath = path.join(__dirname, '/../templates/email/layout/');
var mailer = function (options) {
    options.from = config.get('EMAIL_FROM');
    options.content.baseUrl = 'https://66pix.com/';
    return new Promise(function (resolve, reject) {
        var template = new EmailTemplate(templatePath);
        template.render(options.content)
            .then(function (result) {
            options.text = result.text;
            options.html = result.html;
            transporter.sendMail(options, function (error, info) {
                if (error) {
                    return reject(error);
                }
                return resolve(info);
            });
        });
    });
};
exports.__esModule = true;
exports["default"] = mailer;
//# sourceMappingURL=index.js.map