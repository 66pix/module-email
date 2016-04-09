/// <reference path="typings/main/definitions/bluebird/index.d.ts" />
/// <reference path="typings-custom/email-templates.d.ts" />
/// <reference path="typings/nodemailer/nodemailer.d.ts" />
import Promise = require('bluebird');
export interface IMailerSentMessageInfo {
    messageId: string;
    envelope: any;
    accepted: string[];
    rejected: string[];
    pending?: string[];
    response: string;
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
export declare let mailer: (options: IMailerOptions) => Promise<IMailerSentMessageInfo>;
