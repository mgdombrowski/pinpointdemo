import boto3

client = boto3.client('pinpoint')

response = client.send_messages(
    ApplicationId='fceec4e1dfc74eb6911a2af938dbacc0',
    MessageRequest={
        'Addresses': {
            '+12038431541': {
                'ChannelType': 'SMS'
            }
        },
        'MessageConfiguration': {
            'SMSMessage': {
                'Body': 'Thanks for ordering! Your confirmation number is 123456. We will notify you when your order is ready for pickup.',
                'MessageType': 'TRANSACTIONAL'
            }
        }
    }
)
print response
