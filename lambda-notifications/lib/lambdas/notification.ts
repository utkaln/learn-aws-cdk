import { Handler } from "aws-cdk-lib/aws-lambda";
const slack_webhook_url = ""
    
export const handler: Handler = async (event: any , context: any) => {
    console.log('Received Error Notification');

    // Parse SNS message JSON
    const record = JSON.parse(event.Records[0].Sns.Message);
    const functionName = record.Trigger.Dimensions[0].value;
    const alarmDescription = record.AlarmDescription;
    const time = record.StateChangeTime;
    const alarmArn = record.AlarmArn;
    const region = alarmArn.split(":")[3];
    const cloudwatchLink = `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}#logsV2:log-groups/log-group/$252Faws$252Flambda$252F${functionName}`


    // Compose message to be displayed to Slack specific
    const data = {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `:exclamation:*Lambda Error*:\n${functionName}`
            }
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `${alarmDescription}`
            }
          },
          {
            "type": "section",
            "fields": [
              {
                "type": "mrkdwn",
                "text": `*Time*\n${time}`
              },
              {
                "type": "mrkdwn",
                "text": `*Region*\n${region}`
              }
            ]
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `<${cloudwatchLink}|CloudWatch logs>`
            },
          },
        ]
    }

    // Post request to Webhook URL
    await fetch(slack_webhook_url,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    
    return {
        result: "COMPLETED",
    };
    
}