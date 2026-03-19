# Triggers

The `ballerinax/azure.functions` connector provides an event-driven programming model for Azure Functions. Each trigger type has a dedicated Listener class and service object type. Trigger configuration is applied via annotations on the listener declaration. Input bindings are parameter annotations; output bindings are return type annotations on the remote or resource function.


Three components work together:

| Component | Role |
|-----------|------|
| `af:HttpListener` | Listens for inbound HTTP requests and routes them to resource functions on the attached service. |
| `af:QueueListener` | Subscribes to an Azure Storage queue and invokes `onMessage` for each message received. |
| `af:BlobListener` | Watches a Blob Storage path pattern and invokes `onUpdate` when a blob is created or modified. |
| `af:CosmosDBListener` | Subscribes to the CosmosDB change feed and invokes `onUpdate` when documents are created or updated. |
| `af:TimerListener` | Fires on a CRON schedule and invokes `onTrigger` at each scheduled interval. |

For action-based record operations, see the [Action Reference](action-reference.md).

---

## Listener

The `azure.functions:Listener` establishes the connection and manages event subscriptions.

### Configuration

The listener supports the following connection strategies:

| Config Type | Description |
|-------------|-------------|
| `HTTPTriggerConfiguration  (@af:HttpTrigger)` | Configures the HTTP trigger auth level. Apply as `@af:HttpTrigger` on the listener or service declaration. |
| `QueueConfiguration  (@af:QueueTrigger)` | Configures the Azure Storage Queue trigger. Apply as `@af:QueueTrigger` on the listener declaration. |
| `BlobConfiguration  (@af:BlobTrigger)` | Configures the Azure Blob Storage trigger. Apply as `@af:BlobTrigger` on the listener declaration. |
| `CosmosDBTriggerConfiguration  (@af:CosmosDBTrigger)` | Configures the CosmosDB change feed trigger. Apply as `@af:CosmosDBTrigger` on the listener declaration. |
| `TimerTriggerConfiguration  (@af:TimerTrigger)` | Configures the timer trigger schedule. Apply as `@af:TimerTrigger` on the listener declaration. |

**`HTTPTriggerConfiguration  (@af:HttpTrigger)` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `authLevel` | `AUTH_LEVEL` | `"anonymous"` | Authentication level: `"anonymous"` (no key required), `"function"` (function key required), or `"admin"` (master key required). |

**`QueueConfiguration  (@af:QueueTrigger)` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `queueName` | `string` | Required | Name of the Azure Storage queue to subscribe to. |
| `connection` | `string` | `"AzureWebJobsStorage"` | Name of the App Setting that holds the storage connection string. |

**`BlobConfiguration  (@af:BlobTrigger)` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `path` | `string` | Required | Blob path pattern to watch, e.g. `"samples/{name}"`. Capture variables like `{name}` can be bound to parameters using `@af:BindingName`. |
| `connection` | `string` | `"AzureWebJobsStorage"` | Name of the App Setting that holds the storage connection string. |

**`CosmosDBTriggerConfiguration  (@af:CosmosDBTrigger)` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connectionStringSetting` | `string` | Required | Name of the App Setting that holds the CosmosDB account connection string. |
| `databaseName` | `string` | Required | The CosmosDB database name to watch. |
| `collectionName` | `string` | Required | The CosmosDB collection name to watch for changes. |
| `createLeaseCollectionIfNotExists` | `boolean` | `true` | Automatically create the leases collection if it does not already exist. |
| `leasesCollectionThroughput` | `int` | `()` | Provisioned throughput (RU/s) to set when auto-creating the leases collection. |

**`TimerTriggerConfiguration  (@af:TimerTrigger)` fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `schedule` | `string` | Required | CRON expression for the trigger schedule, e.g. `"*/10 * * * * *"` (every 10 seconds) or `"0 */5 * * * *"` (every 5 minutes). |
| `runOnStartup` | `boolean` | `true` | Whether to invoke the function once immediately when the host starts. |

### Initializing the Listener

**HTTP Trigger (anonymous auth):**

```ballerina
import ballerinax/azure.functions as af;

@af:HttpTrigger
listener af:HttpListener httpListener = new ();
```

**HTTP Trigger (function-key auth):**

```ballerina
import ballerinax/azure.functions as af;

@af:HttpTrigger { authLevel: "function" }
listener af:HttpListener httpListener = new ();
```

**Queue Trigger:**

```ballerina
import ballerinax/azure.functions as af;

@af:QueueTrigger { queueName: "my-input-queue" }
listener af:QueueListener queueListener = new ();
```

**Blob Trigger:**

```ballerina
import ballerinax/azure.functions as af;

@af:BlobTrigger { path: "uploads/{name}", connection: "AzureWebJobsStorage" }
listener af:BlobListener blobListener = new ();
```

**CosmosDB Trigger:**

```ballerina
import ballerinax/azure.functions as af;

@af:CosmosDBTrigger {
    connectionStringSetting: "CosmosDBConnection",
    databaseName: "mydb",
    collectionName: "orders",
    createLeaseCollectionIfNotExists: true
}
listener af:CosmosDBListener cosmosListener = new ();
```

**Timer Trigger (every 5 minutes, no startup run):**

```ballerina
import ballerinax/azure.functions as af;

@af:TimerTrigger { schedule: "0 */5 * * * *", runOnStartup: false }
listener af:TimerListener timerListener = new ();
```


---

## Service

A service attached to an Azure Functions listener defines the callback invoked when the trigger fires. For HTTP listeners, standard Ballerina resource functions are used. For all other listeners, a `remote function` with a fixed name is required. Return type annotations specify output bindings — they tell the Azure runtime where to send the function's return value after execution.


### Callback Signatures

| Function | Signature | Description |
|----------|-----------|-------------|
| `resource function (HTTP)` | `resource function <METHOD> <path>(<params>) returns @af:HttpOutput <type>\|error` | Handles inbound HTTP requests; supports GET, POST, PUT, DELETE, and other methods with path segments, query parameters, `@http:Payload`, `@http:Header`, `@af:BlobInput`, and `@af:CosmosDBInput` parameter bindings. |
| `onMessage` | `remote function onMessage(string\|anydata payload) returns @af:OutputBinding anydata\|error?` | Invoked when a message is received from the configured Azure Storage queue. |
| `onUpdate (Blob)` | `remote function onUpdate(byte[] blobContent, @af:BindingName string name) returns @af:OutputBinding anydata\|error?` | Invoked when a blob is created or updated; the `name` parameter is bound from the path capture variable via `@af:BindingName`. |
| `onUpdate (CosmosDB)` | `remote function onUpdate(record{}[] documents, ...) returns @af:OutputBinding anydata\|error?` | Invoked when documents are created or modified in the watched CosmosDB collection; additional parameters may use `@af:CosmosDBInput` for extra read bindings. |
| `onTrigger` | `remote function onTrigger(af:TimerMetadata metadata) returns @af:OutputBinding anydata\|error?` | Invoked at each scheduled timer interval with metadata about whether the invocation is past due. |

:::note
Output bindings are specified as annotations on the return type: `@af:HttpOutput` (HTTP response), `@af:QueueOutput` (write to a queue), `@af:BlobOutput` (write a blob), `@af:CosmosDBOutput` (upsert CosmosDB documents), and `@af:TwilioSmsOutput` (send an SMS). For multiple outputs, use a tuple return type and annotate each element individually, e.g. `returns [@af:HttpOutput string, @af:QueueOutput{queueName: "q"} string]`.

:::

### Full Usage Example

```ballerina
import ballerinax/azure.functions as af;

// ── HTTP Trigger ──────────────────────────────────────────────────────────
@af:HttpTrigger { authLevel: "anonymous" }
listener af:HttpListener httpListener = new ();

service /api on httpListener {
    resource function get hello(string name)
            returns @af:HttpOutput string {
        return "Hello, " + name + "!";
    }
}

// ── Queue Trigger with Queue Output ───────────────────────────────────────
@af:QueueTrigger { queueName: "input-queue" }
listener af:QueueListener queueListener = new ();

service "processQueue" on queueListener {
    remote function onMessage(string inMsg)
            returns @af:QueueOutput { queueName: "output-queue" } string|error {
        return "Processed: " + inMsg;
    }
}

// ── Blob Trigger with Blob Output ─────────────────────────────────────────
@af:BlobTrigger { path: "input/{name}" }
listener af:BlobListener blobListener = new ();

service "processBlob" on blobListener {
    remote function onUpdate(byte[] blobContent, @af:BindingName string name)
            returns @af:BlobOutput { path: "output/" + name } byte[]|error {
        return blobContent;
    }
}

// ── CosmosDB Trigger with CosmosDB Output ─────────────────────────────────
type DBEntry record {
    string id;
    string value;
};

@af:CosmosDBTrigger {
    connectionStringSetting: "CosmosDBConnection",
    databaseName: "mydb",
    collectionName: "orders",
    createLeaseCollectionIfNotExists: true
}
listener af:CosmosDBListener cosmosListener = new ();

service "processCosmosDB" on cosmosListener {
    remote function onUpdate(DBEntry[] documents)
            returns @af:CosmosDBOutput {
        connectionStringSetting: "CosmosDBConnection",
        databaseName: "mydb",
        collectionName: "processed"
    } DBEntry[]|error {
        return documents;
    }
}

// ── Timer Trigger with Queue Output ───────────────────────────────────────
@af:TimerTrigger { schedule: "0 */5 * * * *", runOnStartup: false }
listener af:TimerListener timerListener = new ();

service "scheduledTask" on timerListener {
    remote function onTrigger(af:TimerMetadata metadata)
            returns @af:QueueOutput { queueName: "timer-log" } string|error {
        return "Timer fired. Past due: " + metadata.IsPastDue.toString();
    }
}
```

:::note
Input bindings let you read from Azure services within a callback using parameter annotations. Use `@af:BlobInput { path: "...", connection: "..." }` to read a blob, and `@af:CosmosDBInput { connectionStringSetting: "...", databaseName: "...", collectionName: "...", sqlQuery: "..." }` to query CosmosDB documents. Use `@af:BindingName` to bind a parameter to a capture variable from a path expression (e.g., `{name}` in a blob path).

:::

---

## Supporting Types

### `TimerMetadata`

| Field | Type | Description |
|-------|------|-------------|
| `Schedule` | `TimerSchedule` | The schedule configuration associated with this timer. |
| `ScheduleStatus` | `anydata?` | Optional status record containing last/next run timestamps. |
| `IsPastDue` | `boolean` | Set to `true` if this invocation is running later than its scheduled time. |

### `TimerSchedule`

| Field | Type | Description |
|-------|------|-------------|
| `AdjustForDST` | `boolean` | Whether the schedule adjusts for daylight saving time transitions. |

### `TwilioSmsOutputBinding`

| Field | Type | Description |
|-------|------|-------------|
| `to` | `string?` | Destination phone number override for this SMS message. |
| `body` | `string?` | Message body override for this SMS message. |
