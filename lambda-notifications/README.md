# Lambda Notification using CDK TypeScript project

## How To
1. Create a cdk empty app:
2. Define a Lambda function using CDK
3. Create Lambda Function code to trigger error event
4. Create Cloud watch alarm using CDK
5. Create SNS Topic that will receive error notifications using CDK
6. Create Alarm Action that will trigger Alarm
7. Create Lambda Function to consumer SNS message and post to Webhook for the App that consumes the notifications

#### Additional Info
- The `cdk.json` file tells the CDK Toolkit how to execute your app
- Update the webhook url in [notification.ts](./lib/lambdas/notification.ts#2)
- Create the stack : `npx cdk deploy`
- Trigger Lambda simply by going to Lambda console and click on Test


## Troubleshooting Steps
- Install CDK : `npm install -g aws-cdk`
- NPM Error: npm ERR! Error: EACCES: permission denied, rename '/usr/local/lib/node_modules/npm'. Fix: Change permission to node_modules, bin and share folder: `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`
- Create Webhook URL in Slack to post notifications : Slack > Add App > Incoming Webhooks > Add > Copy Webhook URL
- Check for user signed on as aws user: `aws sts get-caller-identity`
- If no user found, configure: `aws configure`


## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


## References
- Reference Documentation: https://makeitnew.io/how-to-automating-aws-lambda-notifications-using-cdk-and-slack-7d58f91a3089
- Credit: [Albert Asratyan](https://medium.com/@goradux)
