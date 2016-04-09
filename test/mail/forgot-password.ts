/// <reference path="../../typings-custom/code.d.ts" />
/// <reference path="../../typings/mocha/mocha-node.d.ts" />
/// <reference path="../../typings/mailparser/mailparser.d.ts" />

import Code = require('code');
import mailer = require('../../index');
import mailparser = require('mailparser');
let expect = Code.expect;

describe('Forgot password email', function() {

  it('should send email with the correct reset password link', function(done) {
    let user = {
      email: 'mike@pagesofinterest.net'
    };

    mailer('forgot-password', {
      to: user.email,
      subject: '66pix Password Reset',
      content: {
        subject: '66pix Password Reset',
        user: user,
        token: 'TOKEN'
      }
    })
    .then(function(message) {
      let emailContent = message.response.toString();
      let resetPasswordLink = 'https://66pix.com/reset-password/TOKEN';

      let mailParserInstance = new mailparser.MailParser()
      .on('end', function(mail) {
        // console.log(JSON.stringify(mail, null, 2));
        // Make sure the reset password link appears 3 times
        // Once in the text-only version
        // Twice (as the href and the text of the link) in the html version
        let forgotPasswordLinkRegexp = new RegExp(resetPasswordLink, 'g');
        expect(mail.html.match(forgotPasswordLinkRegexp).length).to.equal(2);
        expect(mail.text.match(forgotPasswordLinkRegexp).length).to.equal(1);
        done();
      });

      mailParserInstance.write(emailContent);
      mailParserInstance.end();
    })
    .catch(done);
  });
});

