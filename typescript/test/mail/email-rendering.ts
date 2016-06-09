/// <reference path="../../../typings/index.d.ts" />

let Code = require('code');
import mailer from '../../index';
import mailparser = require('mailparser');
let expect = Code.expect;

describe('email rendering', function() {

  it('should render the email with the correct content', function(done) {
    let user = {
      email: 'mike@pagesofinterest.net'
    };

    mailer({
      to: user.email,
      subject: '66pix Password Reset',
      content: {
        subject: '66pix Password Reset',
        user: user,
        token: 'TOKEN',
        html: '<div>THIS IS THE HTML CONTENT</div>',
        text: 'THIS IS THE TEXT'
      }
    })
    .then(function(message) {
      let emailContent = message.response.toString();
      let mailParserInstance = new mailparser.MailParser()
      .on('end', function(mail) {
        expect(mail.html.indexOf('THIS IS THE HTML CONTENT')).not.to.equal(-1);
        expect(mail.text.indexOf('THIS IS THE TEXT').length).not.to.equal(-1);
        done();
      });

      mailParserInstance.write(emailContent);
      mailParserInstance.end();
    })
    .catch(done);
  });
});

