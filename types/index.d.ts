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
export interface IMailerSentMessageInfo {
    messageId: string;
    envelope: any;
    accepted: string[];
    rejected: string[];
    pending?: string[];
    response: string;
}
