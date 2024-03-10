import { Stack, StackProps } from 'aws-cdk-lib';
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Bucket, BucketAccessControl } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import path = require('path');

export class StaticWebsiteStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    // Create a bucket to host files
    const bucket = new Bucket(this, 'Bucket', {
      accessControl: BucketAccessControl.PRIVATE,
    })

    // Upload local html file to bucket 
    new BucketDeployment(this, 'BucketDeployment',{
      destinationBucket: bucket,
      sources: [Source.asset(path.resolve(__dirname,'../dist'))]
    })

    // Create cloud front distribution to serve file from internet
    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
    bucket.grantRead(originAccessIdentity);

    new Distribution(this, 'Distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(bucket, {originAccessIdentity}),
      }
    })
  }
}
