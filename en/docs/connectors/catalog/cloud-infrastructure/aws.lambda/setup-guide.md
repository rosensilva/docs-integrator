# Setup Guide

This guide walks you through setting up an AWS account, creating an IAM role, and configuring the AWS CLI — the prerequisites needed before deploying Ballerina functions to AWS Lambda.


## Prerequisites

- An active AWS account. If you do not have one, [create an AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/).
- The [AWS CLI](https://aws.amazon.com/cli/) installed and configured on your machine.

## Step 1: Create an IAM User

1. Log in to the [AWS Management Console](https://console.aws.amazon.com/).
2. Navigate to the **IAM** service.
3. Click **Users** in the left navigation menu, then click **Create user**.
4. Enter a username and select **Provide user access to the AWS Management Console** (optional).
5. On the **Set permissions** screen, select **Attach policies directly**.
6. Search for and attach the **AWSLambda_FullAccess** policy (or a more restrictive policy as needed).
7. Complete the user creation wizard and note the **Access Key ID** and **Secret Access Key**.

:::note
Store the access key and secret securely. You will need them to configure the AWS CLI.
:::

## Step 2: Configure the AWS CLI

Run the following command and provide the access key, secret, default region, and output format when prompted:

```
aws configure
```

This stores your credentials locally so the AWS CLI can authenticate your requests.

## Step 3: Create an IAM Role for Lambda Execution

1. In the AWS Management Console, navigate to **IAM** > **Roles**.
2. Click **Create role**.
3. Select **AWS service** as the trusted entity type, then select **Lambda** as the use case.
4. Attach the **AWSLambdaBasicExecutionRole** managed policy. Add additional policies if your function needs access to other AWS services (e.g., DynamoDB, S3, SQS).
5. Give the role a name (e.g., `ballerina-lambda-role`) and click **Create role**.
6. After creation, open the role and copy the **Role ARN** — you will need this when deploying your Lambda functions.

:::tip
The Role ARN looks like `arn:aws:iam::<ACCOUNT_ID>:role/ballerina-lambda-role`. Keep it handy for the deployment command.
:::

:::warning
For production use, follow the principle of least privilege — grant only the permissions your Lambda function actually needs rather than using broad policies like `AWSLambda_FullAccess`.
:::
