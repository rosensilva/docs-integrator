---
toc_max_heading_level: 4
---

# Actions

The `ballerinax/ai.weaviate` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Vector Store`](#vector-store) | Provides vector storage, similarity search, and deletion operations against a Weaviate collection. |

---

## Vector Store

Provides vector storage, similarity search, and deletion operations against a Weaviate collection.

### Configuration (`Configuration & ConnectionConfig`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `serviceUrl` | `string` | Required | The URL of the Weaviate service (e.g., `https://<cluster>.weaviate.cloud`). |
| `apiKey` | `string` | Required | The API key for authenticating with the Weaviate service. |
| `config.collectionName` | `string` | Required | The name of the Weaviate collection to operate on. |
| `config.chunkFieldName` | `string` | `"content"` | The field name used to store chunk content in the collection. |
| `httpConfig.auth` | `http:BearerTokenConfig` | `()` | Bearer token authentication configuration. |
| `httpConfig.httpVersion` | `http:HttpVersion` | `HTTP_2_0` | HTTP protocol version. |
| `httpConfig.timeout` | `decimal` | `60` | Request timeout in seconds. |
| `httpConfig.retryConfig` | `http:RetryConfig` | `()` | Retry configuration for failed requests. |
| `httpConfig.secureSocket` | `http:ClientSecureSocket` | `()` | SSL/TLS configuration. |
| `httpConfig.proxy` | `http:ProxyConfig` | `()` | Proxy server configuration. |

### Initializing the Client

```ballerina
import ballerinax/ai.weaviate;

configurable string serviceUrl = ?;
configurable string apiKey = ?;
configurable string collectionName = ?;

weaviate:VectorStore vectorStore = check new (
    serviceUrl,
    apiKey,
    {
        collectionName
    }
);
```

### Operations

#### Vector Entry Management

<details>
<summary>add</summary>

<div>

Adds one or more vector entries to the Weaviate collection. Each entry includes an embedding vector, a content chunk, and optional metadata. Handles UTC timestamp serialization automatically.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `entries` | `ai:VectorEntry[]` | Yes | Array of vector entries to add. Each entry contains an `id`, `embedding` (float array), and a `chunk` with content and metadata. |

**Returns:** `ai:Error?`

**Sample code:**

```ballerina
import ballerina/uuid;

ai:Error? result = vectorStore.add([
    {
        id: uuid:createRandomUuid(),
        embedding: [0.1011, 0.20012, 0.3024],
        chunk: {
            'type: "text",
            content: "A Game of Thrones",
            metadata: {
                "genre": "Fantasy"
            }
        }
    },
    {
        id: uuid:createRandomUuid(),
        embedding: [0.98543, 0.347843, 0.845395],
        chunk: {
            'type: "text",
            content: "Crime And Punishment",
            metadata: {
                "genre": "Literary fiction"
            }
        }
    }
]);
```

</div>

</details>

#### Vector Search

<details>
<summary>query</summary>

<div>

Queries the vector store using vector similarity search. Supports optional metadata filtering with comparison and logical operators. Returns matched entries ranked by certainty score.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | `ai:VectorStoreQuery` | Yes | Query object containing the search `embedding` vector, optional `topK` limit, and optional `filters` for metadata-based filtering. |

**Returns:** `ai:VectorMatch[]|ai:Error`

**Sample code:**

```ballerina
ai:VectorMatch[] matches = check vectorStore.query({
    embedding: [0.05, 0.1, 0.15],
    filters: {
        filters: [
            {
                'key: "genre",
                operator: ai:EQUAL,
                value: "Fantasy"
            }
        ]
    }
});
```

**Sample response:**

```ballerina
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "embedding": [0.1011, 0.20012, 0.3024],
    "chunk": {
      "type": "text",
      "content": "A Game of Thrones",
      "metadata": {
        "genre": "Fantasy"
      }
    },
    "similarityScore": 0.9876
  }
]
```

</div>

</details>

#### Entry Deletion

<details>
<summary>delete</summary>

<div>

Deletes one or more vector entries from the Weaviate collection by ID. Supports both single ID and batch deletion with transactional integrity.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `ids` | `string\|string[]` | Yes | A single entry ID or an array of entry IDs to delete from the collection. |

**Returns:** `ai:Error?`

**Sample code:**

```ballerina
// Delete a single entry
ai:Error? result = vectorStore.delete("550e8400-e29b-41d4-a716-446655440000");

// Delete multiple entries
ai:Error? batchResult = vectorStore.delete([
    "550e8400-e29b-41d4-a716-446655440000",
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
]);
```

</div>

</details>
