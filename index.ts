import config = require('./config');
import path = require('path');
import emailTemplates = require('email-templates');
let EmailTemplate = emailTemplates.EmailTemplate;
import Promise = require('bluebird');
import nodemailer = require('nodemailer');

import { IMailerSentMessageInfo } from './types';
import { IMailerOptions } from './types';

let transporter;
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
} else {
  let stubTransport = require('nodemailer-stub-transport');
  transporter = nodemailer.createTransport(stubTransport()) as nodemailer.Transporter;
}

let templatePath = path.join(__dirname, './templates/email/layout/');
let mailer = (options: IMailerOptions): Promise<IMailerSentMessageInfo> => {
  options.from = config.get('EMAIL_FROM');
  options.content.baseUrl = 'https://66pix.com/';

  return new Promise<nodemailer.SentMessageInfo>(function(resolve, reject) {
    let template = new EmailTemplate(templatePath);

    template.render(options.content)
    .then(function(result) {
      options.text = result.text;
      options.html = result.html;

      transporter.sendMail(options, function(error, info) {
        if (error) {
          return reject(error);
        }
        return resolve(info);
      });
    });
  });
};

export default mailer;
