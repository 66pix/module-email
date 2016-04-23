/// <reference path="../typings/main/definitions/bluebird/index.d.ts" />
/// <reference path="../typings-custom/email-templates.d.ts" />
/// <reference path="../typings/nodemailer/nodemailer.d.ts" />
/// <reference path="../typings/main/definitions/debug/index.d.ts" />
"use strict";
var config = require('./config');
var path = require('path');
var emailTemplates = require('email-templates');
var EmailTemplate = emailTemplates.EmailTemplate;
var Promise = require('bluebird');
var nodemailer = require('nodemailer');
var debugModule = require('debug');
var debug = debugModule('66pix:email');
var transporter;
/* istanbul ignore if  */
if (config.get('NODE_ENV') === 'production') {
    debug('Preparing mailer with port: %s, host: %s, user: %s, from: %s', config.get('EMAIL_PORT'), config.get('EMAIL_HOST'), config.get('EMAIL_USERNAME'), config.get('EMAIL_FROM'));
    transporter = nodemailer.createTransport({
        // service: 'SES',
        secure: false,
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
var template = new EmailTemplate(templatePath);
var mailer = function (options) {
    options.from = config.get('EMAIL_FROM');
    options.content.baseUrl = config.get('BASE_URL');
    return new Promise(function (resolve, reject) {
        template.render(options.content)
            .then(function (result) {
            options.text = result.text;
            options.html = result.html;
            debug('sending email with options %o', options);
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