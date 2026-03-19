---
toc_max_heading_level: 4
---

# Actions

The `ballerinax/aws.lambda` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Function Annotation`](#function-annotation) | Marks a Ballerina function for deployment as an AWS Lambda function. This is a compiler extension — not a client you instantiate. |

---

## Function Annotation

Marks a Ballerina function for deployment as an AWS Lambda function. This is a compiler extension — not a client you instantiate.

### Configuration (`Function Signature`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `ctx` | `lambda:Context` | Required | The Lambda execution context providing request metadata (request ID, deadline, ARN, trace ID, remaining execution time). |
| `input` | `json\|lambda:SQSEvent\|lambda:S3Event\|lambda:DynamoDBEvent\|lambda:SESEvent\|lambda:APIGatewayProxyRequest` | Required | The event payload. Use `json` for generic input, or a domain-specific event type for AWS service triggers. |

### Initializing the Client

```ballerina
import ballerinax/aws.lambda;

// Annotate any package-level function with @lambda:Function.
// The function must follow this signature:
//   function (lambda:Context, json|EventType) returns json|error

@lambda:Function
public function echo(lambda:Context ctx, json input) returns json {
    return input;
}
```

### Operations

#### Generic Lambda Functions

<details>
<summary>echo</summary>

<div>

A basic Lambda function that receives generic JSON input and returns it as-is. Demonstrates the simplest function signature.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ctx` | `lambda:Context` | Yes | The Lambda execution context. |
| `input` | `json` | Yes | The JSON payload sent to the Lambda function. |

**Returns:** `json`

**Sample code:**

```ballerina
@lambda:Function
public function echo(lambda:Context ctx, json input) returns json {
    return input;
}
```

**Sample response:**

```ballerina
{"key": "value", "message": "Hello from Lambda"}
```

</div>

</details>

<details>
<summary>ctxinfo</summary>

<div>

A Lambda function that extracts and returns execution context information including request ID, deadline, invoked function ARN, trace ID, and remaining execution time.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ctx` | `lambda:Context` | Yes | The Lambda execution context. |
| `input` | `json` | Yes | The JSON payload (unused in this example). |

**Returns:** `json|error`

**Sample code:**

```ballerina
@lambda:Function
public function ctxinfo(lambda:Context ctx, json input) returns json|error {
    json result = {
        RequestID: ctx.getRequestId(),
        DeadlineMS: ctx.getDeadlineMs(),
        InvokedFunctionArn: ctx.getInvokedFunctionArn(),
        TraceID: ctx.getTraceId(),
        RemainingExecTime: ctx.getRemainingExecutionTime()
    };
    return result;
}
```

**Sample response:**

```ballerina
{
  "RequestID": "a]1b2c3d-4e5f-6789-abcd-ef0123456789",
  "DeadlineMS": 1625000000000,
  "InvokedFunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:ctxinfo",
  "TraceID": "Root=1-abcdef12-3456789abcdef012345678",
  "RemainingExecTime": 2950
}
```

</div>

</details>

#### SQS Event Handler

<details>
<summary>notifySQS</summary>

<div>

A Lambda function triggered by an Amazon SQS message. Receives an `SQSEvent` containing one or more SQS records and extracts the message body.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ctx` | `lambda:Context` | Yes | The Lambda execution context. |
| `event` | `lambda:SQSEvent` | Yes | The SQS event containing an array of `SQSRecord` entries. |

**Returns:** `json`

**Sample code:**

```ballerina
@lambda:Function
public function notifySQS(lambda:Context ctx,
                          lambda:SQSEvent event) returns json {
    return event.Records[0].body;
}
```

**Sample response:**

```ballerina
"Hello from SQS queue"
```

</div>

</details>

#### S3 Event Handler

<details>
<summary>notifyS3</summary>

<div>

A Lambda function triggered by an Amazon S3 bucket notification. Receives an `S3Event` and extracts the object key from the first record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ctx` | `lambda:Context` | Yes | The Lambda execution context. |
| `event` | `lambda:S3Event` | Yes | The S3 event containing an array of `S3Record` entries with bucket and object details. |

**Returns:** `json`

**Sample code:**

```ballerina
@lambda:Function
public function notifyS3(lambda:Context ctx,
                         lambda:S3Event event) returns json {
    return event.Records[0].s3.'object.key;
}
```

**Sample response:**

```ballerina
"uploads/my-file.txt"
```

</div>

</details>

#### DynamoDB Event Handler

<details>
<summary>notifyDynamoDB</summary>

<div>

A Lambda function triggered by a DynamoDB Streams event. Receives a `DynamoDBEvent` and extracts the primary key information from the stream record.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ctx` | `lambda:Context` | Yes | The Lambda execution context. |
| `event` | `lambda:DynamoDBEvent` | Yes | The DynamoDB event containing an array of `DynamoDBRecord` entries with stream record details. |

**Returns:** `json`

**Sample code:**

```ballerina
@lambda:Function
public function notifyDynamoDB(lambda:Context ctx,
                               lambda:DynamoDBEvent event) returns json {
    return event.Records[0].dynamodb.Keys.toString();
}
```

**Sample response:**

```ballerina
"{\"id\":{\"S\":\"12345\"}}"
```

</div>

</details>

#### SES Event Handler

<details>
<summary>notifySES</summary>

<div>

A Lambda function triggered by an Amazon SES email receipt notification. Receives an `SESEvent` and extracts the email subject from the common headers.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ctx` | `lambda:Context` | Yes | The Lambda execution context. |
| `event` | `lambda:SESEvent` | Yes | The SES event containing an array of `SESRecord` entries with mail and receipt details. |

**Returns:** `json`

**Sample code:**

```ballerina
@lambda:Function
public function notifySES(lambda:Context ctx,
                          lambda:SESEvent event) returns json {
    return event.Records[0].ses.mail.commonHeaders.subject;
}
```

**Sample response:**

```ballerina
"Welcome to our service"
```

</div>

</details>

#### API Gateway Event Handler

<details>
<summary>apigwRequest</summary>

<div>

A Lambda function triggered by an Amazon API Gateway proxy request. Receives an `APIGatewayProxyRequest` with HTTP method, path, headers, query parameters, and body.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ctx` | `lambda:Context` | Yes | The Lambda execution context. |
| `request` | `lambda:APIGatewayProxyRequest` | Yes | The API Gateway proxy request containing HTTP method, path, headers, query string parameters, and body. |

**Returns:** `()`

**Sample code:**

```ballerina
@lambda:Function
public function apigwRequest(lambda:Context ctx,
                             lambda:APIGatewayProxyRequest request) {
    io:println("Path: ", request.path);
}
```

</div>

</details>
