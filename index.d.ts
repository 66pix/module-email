/// <reference path="typings/main/definitions/bluebird/index.d.ts" />
/// <reference path="typings-custom/email-templates.d.ts" />
/// <reference path="typings/nodemailer/nodemailer.d.ts" />
import Promise = require('bluebird');
import { IMailerSentMessageInfo } from './types';
import { IMailerOptions } from './types';
declare let mailer: (options: IMailerOptions) => Promise<IMailerSentMessageInfo>;
export = mailer;
