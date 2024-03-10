import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class LambdaNotificationsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    // Lambda definition that creates Event 
    const eventLambda = new cdk.aws_lambda.Function(this,'EventLambda',{
      description: 'This Lambda is to illustrate an event notification',
      runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
      handler: 'index.handler',
      code: cdk.aws_lambda.Code.fromAsset('lib/lambdas/'),
    });

    // Define custom metric to capture lambda error
    const lambdaMetric = new cdk.aws_cloudwatch.Metric({
      metricName: "Errors",
      namespace: "AWS/Lambda",
      period: cdk.Duration.minutes(1),
      statistic: "max",
      dimensionsMap: {
        FunctionName: eventLambda.functionName
      }
    })

    // Define CloudWatch Alarm to monitor error from custom metric
    const errorAlarm = new cdk.aws_cloudwatch.Alarm(this, 'LambdaErrorAlarm',{
      metric: lambdaMetric,
      threshold: 0,
      // check how many occurrences of error during the assigned duration
      evaluationPeriods: 1,
      comparisonOperator: cdk.aws_cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      // following code to make sure to report the lambdaMetric only when error happens, otherwise do not report any data
      treatMissingData: cdk.aws_cloudwatch.TreatMissingData.NOT_BREACHING,
    })

    // Define SNS Topic
    const lambdaErrTopic = new cdk.aws_sns.Topic(this,'ErrorAlarmListener');
    // Bind alarm from segment before to SNS topic
    errorAlarm.addAlarmAction(new cdk.aws_cloudwatch_actions.SnsAction(lambdaErrTopic));

    // Lambda definition that listens to SNS topic 
    const notificationLambda = new cdk.aws_lambda.Function(this,'NotificationLambda',{
      description: 'This Lambda consumes SNS alarm message',
      runtime: cdk.aws_lambda.Runtime.NODEJS_LATEST,
      handler: 'notification.handler',
      code: cdk.aws_lambda.Code.fromAsset('lib/lambdas/'),
      events: [new cdk.aws_lambda_event_sources.SnsEventSource(lambdaErrTopic)],
    });

    // Attach IAM policy to lambda role granting permission to read from SNS
    const snsPolicy = new cdk.aws_iam.PolicyStatement({
      actions: ['sns:Subscribe', 'sns:Receive'],
      resources: [lambdaErrTopic.topicArn],
    });

    // Attach the policy to existing Lambda IAM role
    notificationLambda.addToRolePolicy(snsPolicy);


  }
}
