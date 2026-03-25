# Section 6: Develop

**Question this section answers:** "How do I build, transform, and test X?"

**Audience:** Developer actively building integrations. Has completed Get Started. Knows basic Ballerina syntax or is using low-code designer.

**Tone:** Practical, task-oriented, handbook-style. 3-minute reads with specific answers. NOT tutorials (those go in Section 9).

**Boundary rule:** Everything while code is on your machine. AI-assisted dev (Copilot) stays here. AI-powered integrations (agents, RAG, MCP) → GenAI.

---

## 6.1 Create Integrations

### Page: Create a New Integration

**File:** `en/docs/develop/create-integrations/create-new-integration.md`

**What to cover:**
- Create from IDE Command Palette
- Create from CLI: `bal new`
- Project templates available (service, library, etc.)
- Choosing between single-file and multi-module projects
- Project structure after creation

### Page: Open an Integration or Project

**File:** `en/docs/develop/create-integrations/open-integration-or-project.md`

**What to cover:**
- Open existing Ballerina project in the IDE
- Open from file system vs from recent projects
- Recognizing project structure (Ballerina.toml)
- Opening multi-module projects

### Page: Explore Samples

**File:** `en/docs/develop/create-integrations/explore-samples.md`

**What to cover:**
- Built-in sample gallery in the IDE
- Categories of samples available
- How to clone and run a sample
- Modifying samples as starting points

### Page: Create a Library

**File:** `en/docs/develop/create-integrations/create-library.md`

**What to cover:**
- What a Ballerina library is vs an integration project
- Create library project: `bal new -t lib`
- Writing reusable modules
- Publishing to Ballerina Central

### Page: Migrate 3rd-Party Integrations

**File:** `en/docs/develop/create-integrations/migrate-3rd-party-integrations.md`

**What to cover:**
- Overview of migration paths (MuleSoft, TIBCO, WSO2 MI)
- Common patterns that map between platforms
- Tools available for assisted migration
- Link to detailed migration guides in Tutorials section

---

## 6.2 Project Views

### Page: Project View

**File:** `en/docs/develop/project-views/project-view.md`

**What to cover:**
- What Project View shows (file-system structure)
- Navigating modules, resources, tests
- Adding/removing files from project view

### Page: Integration View

**File:** `en/docs/develop/project-views/integration-view.md`

**What to cover:**
- What Integration View shows (logical view of services, connectors, data mappers)
- Switching between Project and Integration views
- How integration view groups artifacts

### Page: Library View

**File:** `en/docs/develop/project-views/library-view.md`

**What to cover:**
- Viewing imported packages and their APIs
- Navigating library documentation inline
- Finding available functions/types from a connector

---

## 6.3 Integration Artifacts

### Page: Automation

**File:** `en/docs/develop/integration-artifacts/automation.md`

**What to cover:**
- What an automation is (task without a network listener)
- Scheduled automations (cron-like)
- One-shot automations (triggered by main function)
- Complete code example: scheduled job that fetches data and sends email
- Visual designer: how to create an automation

### Page: HTTP Service

**File:** `en/docs/develop/integration-artifacts/service/http-service.md`

**What to cover:**
- Create an HTTP service with resource functions
- GET, POST, PUT, DELETE resources
- Path parameters, query parameters, headers
- Request/response payload handling (JSON, XML)
- CORS configuration
- Complete example: REST API with CRUD operations
- Error handling in HTTP services

### Page: GraphQL Service

**File:** `en/docs/develop/integration-artifacts/service/graphql-service.md`

**What to cover:**
- Create a GraphQL service
- Schema-first vs code-first approach
- Queries, mutations, subscriptions
- Resolver functions
- Complete example: GraphQL API for product catalog

### Page: TCP Service

**File:** `en/docs/develop/integration-artifacts/service/tcp-service.md`

**What to cover:**
- Raw TCP listener for custom protocols
- Reading/writing byte streams
- Connection management
- Use cases: legacy system integration, custom wire protocols

### Page: WebSub Service

**File:** `en/docs/develop/integration-artifacts/service/websub-service.md`
**Status:** EXISTS — review and enhance

**What to cover:**
- WebSub protocol overview (publisher/subscriber/hub)
- Creating a WebSub subscriber
- Handling subscription verification
- Processing content distribution notifications
- Security: HMAC signature verification
- Complete example: GitHub webhook subscriber

### Page: gRPC Service

**File:** `en/docs/develop/integration-artifacts/service/grpc-service.md`

**What to cover:**
- Generate service from .proto file using `bal grpc`
- Unary, server streaming, client streaming, bidirectional
- Complete example: gRPC service with protobuf
- Testing gRPC services

### Page: Kafka Event Handler

**File:** `en/docs/develop/integration-artifacts/event/kafka.md`

**What to cover:**
- Kafka consumer listener setup
- Topic subscription and consumer groups
- Message deserialization (Avro, JSON, string)
- Offset management (auto-commit, manual)
- Error handling and dead letter topics
- Complete example: Kafka consumer that processes orders

### Page: RabbitMQ Event Handler

**File:** `en/docs/develop/integration-artifacts/event/rabbitmq.md`

**What to cover:**
- RabbitMQ listener setup
- Queue binding and exchange configuration
- Message acknowledgment
- Complete example: RabbitMQ consumer

### Page: MQTT Event Handler

**File:** `en/docs/develop/integration-artifacts/event/mqtt.md`

**What to cover:**
- MQTT client/subscriber setup
- Topic subscriptions with wildcards
- QoS levels
- IoT use cases
- Complete example: MQTT subscriber for sensor data

### Page: Azure Service Bus Event Handler

**File:** `en/docs/develop/integration-artifacts/event/azure-service-bus.md`

**What to cover:**
- Azure Service Bus queue/topic listener
- Session handling
- Dead letter queue processing

### Page: SMTP Event Handler

**File:** `en/docs/develop/integration-artifacts/event/smtp.md`

**What to cover:**
- Sending emails via SMTP
- HTML and plain text emails
- Attachments
- Connection pooling

### Page: POP3/IMAP4 Event Handler

**File:** `en/docs/develop/integration-artifacts/event/pop3-imap4.md`

**What to cover:**
- Polling for new emails
- Reading email content and attachments
- Marking as read/deleting
- IMAP IDLE for push notifications

### Page: Salesforce Events

**File:** `en/docs/develop/integration-artifacts/event/salesforce-events.md`

**What to cover:**
- Salesforce Platform Events listener
- Salesforce Change Data Capture (CDC)
- Push Topics
- Replay ID handling for reliable delivery

### Page: Twilio Events

**File:** `en/docs/develop/integration-artifacts/event/twilio.md`

**What to cover:**
- Twilio webhook handler for incoming SMS/calls
- Status callbacks
- Processing TwiML responses

### Page: GitHub Webhooks

**File:** `en/docs/develop/integration-artifacts/event/github-webhooks.md`

**What to cover:**
- GitHub webhook listener
- Event types (push, pull_request, issues, etc.)
- Signature verification (HMAC-SHA256)
- Complete example: GitHub → Slack notification

### Page: Solace Event Handler

**File:** `en/docs/develop/integration-artifacts/event/solace.md`

**What to cover:**
- Solace PubSub+ consumer setup
- Topic subscriptions
- Guaranteed messaging

### Page: CDC-MSSQL

**File:** `en/docs/develop/integration-artifacts/event/cdc-mssql.md`

**What to cover:**
- Change Data Capture for MSSQL
- Listening for INSERT, UPDATE, DELETE events
- Processing change records
- Polling interval configuration

### Page: CDC-PostgreSQL

**File:** `en/docs/develop/integration-artifacts/event/cdc-postgresql.md`

**What to cover:**
- Change Data Capture for PostgreSQL
- Logical replication setup
- Processing WAL events

### Page: FTP/SFTP File Handler

**File:** `en/docs/develop/integration-artifacts/file/ftp-sftp.md`

**What to cover:**
- FTP/SFTP listener that watches for new files
- File matching patterns (glob, regex)
- Processing files: read, transform, move/delete
- Complete example: CSV file ingestion pipeline

### Page: Local Files Handler

**File:** `en/docs/develop/integration-artifacts/file/local-files.md`

**What to cover:**
- Local filesystem watcher
- Directory polling
- File operations: read, write, copy, move, delete

### Pages: Other Artifacts (5 pages)

**Files:** `en/docs/develop/integration-artifacts/supporting/types.md`, `connections.md`, `configurations.md`, `functions.md`, `data-mapper.md`

**What to cover for each:**
- **Types** — Custom record types, type definitions, type narrowing
- **Connections** — Named, reusable credential configs for external services
- **Configurations** — Configurable variables, Config.toml, environment overrides
- **Functions** — Reusable function definitions, function signatures
- **Data Mapper** — Visual data transformation tool, field mapping, expressions

---

## 6.4 Design Integration Logic

### Page: Overview

**File:** `en/docs/develop/design-logic/overview.md`

**What to cover:**
- What "integration logic" means — the code between receiving a request and sending a response
- Visual designer vs pro-code for logic design
- When to use Flow Designer vs direct code

### Page: Flow Designer

**File:** `en/docs/develop/design-logic/flow-designer.md`

**What to cover:**
- Opening Flow Designer in the IDE
- Adding nodes: connectors, conditions, loops, data mappers
- Connecting nodes with arrows
- Generated code preview
- Limitations of Flow Designer vs pro-code

### Page: Connections

**File:** `en/docs/develop/design-logic/connections.md`

**What to cover:**
- Creating named connections in visual designer
- Connection configuration (credentials, endpoints)
- Reusing connections across services
- Environment-specific connection configs

### Page: Control Flow

**File:** `en/docs/develop/design-logic/control-flow.md`

**What to cover:**
- if/else, match expressions
- foreach loops, while loops
- Workers (parallel execution)
- Wait expressions
- Lock for shared state

### Page: Error Handling

**File:** `en/docs/develop/design-logic/error-handling.md`

**What to cover:**
- Ballerina error model (error type, distinct errors)
- `check` expression
- `do/on fail` blocks
- Error propagation vs local handling
- Retry patterns
- Complete example: resilient integration with error handling

### Page: Expressions

**File:** `en/docs/develop/design-logic/expressions.md`

**What to cover:**
- Ballerina expressions overview
- String templates
- XML literals
- Regular expressions
- Type test expressions (`is`)

### Page: Query Expressions

**File:** `en/docs/develop/design-logic/query-expressions.md`

**What to cover:**
- SQL-like syntax: `from`, `where`, `select`, `let`, `order by`, `limit`, `join`
- Querying over arrays, maps, XML, tables
- Aggregation
- Complete example: filter and transform a list of records

### Page: Configuration Management

**File:** `en/docs/develop/design-logic/configuration-management.md`

**What to cover:**
- `configurable` keyword
- Config.toml file format
- Environment variable overrides
- Secrets handling (keystores, env vars)
- Per-environment configs

### Page: Functions

**File:** `en/docs/develop/design-logic/functions.md`

**What to cover:**
- Function definitions
- Default parameters, rest parameters
- Function pointers and lambda expressions
- Isolated functions for concurrency safety

### Page: Ballerina Pro-Code

**File:** `en/docs/develop/design-logic/ballerina-pro-code.md`

**What to cover:**
- When to switch from visual designer to pro-code
- Full language features available in pro-code
- Sequence diagram view
- Code-to-visual sync

### Page: Java Interoperability

**File:** `en/docs/develop/design-logic/java-interoperability.md`

**What to cover:**
- Calling Java from Ballerina (`@java:Binding`)
- Mapping Java types to Ballerina types
- Using Java libraries as dependencies
- Performance considerations
- Complete example: calling a Java library from Ballerina

---

## 6.5 Transform

### Page: Visual Data Mapper

**File:** `en/docs/develop/transform/data-mapper.md`

**What to cover:**
- Opening Data Mapper in the IDE
- Source → Target field mapping
- Expressions in mappings
- Custom transformation functions
- Preview and test

### Pages: Format-specific processing (JSON, XML, CSV, EDI, YAML/TOML)

**Files:** `en/docs/develop/transform/json.md`, `xml.md`, `csv-flat-file.md`, `edi.md`, `yaml-toml.md`

**For each format, cover:**
- Reading/parsing the format
- Writing/serializing the format
- Transforming between formats
- Common patterns (e.g., JSON → XML conversion)
- Complete runnable code example

### Page: Type System & Records

**File:** `en/docs/develop/transform/type-system.md`

**What to cover:**
- Ballerina's structural type system for data transformation
- Record types as data contracts
- Open vs closed records
- Type narrowing in transformations

### Page: Query Expressions for Transformation

**File:** `en/docs/develop/transform/query-expressions.md`

**What to cover:**
- Using `from/where/select` for data transformation
- Combining query expressions with type conversion
- Joining multiple data sources
- Grouping and aggregation

### Page: Expressions & Functions

**File:** `en/docs/develop/transform/expressions-functions.md`

**What to cover:**
- String manipulation functions
- Numeric functions
- Date/time processing
- Regular expressions for transformation
- Custom transformation functions

---

## 6.6 Try & Test

### Page: Try-It Tool (HTTP & GraphQL)

**File:** `en/docs/develop/test/try-it.md`

**What to cover:**
- Built-in Try-It tool in the IDE
- Testing HTTP endpoints (set headers, body, params)
- Testing GraphQL queries/mutations
- Viewing response details

### Page: Unit Testing

**File:** `en/docs/develop/test/unit-testing.md`

**What to cover:**
- Ballerina test framework basics
- Writing test functions (`@test:Config`)
- Assertions (`test:assertEquals`, `test:assertTrue`)
- Test lifecycle (before/after)
- Running tests: `bal test` and IDE test runner

### Page: Test Services & Clients

**File:** `en/docs/develop/test/test-services-clients.md`

**What to cover:**
- Testing HTTP services with mock clients
- Testing clients with mock services
- Integration testing patterns

### Page: Data-Driven Tests

**File:** `en/docs/develop/test/data-driven-tests.md`

**What to cover:**
- Parameterized tests with data providers
- CSV/JSON test data files
- Running same test with different inputs

### Page: Test Groups

**File:** `en/docs/develop/test/test-groups.md`

**What to cover:**
- Grouping tests by category
- Running specific groups: `bal test --groups integration`
- Skip/include group patterns

### Page: Mocking

**File:** `en/docs/develop/test/mocking.md`

**What to cover:**
- Object mocking (`test:mock`)
- Function mocking
- Mocking external service calls
- When to mock vs when to use integration tests

### Page: Execute Tests

**File:** `en/docs/develop/test/execute-tests.md`

**What to cover:**
- Running tests from CLI: `bal test`
- Running tests from the IDE
- Sequential vs parallel execution
- Test filtering and selection

### Page: Code Coverage & Reporting

**File:** `en/docs/develop/test/code-coverage.md`

**What to cover:**
- Enable coverage: `bal test --code-coverage`
- Reading coverage reports (HTML, Jacoco)
- Coverage thresholds in CI

### Page: AI-Generated Test Cases

**File:** `en/docs/develop/test/ai-test-generation.md`

**What to cover:**
- Using Ballerina Copilot to generate tests
- Reviewing and refining generated tests
- Limitations and when to write manual tests

---

## 6.7 Debugging & Troubleshooting

### Page: Overview

**File:** `en/docs/develop/debugging/overview.md`

### Page: Editor Debugging

**File:** `en/docs/develop/debugging/editor-debugging.md`

**What to cover:**
- Setting breakpoints in the IDE
- Debug configurations (launch.json)
- Variable inspection, watch expressions
- Step over/into/out
- Debug console

### Page: Remote Debugging

**File:** `en/docs/develop/debugging/remote-debugging.md`

**What to cover:**
- Enabling remote debug: `bal run --debug <port>`
- Connecting the IDE to remote process
- Debugging Docker containers
- Debugging in Kubernetes

### Page: Strand Dumps

**File:** `en/docs/develop/debugging/strand-dumps.md`

**What to cover:**
- What strands are (Ballerina's lightweight threads)
- Generating strand dump
- Analyzing strand dump for deadlocks/hangs

### Page: Performance Profiling

**File:** `en/docs/develop/debugging/performance-profiling.md`

**What to cover:**
- Ballerina profiler
- CPU and memory profiling
- Flame graphs
- Identifying bottlenecks

---

## 6.8 Organize Code

### Pages: Packages & Modules, Package References, Managing Dependencies, Workspaces, Code Style Guide, Generating Documentation

**Files:** `en/docs/develop/organize-code/` (6 pages)

**What to cover per page:**
- **Packages & Modules** — Package structure, module organization, visibility
- **Package References** — Importing packages, version resolution, Ballerina Central
- **Managing Dependencies** — Dependencies.toml, updating, conflict resolution
- **Workspaces** — Multi-package workspaces, shared dependencies
- **Code Style Guide** — Formatting rules, `bal format`, naming conventions
- **Generating Documentation** — `bal doc`, API documentation from code comments

---

## 6.9 Tools

### Pages: Migration Tools, OpenAPI Tool, GraphQL Tool, AsyncAPI Tool, gRPC Tool, Health Tool, EDI Tool, WSDL Tool, XSD Tool

**Files:** `en/docs/develop/tools/` (9 individual tool pages)

**For each tool, cover:**
- What it does (one paragraph)
- Installation / availability
- CLI usage with flags and options
- Complete example: generate code from spec
- Output explanation

**Specific focus per tool:**
- **Migration Tools** — MuleSoft, TIBCO, WSO2 MI migration assistants
- **OpenAPI Tool** — `bal openapi` generate service/client from spec
- **GraphQL Tool** — `bal graphql` generate from schema
- **AsyncAPI Tool** — Generate from AsyncAPI spec
- **gRPC Tool** — `bal grpc` generate from .proto files
- **Health Tool** — `bal health` FHIR/HL7 healthcare standard support
- **EDI Tool** — `bal edi` EDI schema processing
- **WSDL Tool** — Generate from WSDL (SOAP services)
- **XSD Tool** — Generate records from XSD

### Pages: Data Persistence (5 sub-pages)

**Files:** `en/docs/develop/tools/data-persistence/`

- **Overview** — What `bal persist` is, when to use it
- **Data Model Definition** — Defining entities with annotations
- **Type-Safe Client API (CRUD)** — Generated create/read/update/delete operations
- **Supported Stores** — MySQL, PostgreSQL, MSSQL, SQLite, Google Sheets, Redis, MongoDB
- **Database Introspection** — Generate model from existing database

### Page: Scan Tool

**File:** `en/docs/develop/tools/scan-tool.md`

**What to cover:**
- Static analysis with `bal scan`
- Built-in rules
- Custom rule development
- Integration with CI/CD
