/// <reference path="typings/main/definitions/bluebird/index.d.ts" />
/// <reference path="typings-custom/email-templates.d.ts" />
/// <reference path="typings/nodemailer/nodemailer.d.ts" />

import config = require('./config');
import path = require('path');
import emailTemplates = require('email-templates');
let EmailTemplate = emailTemplates.EmailTemplate;
import Promise = require('bluebird');
import nodemailer = require('nodemailer');

export interface IMailerSentMessageInfo {
  messageId: string;
  envelope: any;
  accepted: string[];
  rejected: string[];
  pending?: string[];
  response: string;
}

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

export interface IMailerOptionsContent {
  subject: string;
  baseUrl?: string;
  html: string;
  text: string;
  [s: string]: any;
}

export interface IMailerOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  content: IMailerOptionsContent;
}

let templatePath = path.join(__dirname, './templates/email/layout/');
export let mailer = (options: IMailerOptions): Promise<IMailerSentMessageInfo> => {
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

