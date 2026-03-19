---
toc_max_heading_level: 4
---

# Actions

The Snowflake connector spans 2 packages:
- `ballerinax/snowflake`
- `ballerinax/snowflake.driver`

Available clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Executes SQL queries, DML/DDL statements, batch operations, and stored procedures using basic authentication. |
| [`Advanced Client`](#advanced-client) | Executes SQL operations with support for both basic and key-pair authentication. |

---

## Client

Executes SQL queries, DML/DDL statements, batch operations, and stored procedures using basic authentication.

### Configuration (`Constructor Parameters`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountIdentifier` | `string` | Required | Snowflake account identifier (e.g., `"myorg-myaccount"`). |
| `user` | `string` | Required | Snowflake username. |
| `password` | `string` | Required | Snowflake password. |
| `options` | `Options?` | `()` | Additional JDBC datasource options. |
| `connectionPool` | `sql:ConnectionPool?` | `()` | Connection pool configuration. |

### Initializing the Client

```ballerina
import ballerinax/snowflake;
import ballerinax/snowflake.driver as _;

configurable string accountIdentifier = ?;
configurable string user = ?;
configurable string password = ?;

snowflake:Client snowflakeClient = check new (accountIdentifier, user, password, options = {
    properties: {"JDBC_QUERY_RESULT_FORMAT": "JSON"}
});
```

### Operations

#### Query Operations

<details>
<summary>query</summary>

<div>

Executes a SQL query and returns the results as a stream of records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL query to execute. |
| `rowType` | `typedesc<record {}>` | No | Expected return record type for each row. |

**Returns:** `stream<rowType, sql:Error?>`

**Sample code:**

```ballerina
type Employee record {
    int employee_id;
    string first_name;
    string last_name;
    string email;
    string phone;
    string job_title;
};

stream<Employee, sql:Error?> employees = snowflakeClient->query(
    `SELECT * FROM EMPLOYEES`
);
```

**Sample response:**

```ballerina
[
  {"employee_id": 1, "first_name": "John", "last_name": "Smith", "email": "john.smith@example.com", "phone": "555-1234", "job_title": "Software Engineer"},
  {"employee_id": 2, "first_name": "Jane", "last_name": "Doe", "email": "jane.doe@example.com", "phone": "555-5678", "job_title": "Data Analyst"}
]
```

</div>

</details>

<details>
<summary>queryRow</summary>

<div>

Executes a SQL query that returns at most one row.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL query to execute. |
| `returnType` | `typedesc<anydata>` | No | Expected return type. |

**Returns:** `returnType|sql:Error`

**Sample code:**

```ballerina
type Employee record {
    int employee_id;
    string first_name;
    string last_name;
    string email;
    string phone;
    string job_title;
};

int id = 1;
Employee employee = check snowflakeClient->queryRow(
    `SELECT * FROM EMPLOYEES WHERE employee_id = ${id}`
);
```

**Sample response:**

```ballerina
{"employee_id": 1, "first_name": "John", "last_name": "Smith", "email": "john.smith@example.com", "phone": "555-1234", "job_title": "Software Engineer"}
```

</div>

</details>

#### DML & DDL Operations

<details>
<summary>execute</summary>

<div>

Executes a DDL or DML SQL statement and returns execution metadata.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL statement to execute. |

**Returns:** `sql:ExecutionResult|sql:Error`

**Sample code:**

```ballerina
sql:ExecutionResult result = check snowflakeClient->execute(
    `INSERT INTO EMPLOYEES (employee_id, first_name, last_name, email, phone, job_title)
     VALUES (6, 'Alice', 'Johnson', 'alice.johnson@example.com', '555-9999', 'Product Manager')`
);
```

**Sample response:**

```ballerina
{"affectedRowCount": 1, "lastInsertId": null}
```

</div>

</details>

<details>
<summary>batchExecute</summary>

<div>

Executes multiple parameterized SQL statements in a single batch.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQueries` | `sql:ParameterizedQuery[]` | Yes | Array of parameterized SQL statements. |

**Returns:** `sql:ExecutionResult[]|sql:Error`

**Sample code:**

```ballerina
sql:ParameterizedQuery[] insertQueries = [
    `INSERT INTO EMPLOYEES (employee_id, first_name, last_name, email, phone, job_title)
     VALUES (7, 'Bob', 'Wilson', 'bob.wilson@example.com', '555-1111', 'Designer')`,
    `INSERT INTO EMPLOYEES (employee_id, first_name, last_name, email, phone, job_title)
     VALUES (8, 'Carol', 'Brown', 'carol.brown@example.com', '555-2222', 'QA Engineer')`
];

sql:ExecutionResult[] results = check snowflakeClient->batchExecute(insertQueries);
```

**Sample response:**

```ballerina
[
  {"affectedRowCount": 1, "lastInsertId": null},
  {"affectedRowCount": 1, "lastInsertId": null}
]
```

</div>

</details>

#### Stored Procedures

<details>
<summary>call</summary>

<div>

Invokes a stored procedure, optionally returning result sets.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedCallQuery` | Yes | The stored procedure call query. |
| `rowTypes` | `typedesc<record {}>[]` | No | Expected record types for result sets. |

**Returns:** `sql:ProcedureCallResult|sql:Error`

**Sample code:**

```ballerina
sql:ProcedureCallResult result = check snowflakeClient->call(
    `CALL GET_EMPLOYEE_COUNT()`
);
```

**Sample response:**

```ballerina
{"executionResult": {"affectedRowCount": -1, "lastInsertId": null}, "queryResult": null}
```

</div>

</details>

#### Connection Management

<details>
<summary>close</summary>

<div>

Closes the client connection and releases the connection pool resources.


**Returns:** `sql:Error?`

**Sample code:**

```ballerina
check snowflakeClient.close();
```

</div>

</details>

---

## Advanced Client

Executes SQL operations with support for both basic and key-pair authentication.

### Configuration (`Constructor Parameters`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `accountIdentifier` | `string` | Required | Snowflake account identifier (e.g., `"myorg-myaccount"`). |
| `authConfig` | `AuthConfig` | Required | Authentication configuration — either `BasicAuth` (user/password) or `KeyBasedAuth` (user/private key). |
| `options` | `Options?` | `()` | Additional JDBC datasource options. |
| `connectionPool` | `sql:ConnectionPool?` | `()` | Connection pool configuration. |

### Initializing the Client

```ballerina
import ballerinax/snowflake;
import ballerinax/snowflake.driver as _;

configurable string accountIdentifier = ?;
configurable string user = ?;
configurable string privateKeyPath = ?;
configurable string privateKeyPassphrase = ?;

snowflake:AdvancedClient snowflakeClient = check new (accountIdentifier, {
    user: user,
    privateKeyPath: privateKeyPath,
    privateKeyPassphrase: privateKeyPassphrase
}, options = {
    properties: {"JDBC_QUERY_RESULT_FORMAT": "JSON"}
});
```

### Operations

#### Query Operations

<details>
<summary>query</summary>

<div>

Executes a SQL query and returns the results as a stream of records.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL query to execute. |
| `rowType` | `typedesc<record {}>` | No | Expected return record type for each row. |

**Returns:** `stream<rowType, sql:Error?>`

**Sample code:**

```ballerina
type Employee record {
    int employee_id;
    string first_name;
    string last_name;
    string email;
};

stream<Employee, sql:Error?> employees = snowflakeClient->query(
    `SELECT employee_id, first_name, last_name, email FROM EMPLOYEES WHERE job_title = ${"Data Analyst"}`
);
```

**Sample response:**

```ballerina
[
  {"employee_id": 2, "first_name": "Jane", "last_name": "Doe", "email": "jane.doe@example.com"}
]
```

</div>

</details>

<details>
<summary>queryRow</summary>

<div>

Executes a SQL query that returns at most one row.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL query to execute. |
| `returnType` | `typedesc<anydata>` | No | Expected return type. |

**Returns:** `returnType|sql:Error`

**Sample code:**

```ballerina
int count = check snowflakeClient->queryRow(
    `SELECT COUNT(*) FROM EMPLOYEES`
);
```

**Sample response:**

```ballerina
5
```

</div>

</details>

#### DML & DDL Operations

<details>
<summary>execute</summary>

<div>

Executes a DDL or DML SQL statement and returns execution metadata.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedQuery` | Yes | The SQL statement to execute. |

**Returns:** `sql:ExecutionResult|sql:Error`

**Sample code:**

```ballerina
int id = 3;
string newTitle = "Senior Engineer";
sql:ExecutionResult result = check snowflakeClient->execute(
    `UPDATE EMPLOYEES SET job_title = ${newTitle} WHERE employee_id = ${id}`
);
```

**Sample response:**

```ballerina
{"affectedRowCount": 1, "lastInsertId": null}
```

</div>

</details>

<details>
<summary>batchExecute</summary>

<div>

Executes multiple parameterized SQL statements in a single batch.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQueries` | `sql:ParameterizedQuery[]` | Yes | Array of parameterized SQL statements. |

**Returns:** `sql:ExecutionResult[]|sql:Error`

**Sample code:**

```ballerina
int[] idsToDelete = [7, 8];
sql:ParameterizedQuery[] deleteQueries = from int id in idsToDelete
    select `DELETE FROM EMPLOYEES WHERE employee_id = ${id}`;

sql:ExecutionResult[] results = check snowflakeClient->batchExecute(deleteQueries);
```

**Sample response:**

```ballerina
[
  {"affectedRowCount": 1, "lastInsertId": null},
  {"affectedRowCount": 1, "lastInsertId": null}
]
```

</div>

</details>

#### Stored Procedures

<details>
<summary>call</summary>

<div>

Invokes a stored procedure, optionally returning result sets.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `sqlQuery` | `sql:ParameterizedCallQuery` | Yes | The stored procedure call query. |
| `rowTypes` | `typedesc<record {}>[]` | No | Expected record types for result sets. |

**Returns:** `sql:ProcedureCallResult|sql:Error`

**Sample code:**

```ballerina
sql:ProcedureCallResult result = check snowflakeClient->call(
    `CALL MY_PROCEDURE(${param1}, ${param2})`
);
```

**Sample response:**

```ballerina
{"executionResult": {"affectedRowCount": -1, "lastInsertId": null}, "queryResult": null}
```

</div>

</details>

#### Connection Management

<details>
<summary>close</summary>

<div>

Closes the client connection and releases the connection pool resources.


**Returns:** `sql:Error?`

**Sample code:**

```ballerina
check snowflakeClient.close();
```

</div>

</details>
