[Back to README](README.md)

### Learn Basics with Sample App

#### Install CDK `npm install -g aws-cdk`
  - Verify `cdk --version`

#### Start with a sample app
  - Create an empty directory to initialize sample app : `mkdir cdk-workshop && cd cdk-workshop`
  - Initialize CDK sample app in the empty directory : `cdk init sample-app --language typescript`
  - View the proposed Cloud Formation Structure : `cdk synth`
  - Bootstrap with the AWS account info to CDK to store templates into S3 : `cdk bootstrap`
    - If aws environment is already setup, then it automatically picks up from the settings, validate that using `aws sts get-caller-identity`
  - Deploy the CDK sample app template to AWS environment : `cdk deploy` 

#### Manage Changes
  - Make changes to the file `cdk-workshop/lib/cdk-workshop-stack.ts`
  - Verify the proposed changes to cloud formation : `cdk diff`
 
#### Hot swap
  - For Lambda changes, it is is nto really required to rerun the complete suite of cloud formation template. The deployment can be sped up by using hot swap feature
  - IMPORTANT - Use Hot Swap only for development purpose, DO NOT use for PROD
  - `cdk deploy --hotswap`
 
#### CDK Watch
  - Moitors code and assets for changes and attempts to perform a auto deployment when change is deteced
  - Uses `--hotswap` flag by default
  - To disable hotswap use `cdk watch --no-hotswap`
  - Adjust what files to watch and what to be excluded from watch, modify `cdk.json`
