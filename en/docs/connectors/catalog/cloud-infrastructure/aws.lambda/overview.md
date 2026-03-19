# AWS Lambda Connector Overview

AWS Lambda is a serverless, event-driven compute service that lets you run code without provisioning or managing servers. The Ballerina `ballerinax/aws.lambda` connector (v3.3.0) is a compiler extension that enables you to write Ballerina functions and deploy them directly as AWS Lambda functions by annotating them with `@lambda:Function`. It supports generic JSON input as well as domain-specific event types for S3, SQS, DynamoDB, SES, and API Gateway triggers.


## Key Features

- Annotation-based deployment — mark any Ballerina function with `@lambda:Function` to generate an AWS Lambda function automatically at build time
- Generic JSON input/output for custom Lambda function invocations
- Domain-specific event types for S3 bucket notifications (`S3Event`), SQS messages (`SQSEvent`), DynamoDB stream records (`DynamoDBEvent`), and SES email notifications (`SESEvent`)
- API Gateway integration via the `APIGatewayProxyRequest` record for HTTP-triggered Lambda functions
- Execution context access through the `Context` object — retrieve request ID, deadline, invoked function ARN, trace ID, and remaining execution time
- Automatic ZIP artifact generation (`aws-ballerina-lambda-functions.zip`) for direct deployment with the AWS CLI or AWS Console
- Custom AWS Lambda layer support using Ballerina's JRE 21 runtime layer for seamless execution in the Lambda environment

## Actions

The AWS Lambda connector is not a traditional client-based connector. Instead of instantiating a client object to call remote operations, you write standard Ballerina functions annotated with `@lambda:Function`. These functions are compiled into AWS Lambda-compatible artifacts and deployed to AWS. The module provides the `Context` class for accessing execution metadata and several event record types for handling AWS service triggers.

See the **[Action Reference](action-reference.md)** for the full list of operations, parameters, and sample code for each client.

## AWS Lambda Connector Documentation

* **[AWS Lambda Connector Setup Guide](setup-guide.md)**: This guide walks you through setting up an AWS account, creating an IAM role, and configuring the AWS CLI — the prerequisites needed before deploying Ballerina functions to AWS Lambda.


* **[Action Reference](action-reference.md)**: Full reference for all clients — operations, parameters, return types, and sample code.

## How to Contribute

As an open source project, WSO2 welcomes contributions from the community.

To contribute to the code for this connector, please create a pull request in the following repository.

* [AWS Lambda Connector GitHub repository](https://github.com/ballerina-platform/module-ballerinax-aws.lambda)

Check the issue tracker for open issues that interest you. We look forward to receiving your contributions.
