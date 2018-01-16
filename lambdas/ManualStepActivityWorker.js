'use strict';
console.log('Loading function');
const aws = require('aws-sdk');
const stepfunctions = new aws.StepFunctions();
const pinpoint = new aws.Pinpoint();
exports.handler = (event, context, callback) => {
    var taskParams = {
        activityArn: 'arn:aws:states:us-east-1:964214137428:activity:ReplacementStep'
    };

    stepfunctions.getActivityTask(taskParams, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail('An error occured while calling getActivityTask.');
        } else {
            if (data === null) {
                // No activities scheduled
                context.succeed('No activities received after 60 seconds.');
            } else {
                console.log(data);
                var input = JSON.parse(data.input);
                var params = {
                    ApplicationId: 'fceec4e1dfc74eb6911a2af938dbacc0',
                    MessageRequest: {
                        Addresses: {
                            [input.phoneNumber]: {
                                ChannelType: 'SMS',
                            }
                        },
                        MessageConfiguration: {
                            SMSMessage: {
                                Body: 'Your order had an issue. Not every item was available for immediate fulfillment. Please follow this link to substitute: https://s3.amazonaws.com/bjsdemobucket/index.html?taskToken=' + encodeURIComponent(data.taskToken),
                                MessageType: 'TRANSACTIONAL',
                            }
                        }
                    }
                };

                pinpoint.sendMessages(params, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else     console.log(data);           // successful response
                });
            }
        }
    });
    callback(null,{"phoneNumber": event.phoneNumber});
};
