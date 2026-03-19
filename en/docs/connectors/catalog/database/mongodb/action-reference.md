---
toc_max_heading_level: 4
---

# Actions

The `ballerinax/mongodb` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Top-level client for connecting to MongoDB, listing databases, and obtaining Database references. |
| [`Database`](#database) | Represents a MongoDB database — manage collections and drop the database. |
| [`Collection`](#collection) | Document CRUD, queries, aggregation pipelines, distinct values, and index management. |

---

## Client

Top-level client for connecting to MongoDB, listing databases, and obtaining Database references.

### Configuration (`ConnectionConfig`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `connection` | `ConnectionParameters\|string` | Required | Structured connection parameters or a MongoDB connection string URI. |
| `options` | `ConnectionProperties?` | `()` | Optional connection properties (read concern, write concern, pool settings, SSL, timeouts). |

### Initializing the Client

```ballerina
import ballerinax/mongodb;

configurable string connectionUri = ?;

mongodb:Client mongoClient = check new ({
    connection: connectionUri
});
```

### Operations

#### Database Management

<details>
<summary>listDatabaseNames</summary>

<div>

Lists all database names in the MongoDB server.


**Returns:** `string[]|error`

**Sample code:**

```ballerina
string[] databases = check mongoClient->listDatabaseNames();
```

**Sample response:**

```ballerina
["admin", "local", "movies", "orders"]
```

</div>

</details>

<details>
<summary>getDatabase</summary>

<div>

Retrieves a Database object for the named database.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `databaseName` | `string` | Yes | Name of the database to retrieve. |

**Returns:** `mongodb:Database|error`

**Sample code:**

```ballerina
mongodb:Database moviesDb = check mongoClient->getDatabase("movies");
```

</div>

</details>

<details>
<summary>close</summary>

<div>

Closes the MongoDB client connection. Use a single client instance for the application lifetime.


**Returns:** `error?`

**Sample code:**

```ballerina
check mongoClient->close();
```

</div>

</details>

---

## Database

Represents a MongoDB database — manage collections and drop the database.

### Configuration (`N/A`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|

### Initializing the Client

```ballerina
import ballerinax/mongodb;

// Obtain a Database via Client->getDatabase()
mongodb:Client mongoClient = check new ({
    connection: "mongodb://localhost:27017"
});
mongodb:Database moviesDb = check mongoClient->getDatabase("movies");
```

### Operations

#### Collection Management

<details>
<summary>listCollectionNames</summary>

<div>

Lists all collection names in the database.


**Returns:** `string[]|error`

**Sample code:**

```ballerina
string[] collections = check moviesDb->listCollectionNames();
```

**Sample response:**

```ballerina
["movies", "directors", "reviews"]
```

</div>

</details>

<details>
<summary>createCollection</summary>

<div>

Creates a new collection in the database.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collectionName` | `string` | Yes | Name of the collection to create. |

**Returns:** `error?`

**Sample code:**

```ballerina
check moviesDb->createCollection("movies");
```

</div>

</details>

<details>
<summary>getCollection</summary>

<div>

Gets a Collection object for the named collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `collectionName` | `string` | Yes | Name of the collection to retrieve. |

**Returns:** `mongodb:Collection|error`

**Sample code:**

```ballerina
mongodb:Collection moviesCollection = check moviesDb->getCollection("movies");
```

</div>

</details>

#### Database Operations

<details>
<summary>drop</summary>

<div>

Drops the entire database and all its collections.


**Returns:** `error?`

**Sample code:**

```ballerina
check moviesDb->drop();
```

</div>

</details>

---

## Collection

Document CRUD, queries, aggregation pipelines, distinct values, and index management.

### Configuration (`N/A`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|

### Initializing the Client

```ballerina
import ballerinax/mongodb;

// Obtain a Collection via Database->getCollection()
mongodb:Client mongoClient = check new ({
    connection: "mongodb://localhost:27017"
});
mongodb:Database db = check mongoClient->getDatabase("movies");
mongodb:Collection moviesCollection = check db->getCollection("movies");
```

### Operations

#### Insert Operations

<details>
<summary>insertOne</summary>

<div>

Inserts a single document into the collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `document` | `record {\|anydata...;\|}` | Yes | The document to insert. |
| `options` | `InsertOneOptions` | No | Insert options (comment, bypassDocumentValidation). |

**Returns:** `error?`

**Sample code:**

```ballerina
check moviesCollection->insertOne({
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan"
});
```

</div>

</details>

<details>
<summary>insertMany</summary>

<div>

Inserts multiple documents into the collection. When `ordered` is true (default), insertion stops on the first error.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `documents` | `record {\|anydata...;\|}[]` | Yes | Array of documents to insert. |
| `options` | `InsertManyOptions` | No | Insert options (comment, bypassDocumentValidation, ordered). |

**Returns:** `error?`

**Sample code:**

```ballerina
check moviesCollection->insertMany([
    {title: "The Dark Knight", year: 2008, director: "Christopher Nolan"},
    {title: "Interstellar", year: 2014, director: "Christopher Nolan"},
    {title: "Parasite", year: 2019, director: "Bong Joon-ho"}
]);
```

</div>

</details>

#### Query Operations

<details>
<summary>find</summary>

<div>

Finds all documents matching the filter and returns a stream of typed records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | No | Query filter document. Defaults to `{}` (match all). |
| `findOptions` | `FindOptions` | No | Sort, limit, skip, and batchSize options. |
| `projection` | `map<json>?` | No | Projection document to include/exclude fields. |
| `targetType` | `typedesc<record {\|anydata...;\|}>` | No | Expected record type for results (inferred from context). |

**Returns:** `stream<targetType, error?>|error`

**Sample code:**

```ballerina
type Movie record {|
    string title;
    int year;
    string director;
|};

stream<Movie, error?> result = check moviesCollection->find({year: 2010});
Movie[] movies = check from Movie m in result select m;
```

**Sample response:**

```ballerina
[{"title": "Inception", "year": 2010, "director": "Christopher Nolan"}]
```

</div>

</details>

<details>
<summary>findOne</summary>

<div>

Finds the first document matching the filter. Returns `()` if no match is found.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | No | Query filter document. |
| `findOptions` | `FindOptions` | No | Sort, limit, skip, and batchSize options. |
| `projection` | `map<json>?` | No | Projection document to include/exclude fields. |
| `targetType` | `typedesc<record {\|anydata...;\|}>` | No | Expected record type (inferred from context). |

**Returns:** `targetType|error?`

**Sample code:**

```ballerina
Movie? movie = check moviesCollection->findOne({title: "Inception"});
```

**Sample response:**

```ballerina
{"title": "Inception", "year": 2010, "director": "Christopher Nolan"}
```

</div>

</details>

<details>
<summary>countDocuments</summary>

<div>

Counts documents in the collection matching the filter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | No | Query filter document. Defaults to `{}` (count all). |
| `options` | `CountOptions` | No | Options for limit, skip, maxTimeMS, and hint. |

**Returns:** `int|error`

**Sample code:**

```ballerina
int count = check moviesCollection->countDocuments({director: "Christopher Nolan"});
```

**Sample response:**

```ballerina
3
```

</div>

</details>

<details>
<summary>distinct</summary>

<div>

Returns distinct values for a given field across matching documents.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `fieldName` | `string` | Yes | The field name to get distinct values for. |
| `filter` | `map<json>` | No | Query filter document. Defaults to `{}` (all documents). |
| `targetType` | `typedesc<anydata>` | No | Type for distinct values (inferred from context). |

**Returns:** `stream<targetType, error?>|error`

**Sample code:**

```ballerina
stream<string, error?> directors = check moviesCollection->'distinct("director", {});
string[] uniqueDirectors = check from string d in directors select d;
```

**Sample response:**

```ballerina
["Christopher Nolan", "Bong Joon-ho"]
```

</div>

</details>

#### Update Operations

<details>
<summary>updateOne</summary>

<div>

Updates the first document matching the filter using MongoDB update operators.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | Yes | Filter to match the document to update. |
| `update` | `Update` | Yes | Update operators record (`set`, `unset`, `inc`, `mul`, `rename`, etc.). |
| `options` | `UpdateOptions` | No | Options for upsert, bypassDocumentValidation, comment, and hint. |

**Returns:** `UpdateResult|error`

**Sample code:**

```ballerina
mongodb:UpdateResult result = check moviesCollection->updateOne(
    {title: "Inception"},
    {set: {year: 2010, rating: 8.8}}
);
```

**Sample response:**

```ballerina
{"matchedCount": 1, "modifiedCount": 1, "upsertedId": null}
```

</div>

</details>

<details>
<summary>updateMany</summary>

<div>

Updates all documents matching the filter using MongoDB update operators.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | Yes | Filter to match documents to update. |
| `update` | `Update` | Yes | Update operators record. |
| `options` | `UpdateOptions` | No | Options for upsert, bypassDocumentValidation, comment, and hint. |

**Returns:** `UpdateResult|error`

**Sample code:**

```ballerina
mongodb:UpdateResult result = check moviesCollection->updateMany(
    {director: "Christopher Nolan"},
    {set: {genre: "Sci-Fi"}}
);
```

**Sample response:**

```ballerina
{"matchedCount": 3, "modifiedCount": 3, "upsertedId": null}
```

</div>

</details>

#### Delete Operations

<details>
<summary>deleteOne</summary>

<div>

Deletes the first document matching the filter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `map<json>` | Yes | Filter to match the document to delete. |

**Returns:** `DeleteResult|error`

**Sample code:**

```ballerina
mongodb:DeleteResult result = check moviesCollection->deleteOne({title: "Inception"});
```

**Sample response:**

```ballerina
{"deletedCount": 1, "acknowledged": true}
```

</div>

</details>

<details>
<summary>deleteMany</summary>

<div>

Deletes all documents matching the filter.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `filter` | `string\|map<json>` | Yes | Filter for documents to delete. |

**Returns:** `DeleteResult|error`

**Sample code:**

```ballerina
mongodb:DeleteResult result = check moviesCollection->deleteMany({director: "Christopher Nolan"});
```

**Sample response:**

```ballerina
{"deletedCount": 3, "acknowledged": true}
```

</div>

</details>

#### Aggregation

<details>
<summary>aggregate</summary>

<div>

Runs an aggregation pipeline on the collection. Supports stages like $match, $group, $lookup, $sort, $project, $limit, and more.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `pipeline` | `map<json>[]` | Yes | Array of aggregation pipeline stage documents. |
| `targetType` | `typedesc<anydata>` | No | Expected result type (inferred from context). |

**Returns:** `stream<targetType, error?>|error`

**Sample code:**

```ballerina
type DirectorSummary record {|
    string _id;
    int movieCount;
|};

stream<DirectorSummary, error?> result = check moviesCollection->aggregate([
    {"$group": {"_id": "$director", "movieCount": {"$sum": 1}}},
    {"$sort": {"movieCount": -1}}
]);
DirectorSummary[] summaries = check from DirectorSummary s in result select s;
```

**Sample response:**

```ballerina
[{"_id": "Christopher Nolan", "movieCount": 3}, {"_id": "Bong Joon-ho", "movieCount": 1}]
```

</div>

</details>

#### Index Management

<details>
<summary>createIndex</summary>

<div>

Creates an index on the collection with the given key specification and options.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keys` | `map<json>` | Yes | Index key specification (field name to direction, e.g. `{"title": 1}` for ascending). |
| `options` | `CreateIndexOptions` | No | Index options (unique, sparse, name, expireAfterSeconds, etc.). |

**Returns:** `error?`

**Sample code:**

```ballerina
check moviesCollection->createIndex({"title": 1}, {unique: true, name: "title_unique_idx"});
```

</div>

</details>

<details>
<summary>listIndexes</summary>

<div>

Lists all indexes on the collection.


**Returns:** `stream<Index, error?>|error`

**Sample code:**

```ballerina
stream<mongodb:Index, error?> indexes = check moviesCollection->listIndexes();
mongodb:Index[] indexList = check from mongodb:Index idx in indexes select idx;
```

**Sample response:**

```ballerina
[{"ns": "movies.movies", "v": 2, "name": "_id_", "key": {"_id": 1}}, {"ns": "movies.movies", "v": 2, "name": "title_unique_idx", "key": {"title": 1}}]
```

</div>

</details>

<details>
<summary>dropIndex</summary>

<div>

Drops the named index from the collection.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `indexName` | `string` | Yes | Name of the index to drop. |

**Returns:** `error?`

**Sample code:**

```ballerina
check moviesCollection->dropIndex("title_unique_idx");
```

</div>

</details>

<details>
<summary>dropIndexes</summary>

<div>

Drops all indexes on the collection except the default `_id` index.


**Returns:** `error?`

**Sample code:**

```ballerina
check moviesCollection->dropIndexes();
```

</div>

</details>

#### Collection Operations

<details>
<summary>drop</summary>

<div>

Drops the entire collection from the database.


**Returns:** `error?`

**Sample code:**

```ballerina
check moviesCollection->drop();
```

</div>

</details>
