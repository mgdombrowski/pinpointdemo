'use strict';
console.log('Loading function');
const aws = require('aws-sdk');
const pinpoint = new aws.Pinpoint();

exports.handler = (event, context, callback) => {
    var params = {
        ApplicationId: 'fceec4e1dfc74eb6911a2af938dbacc0',
        MessageRequest: {
            Addresses: {
                [event.phoneNumber]: {
                    ChannelType: 'SMS',
                }
            },
            MessageConfiguration: {
                SMSMessage: {
                    Body: 'Thanks for ordering! Your confirmation number is 123456. We will notify you when your order is ready for pickup.',
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
