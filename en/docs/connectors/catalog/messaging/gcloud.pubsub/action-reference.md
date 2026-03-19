---
toc_max_heading_level: 4
---

# Actions

The `ballerinax/gcloud.pubsub` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Publisher`](#publisher) | Publishes messages to a Google Cloud Pub/Sub topic. |

For event-driven integration, see the [Trigger Reference](trigger-reference.md).

---

## Publisher

Publishes messages to a Google Cloud Pub/Sub topic.

### Configuration (`PublisherConfiguration`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `batchConfig` | `BatchConfig` | `()` | Message batching configuration (max delay, message count, byte limit). |
| `compression` | `record {\| int threshold; \|}` | `()` | Compression configuration. Messages exceeding the `threshold` (in bytes, default `240`) are compressed. |
| `auth` | `GcpCredentialConfig` | `()` | GCP service account credentials. Contains a `path` field pointing to the JSON key file. |
| `enableMessageOrdering` | `boolean` | `false` | Enable message ordering using ordering keys. |
| `retryConfig` | `RetryConfig` | `()` | Retry configuration with exponential backoff for publish failures. |

### Initializing the Client

```ballerina
import ballerinax/gcloud.pubsub;

configurable string project = ?;
configurable string topic = ?;
configurable string gcpCredentialsFilePath = ?;

pubsub:Publisher publisher = check new (project, topic,
    auth = {path: gcpCredentialsFilePath}
);
```

### Operations

#### Messaging

<details>
<summary>publish</summary>

<div>

Publishes a message to the configured Pub/Sub topic. The message data can be `string`, `json`, `xml`, or `byte[]` — non-byte types are automatically serialized.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `message` | `Message` | Yes | The message record containing `data`, optional `attributes`, and optional `orderingKey`. |

**Returns:** `string|Error`

**Sample code:**

```ballerina
string messageId = check publisher->publish({
    data: "Hello from Ballerina!",
    attributes: {"source": "ballerina-app", "env": "production"}
});
```

**Sample response:**

```ballerina
"1234567890123456"
```

</div>

</details>

<details>
<summary>close</summary>

<div>

Gracefully shuts down the publisher, flushing any pending batched messages before closing.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `timeout` | `decimal` | No | Maximum time in seconds to wait for graceful shutdown. Defaults to `10.0`. |

**Returns:** `Error?`

**Sample code:**

```ballerina
check publisher->close();
```

</div>

</details>
