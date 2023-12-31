## Download
- Get the Bitnami Jenkins installable AMI from AWS market place - https://aws.amazon.com/marketplace/pp/prodview-ywvglhsjiahkk?sr=0-10&ref_=beagle&applicationId=AWS-Marketplace-Console
- Follow prompts. AMI ID installed in this instance is - `ami-0dccbdb9f41bafe28`


## Install in AWS Console
- Choose EC2 type: `t3a.small` for lowest cost (Dec 2023) and Launch with default vpc, subnet and security group
- user id: `user`
- To get the password : Go to instance in EC2 console > Actions > Monitor and Troubleshoot > Get System Log 
- Copy the public IP and that should prompt the Jenkins login page

