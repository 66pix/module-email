import Promise = require('bluebird');

export interface IMailerOptionsContent {
  subject: string;
  baseUrl?: string;
  html: string;
  text: string;
  [options: string]: any;
}

export interface IMailerOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  content: IMailerOptionsContent;
}
export interface IMailerSentMessageInfo {
  messageId: string;
  envelope: any;
  accepted: string[];
  rejected: string[];
  pending?: string[];
  response: string;
}

export interface IMailer {
  (options: IMailerOptions): Promise<IMailerSentMessageInfo>;
}

declare let mailer: IMailer;
export default mailer;
