/// <reference path="../typings/index.d.ts" />
"use strict";
var convict = require('convict');
var config = convict({
    NODE_ENV: {
        doc: 'The applicaton environment.',
        format: [
            'production',
            'development',
            'staging',
            'test'
        ],
        default: 'development',
        env: 'NODE_ENV'
    },
    EMAIL_FROM: {
        default: null,
        format: 'email',
        doc: 'The "from" email address to be used when sending email.',
        env: 'EMAIL_FROM'
    },
    EMAIL_PORT: {
        default: null,
        format: Number,
        doc: 'The port to be used when sending email.',
        env: 'EMAIL_PORT'
    },
    EMAIL_HOST: {
        default: null,
        format: String,
        doc: 'The hostname to be used when sending email.',
        env: 'EMAIL_HOST'
    },
    EMAIL_USERNAME: {
        default: null,
        format: String,
        doc: 'The username to be used when sending email.',
        env: 'EMAIL_USERNAME'
    },
    EMAIL_PASSWORD: {
        default: null,
        format: String,
        doc: 'The password to be used when sending email.',
        env: 'EMAIL_PASSWORD'
    },
    BASE_URL: {
        doc: 'The site URL for the environment\'s website',
        format: String,
        default: null,
        env: 'BASE_URL'
    }
});
config.validate();
module.exports = config;
//# sourceMappingURL=config.js.map