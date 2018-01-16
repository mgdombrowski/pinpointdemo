'use strict';
console.log('Loading function');
const aws = require('aws-sdk');
const pinpoint = new aws.Pinpoint();

exports.handler = (event, context, callback) => {
    var params = {
        ApplicationId: 'fceec4e1dfc74eb6911a2af938dbacc0',
        MessageRequest: {
            Addresses: {
                "+12038431541": {
                    ChannelType: 'SMS',
                }
            },
            MessageConfiguration: {
                SMSMessage: {
                    Body: 'Thanks for picking up your order. We hope you enjoy it. Leave us feedback on the experience!',
                    MessageType: 'TRANSACTIONAL',
                }
            }
        }
    };

    pinpoint.sendMessages(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
    callback(null,{"phoneNumber": event.phoneNumber});
};
