import Promise = require('bluebird');
import { IMailerSentMessageInfo } from './types';
import { IMailerOptions } from './types';
declare let mailer: (options: IMailerOptions) => Promise<IMailerSentMessageInfo>;
export default mailer;
