---
sidebar_position: 4
title: CSV & Flat File Processing
description: Parse, transform, and write CSV and flat file data.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CSV & Flat File Processing

Handle tabular data formats -- CSV, TSV, and fixed-width files. The `ballerina/data.csv` module provides type-safe parsing, transformation, and serialization for comma-separated and delimited data.

## Reading CSV into Records

Parse CSV content directly into typed Ballerina records using `csv:parseString()`. Define a record type whose fields match the CSV column headers.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Define the record type** — Navigate to **Types** in the sidebar and click **+** to add a new type. Select **Create from scratch**, set **Kind** to **Record**, and name it `Employee`. Add fields using the **+** button:

   | Field | Type |
   |---|---|
   | `name` | `string` |
   | `department` | `string` |
   | `salary` | `decimal` |
   | `yearsOfService` | `int` |

   For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

   ![Types panel showing the Employee record created from scratch with fields matching CSV columns](/img/develop/transform/csv-flat-file/csv-reading-type-panel.png)

2. **Add a Variable step for parsing** — In the flow designer, click **+** and select **Variable**. Set the type to `Employee[]` and the expression to `check csv:parseString(csvData)`.

3. **Add a Foreach step** — Click **+** and select **Foreach** under **Control**. Set the **Collection** to `employees` and the **Variable** to `emp`. Add steps inside the loop body for processing.

   ![Flow designer showing CSV parsing variable and foreach loop](/img/develop/transform/csv-flat-file/csv-reading-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/data.csv;
import ballerina/io;

type Employee record {|
    string name;
    string department;
    decimal salary;
    int yearsOfService;
|};

public function main() returns error? {
    string csvData = string `name,department,salary,yearsOfService
Alice,Engineering,95000.00,5
Bob,Sales,72000.00,3
Carol,Engineering,110000.00,8`;

    Employee[] employees = check csv:parseString(csvData);

    foreach Employee emp in employees {
        io:println(string `${emp.name} (${emp.department}): $${emp.salary}`);
    }
}
```

</TabItem>
</Tabs>

## Reading CSV from Files and Streams

Use `csv:parseBytes()` for byte arrays or `csv:parseStream()` for streaming large files without loading them entirely into memory.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Define the record type** — Navigate to **Types** and click **+**. Select **Create from scratch**, set **Kind** to **Record**, and name it `Transaction`. Add fields: `date` (string), `description` (string), `amount` (decimal), `category` (string). For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add Variable steps** — In the flow designer, add a **Variable** step to read the file bytes (`check io:fileReadBytes("transactions.csv")`), then a second **Variable** step with type `Transaction[]` and expression `check csv:parseBytes(content)`.

   ![Flow designer showing file read and CSV parse steps](/img/develop/transform/csv-flat-file/csv-files-streams-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/data.csv;
import ballerina/io;

type Transaction record {|
    string date;
    string description;
    decimal amount;
    string category;
|};

public function main() returns error? {
    // Read from file as bytes
    byte[] content = check io:fileReadBytes("transactions.csv");
    Transaction[] transactions = check csv:parseBytes(content);

    // Or stream large files for memory efficiency
    stream<byte[], io:Error?> byteStream = check io:fileReadBlocksAsStream("large-data.csv");
    Transaction[] streamed = check csv:parseStream(byteStream);
}
```

</TabItem>
</Tabs>

## Selective Column Projection

Use closed record types to select only the columns you need. Columns not represented in the target record are automatically skipped.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Define a subset record type** — Navigate to **Types** and click **+**. Select **Create from scratch**, set **Kind** to **Record**, and name it `EmployeeSummary`. Add only the fields you need: `name` (string) and `salary` (decimal). Columns not represented in the record are automatically skipped during parsing.

2. **Add a Variable step** — Set the type to `EmployeeSummary[]` and the expression to `check csv:parseString(csvData)`.

   ![Flow designer showing selective column projection with a subset record type](/img/develop/transform/csv-flat-file/csv-projection-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/data.csv;

// Only extract name and salary from a CSV with many columns
type EmployeeSummary record {|
    string name;
    decimal salary;
|};

public function main() returns error? {
    string csvData = string `name,department,salary,yearsOfService,location
Alice,Engineering,95000.00,5,Seattle
Bob,Sales,72000.00,3,New York`;

    // Only name and salary are extracted
    EmployeeSummary[] summaries = check csv:parseString(csvData);
}
```

</TabItem>
</Tabs>

## Custom Delimiters and Options

Configure parsing behavior for TSV, pipe-delimited, or other non-standard formats.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Define the record type** — Navigate to **Types** and click **+**. Select **Create from scratch**, set **Kind** to **Record**, and name it `LogEntry`. Add fields: `timestamp` (string), `level` (string), `message` (string).

2. **Add a Variable step** — Set the type to `LogEntry[]` and the expression to `check csv:parseString(tsvData, {delimiter: "\t"})`. The second argument specifies parsing options such as the delimiter character.

   ![Flow designer showing CSV parse with custom delimiter configuration](/img/develop/transform/csv-flat-file/csv-custom-delimiters-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/data.csv;

type LogEntry record {|
    string timestamp;
    string level;
    string message;
|};

public function main() returns error? {
    // Tab-separated values
    string tsvData = string `timestamp	level	message
2025-03-15T10:00:00Z	INFO	Service started
2025-03-15T10:01:23Z	ERROR	Connection refused`;

    LogEntry[] logs = check csv:parseString(tsvData, {delimiter: "\t"});
}
```

</TabItem>
</Tabs>

## Headerless CSV

Parse CSV files that have no header row by specifying `headerRows: 0` and using array-based output or mapping by position.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Add a Variable step** — In the flow designer, click **+** and select **Variable**. Set the type to `string[][]` and the expression to `check csv:parseString(csvData, {headerRows: 0})`. The `headerRows: 0` option tells the parser that the CSV has no header row.

   ![Flow designer showing headerless CSV parsing into string arrays](/img/develop/transform/csv-flat-file/csv-headerless-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/data.csv;

public function main() returns error? {
    string csvData = string `Alice,Engineering,95000
Bob,Sales,72000`;

    // Parse into arrays of strings
    string[][] rows = check csv:parseString(csvData, {headerRows: 0});
}
```

</TabItem>
</Tabs>

## Writing CSV Output

Convert record arrays to CSV strings using `csv:transform()` and write them to files.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Define the record type** — Navigate to **Types** and click **+**. Select **Create from scratch**, set **Kind** to **Record**, and name it `Product`. Add fields: `sku` (string), `name` (string), `price` (decimal), `stock` (int). For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add a Variable step for transformation** — Set the type to `string[][]` and the expression to `check csv:transform(products)`.

3. **Add a Foreach step** — Set the **Collection** to `rows` and the **Variable** to `row`. Inside the loop, add steps to build the CSV output string.

4. **Add a Function Call step** — Call `io:fileWriteString("products.csv", csvOutput)` to write the output.

   ![Flow designer showing CSV transform and file write steps](/img/develop/transform/csv-flat-file/csv-writing-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/data.csv;
import ballerina/io;

type Product record {|
    string sku;
    string name;
    decimal price;
    int stock;
|};

public function main() returns error? {
    Product[] products = [
        {sku: "WDG-01", name: "Widget", price: 29.99, stock: 150},
        {sku: "GDG-02", name: "Gadget", price: 49.99, stock: 42},
        {sku: "GZM-03", name: "Gizmo", price: 19.99, stock: 0}
    ];

    // Convert records to string arrays for CSV output
    string[][] rows = check csv:transform(products);

    // Write with header
    string csvOutput = "sku,name,price,stock\n";
    foreach string[] row in rows {
        csvOutput += string:'join(",", ...row) + "\n";
    }
    check io:fileWriteString("products.csv", csvOutput);
}
```

</TabItem>
</Tabs>

## Transforming Between Record Types

Use `csv:transform()` to reshape CSV data from one record type to another.

<Tabs>
<TabItem value="ui" label="Visual Designer" default>

1. **Define the source and target record types** — Navigate to **Types** and click **+**. Create `RawOrder` with fields matching the CSV headers (`order_id`, `customer_name`, `item_sku`, `quantity`, `unit_price` — all string). Then create `ProcessedOrder` with fields `orderId` (string), `customer` (string), `total` (decimal). For details on creating types, see [Types](../integration-artifacts/supporting/types.md).

2. **Add a Variable step for parsing** — Set the type to `RawOrder[]` and the expression to `check csv:parseString(csvData)`.

3. **Add a Variable step with query expression** — Set the type to `ProcessedOrder[]` and use a query expression to transform: `from RawOrder r in raw ... select { orderId: r.order_id, customer: r.customer_name, total: ... }`.

4. **Add a Foreach step** — Iterate over the processed records for output.

   ![Flow designer showing CSV parse, query transform, and foreach output steps](/img/develop/transform/csv-flat-file/csv-transform-flow.png)

</TabItem>
<TabItem value="code" label="Ballerina Code">

```ballerina
import ballerina/data.csv;
import ballerina/io;

type RawOrder record {|
    string order_id;
    string customer_name;
    string item_sku;
    string quantity;
    string unit_price;
|};

type ProcessedOrder record {|
    string orderId;
    string customer;
    decimal total;
|};

public function main() returns error? {
    string csvData = string `order_id,customer_name,item_sku,quantity,unit_price
ORD-001,Acme Corp,WDG-01,5,29.99
ORD-002,Globex Inc,GDG-02,2,49.99`;

    RawOrder[] raw = check csv:parseString(csvData);

    // Transform to a different record type
    ProcessedOrder[] processed = from RawOrder r in raw
        let int qty = check int:fromString(r.quantity)
        let decimal price = check decimal:fromString(r.unit_price)
        select {
            orderId: r.order_id,
            customer: r.customer_name,
            total: <decimal>qty * price
        };

    foreach ProcessedOrder ord in processed {
        io:println(string `${ord.orderId}: ${ord.customer} - $${ord.total}`);
    }
}
```

</TabItem>
</Tabs>

## Edge Cases

### Quoted fields and special characters

The `ballerina/data.csv` module handles RFC 4180 compliant CSV by default, including quoted fields with commas, newlines, and escaped quotes.

### Encoding

Specify byte encoding when reading files with non-UTF-8 content by converting to byte arrays before parsing.

### Large files

Use `csv:parseStream()` or `csv:parseToStream()` for memory-efficient processing of large CSV files. The stream-based API processes records incrementally without loading the entire file.

## What's Next

- [EDI Processing](edi.md) -- Enterprise data interchange formats
