---
toc_max_heading_level: 4
---

# Actions

The `ballerinax/trello` package exposes the following clients:

| Client | Purpose |
|--------|---------|
| [`Client`](#client) | Trello REST API — boards, lists, cards, members, labels, checklists, search, webhooks. |

---

## Client

Trello REST API — boards, lists, cards, members, labels, checklists, search, webhooks.

### Configuration (`ConnectionConfig`)

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `apiKeyConfig` | `ApiKeysConfig` | Required | API key and token configuration containing `key` and `token` fields. |
| `config` | `ConnectionConfig` | `{}` | HTTP client connection configuration. |
| `serviceUrl` | `string` | `"https://api.trello.com/1"` | Base URL for the Trello API. |

### Initializing the Client

```ballerina
import ballerinax/trello;

configurable string apiKey = ?;
configurable string apiToken = ?;

trello:Client trello = check new ({
    key: apiKey,
    token: apiToken
});
```

### Operations

#### Boards

<details>
<summary>Get a Board</summary>

<div>

Retrieves a board by its Trello ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |

**Returns:** `Board|error`

**Sample code:**

```ballerina
trello:Board board = check trello->/boards/[boardId];
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678901", "name": "My Project Board", "desc": "Board for tracking tasks", "closed": false, "url": "https://trello.com/b/abc123/my-project-board"}
```

</div>

</details>

<details>
<summary>Create Board</summary>

<div>

Creates a new board.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `PostBoardsQueries` | Yes | Query parameters including `name` (required), `defaultLabels`, `defaultLists`, `desc`, `idOrganization`, and more. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/boards.post(queries = {name: "New Project Board"});
```

</div>

</details>

<details>
<summary>Update a Board</summary>

<div>

Updates a board's properties such as name, description, or closed status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |
| `queries` | `PutBoardsIdQueries` | No | Query parameters for fields to update. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/boards/[boardId].put(queries = {name: "Updated Board Name", desc: "New description"});
```

</div>

</details>

<details>
<summary>Delete a Board</summary>

<div>

Permanently deletes a board.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the board. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/boards/[boardId].delete();
```

</div>

</details>

<details>
<summary>Get Lists on a Board</summary>

<div>

Retrieves all lists on a board.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |

**Returns:** `TrelloList[]|error`

**Sample code:**

```ballerina
trello:TrelloList[] lists = check trello->/boards/[boardId]/lists;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678902", "name": "To Do", "closed": false, "pos": 16384, "idBoard": "60d5f2c8e4b0a12345678901"}, {"id": "60d5f2c8e4b0a12345678903", "name": "In Progress", "closed": false, "pos": 32768, "idBoard": "60d5f2c8e4b0a12345678901"}]
```

</div>

</details>

<details>
<summary>Create a List on a Board</summary>

<div>

Creates a new list on a board.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |
| `queries` | `PostBoardsIdListsQueries` | Yes | Query parameters including `name` (required) and `pos`. |

**Returns:** `TrelloList|error`

**Sample code:**

```ballerina
trello:TrelloList newList = check trello->/boards/[boardId]/lists.post(queries = {name: "Done"});
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678904", "name": "Done", "closed": false, "pos": 49152, "idBoard": "60d5f2c8e4b0a12345678901"}
```

</div>

</details>

<details>
<summary>Get the Members of a Board</summary>

<div>

Retrieves all members of a board.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/boards/[boardId]/members;
```

</div>

</details>

<details>
<summary>Get Labels on a Board</summary>

<div>

Retrieves all labels on a board.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/boards/[boardId]/labels;
```

</div>

</details>

<details>
<summary>Create a Label on a Board</summary>

<div>

Creates a new label on a board.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | Yes | The ID of the board. |
| `queries` | `PostBoardsIdLabelsQueries` | Yes | Query parameters including `name` and `color`. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/boards/[boardId]/labels.post(queries = {name: "Urgent", color: "red"});
```

</div>

</details>

<details>
<summary>Get Custom Fields for Board</summary>

<div>

Retrieves all custom field definitions on a board.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the board. |

**Returns:** `CustomField[]|error`

**Sample code:**

```ballerina
trello:CustomField[] fields = check trello->/boards/[boardId]/customFields;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678910", "idModel": "60d5f2c8e4b0a12345678901", "name": "Priority", "type": "list", "pos": 1}]
```

</div>

</details>

#### Lists

<details>
<summary>Get a List</summary>

<div>

Retrieves a list by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |

**Returns:** `TrelloList|error`

**Sample code:**

```ballerina
trello:TrelloList list = check trello->/lists/[listId];
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678902", "name": "To Do", "closed": false, "pos": 16384, "idBoard": "60d5f2c8e4b0a12345678901"}
```

</div>

</details>

<details>
<summary>Update a List</summary>

<div>

Updates a list's properties such as name, position, or closed status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |
| `queries` | `PutListsIdQueries` | No | Query parameters for fields to update. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/lists/[listId].put(queries = {name: "Completed"});
```

</div>

</details>

<details>
<summary>Get Cards in a List</summary>

<div>

Retrieves all cards in a list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |

**Returns:** `Card[]|error`

**Sample code:**

```ballerina
trello:Card[] cards = check trello->/lists/[listId]/cards;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678905", "name": "Design mockups", "desc": "Create UI mockups", "closed": false, "idList": "60d5f2c8e4b0a12345678902", "pos": 16384}]
```

</div>

</details>

<details>
<summary>Archive all Cards in a List</summary>

<div>

Archives all cards in the specified list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/lists/[listId]/archiveAllCards.post();
```

</div>

</details>

<details>
<summary>Move all Cards in a List</summary>

<div>

Moves all cards in a list to another board and/or list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |
| `queries` | `PostListsIdMoveallcardsQueries` | Yes | Query parameters including target `idBoard` and `idList`. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/lists/[listId]/moveAllCards.post(queries = {idBoard: targetBoardId, idList: targetListId});
```

</div>

</details>

<details>
<summary>Get Board of a List</summary>

<div>

Retrieves the board that a list belongs to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the list. |

**Returns:** `Board|error`

**Sample code:**

```ballerina
trello:Board board = check trello->/lists/[listId]/board;
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678901", "name": "My Project Board", "closed": false}
```

</div>

</details>

#### Cards

<details>
<summary>Create a new Card</summary>

<div>

Creates a new card on a specified list.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `PostCardsQueries` | Yes | Query parameters including `idList` (required), `name`, `desc`, `pos`, `due`, `idMembers`, `idLabels`, and more. |

**Returns:** `Card|error`

**Sample code:**

```ballerina
trello:Card card = check trello->/cards.post(queries = {
    idList: listId,
    name: "Implement login feature",
    desc: "Add OAuth 2.0 login support"
});
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678905", "name": "Implement login feature", "desc": "Add OAuth 2.0 login support", "closed": false, "idList": "60d5f2c8e4b0a12345678902", "url": "https://trello.com/c/xyz789"}
```

</div>

</details>

<details>
<summary>Get a Card</summary>

<div>

Retrieves a card by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |

**Returns:** `Card|error`

**Sample code:**

```ballerina
trello:Card card = check trello->/cards/[cardId];
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678905", "name": "Implement login feature", "desc": "Add OAuth 2.0 login support", "closed": false, "idList": "60d5f2c8e4b0a12345678902", "pos": 16384, "due": "2026-04-01T12:00:00.000Z"}
```

</div>

</details>

<details>
<summary>Update a Card</summary>

<div>

Updates a card's properties such as name, description, due date, or list assignment.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |
| `queries` | `PutCardsIdQueries` | No | Query parameters for fields to update. |

**Returns:** `Card|error`

**Sample code:**

```ballerina
trello:Card updated = check trello->/cards/[cardId].put(queries = {name: "Updated card name"});
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678905", "name": "Updated card name", "closed": false, "idList": "60d5f2c8e4b0a12345678902"}
```

</div>

</details>

<details>
<summary>Delete a Card</summary>

<div>

Permanently deletes a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |

**Returns:** `TrelloList|error`

**Sample code:**

```ballerina
_ = check trello->/cards/[cardId].delete();
```

</div>

</details>

<details>
<summary>Get Actions on a Card</summary>

<div>

Retrieves the actions (activity history) on a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |

**Returns:** `Action[]|error`

**Sample code:**

```ballerina
trello:Action[] actions = check trello->/cards/[cardId]/actions;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678920", "type": "updateCard", "date": "2026-03-15T10:30:00.000Z", "idMemberCreator": "60d5f2c8e4b0a12345678930"}]
```

</div>

</details>

<details>
<summary>Get Attachments on a Card</summary>

<div>

Retrieves all attachments on a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |

**Returns:** `InlineResponseItems2001[]|error`

**Sample code:**

```ballerina
trello:InlineResponseItems2001[] attachments = check trello->/cards/[cardId]/attachments;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678940", "name": "design.png", "url": "https://trello.com/1/cards/abc/attachments/xyz/download/design.png", "bytes": 204800}]
```

</div>

</details>

<details>
<summary>Create Attachment On Card</summary>

<div>

Creates an attachment on a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |
| `queries` | `PostCardsIdAttachmentsQueries` | No | Query parameters including `name`, `url`, `mimeType`. |

**Returns:** `InlineResponseItems2002[]|error`

**Sample code:**

```ballerina
trello:InlineResponseItems2002[] attachment = check trello->/cards/[cardId]/attachments.post(
    queries = {name: "Reference Doc", url: "https://example.com/doc.pdf"}
);
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678941", "name": "Reference Doc", "url": "https://example.com/doc.pdf"}]
```

</div>

</details>

<details>
<summary>Add a new comment to a Card</summary>

<div>

Adds a comment to a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |
| `queries` | `PostCardsIdActionsCommentsQueries` | Yes | Query parameters including `text` (required). |

**Returns:** `Action|error`

**Sample code:**

```ballerina
trello:Action comment = check trello->/cards/[cardId]/actions/comments.post(
    queries = {text: "This task is now in review."}
);
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678950", "type": "commentCard", "date": "2026-03-17T08:00:00.000Z", "data": {"text": "This task is now in review."}}
```

</div>

</details>

<details>
<summary>Add a Label to a Card</summary>

<div>

Adds an existing label to a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |
| `queries` | `PostCardsIdIdlabelsQueries` | Yes | Query parameters including `value` (the label ID). |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/cards/[cardId]/idLabels.post(queries = {value: labelId});
```

</div>

</details>

<details>
<summary>Add a Member to a Card</summary>

<div>

Adds a member to a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |
| `queries` | `PostCardsIdIdmembersQueries` | Yes | Query parameters including `value` (the member ID). |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/cards/[cardId]/idMembers.post(queries = {value: memberId});
```

</div>

</details>

<details>
<summary>Get Custom Field Items for a Card</summary>

<div>

Retrieves all custom field values set on a card.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the card. |

**Returns:** `CustomFieldItems[]|error`

**Sample code:**

```ballerina
trello:CustomFieldItems[] items = check trello->/cards/[cardId]/customFieldItems;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678960", "idCustomField": "60d5f2c8e4b0a12345678910", "idModel": "60d5f2c8e4b0a12345678905", "value": {"text": "High"}}]
```

</div>

</details>

#### Checklists

<details>
<summary>Create a Checklist</summary>

<div>

Creates a new checklist.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `PostChecklistsQueries` | Yes | Query parameters including `idCard` (required), `name`, `pos`, `idChecklistSource`. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/checklists.post(queries = {idCard: cardId, name: "Launch Checklist"});
```

</div>

</details>

<details>
<summary>Get a Checklist</summary>

<div>

Retrieves a checklist by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the checklist. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/checklists/[checklistId];
```

</div>

</details>

<details>
<summary>Get Checkitems on a Checklist</summary>

<div>

Retrieves all check items on a checklist.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the checklist. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/checklists/[checklistId]/checkItems;
```

</div>

</details>

<details>
<summary>Create Checkitem on Checklist</summary>

<div>

Creates a new check item on a checklist.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the checklist. |
| `queries` | `PostChecklistsIdCheckitemsQueries` | Yes | Query parameters including `name` (required), `pos`, `checked`. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/checklists/[checklistId]/checkItems.post(queries = {name: "Write unit tests"});
```

</div>

</details>

<details>
<summary>Delete Checkitem from Checklist</summary>

<div>

Deletes a check item from a checklist.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the checklist. |
| `idCheckItem` | `TrelloID` | Yes | The ID of the check item. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/checklists/[checklistId]/checkItems/[checkItemId].delete();
```

</div>

</details>

#### Labels

<details>
<summary>Get a Label</summary>

<div>

Retrieves a label by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the label. |

**Returns:** `Label|error`

**Sample code:**

```ballerina
trello:Label label = check trello->/labels/[labelId];
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678970", "name": "Urgent", "color": "red", "idBoard": "60d5f2c8e4b0a12345678901"}
```

</div>

</details>

<details>
<summary>Update a Label</summary>

<div>

Updates a label's name or color.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the label. |
| `queries` | `PutLabelsIdQueries` | No | Query parameters for fields to update. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/labels/[labelId].put(queries = {name: "Critical", color: "red"});
```

</div>

</details>

<details>
<summary>Delete a Label</summary>

<div>

Deletes a label.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the label. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/labels/[labelId].delete();
```

</div>

</details>

#### Members

<details>
<summary>Get a Member</summary>

<div>

Retrieves a member by their ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the member. |

**Returns:** `Member|error`

**Sample code:**

```ballerina
trello:Member member = check trello->/members/[memberId];
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678930", "fullName": "Jane Smith", "username": "janesmith", "email": "jane@example.com"}
```

</div>

</details>

<details>
<summary>Get Member (authenticated)</summary>

<div>

Retrieves the authenticated member's profile.


**Returns:** `Member|error`

**Sample code:**

```ballerina
trello:Member me = check trello->/members/me;
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678930", "fullName": "Jane Smith", "username": "janesmith", "email": "jane@example.com"}
```

</div>

</details>

<details>
<summary>Get Boards a Member belongs to</summary>

<div>

Retrieves all boards a member belongs to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the member. |

**Returns:** `Board[]|error`

**Sample code:**

```ballerina
trello:Board[] boards = check trello->/members/[memberId]/boards;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678901", "name": "My Project Board", "closed": false}]
```

</div>

</details>

<details>
<summary>Get Cards a Member is on</summary>

<div>

Retrieves all cards assigned to a member.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the member. |

**Returns:** `Card[]|error`

**Sample code:**

```ballerina
trello:Card[] cards = check trello->/members/[memberId]/cards;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678905", "name": "Implement login feature", "idList": "60d5f2c8e4b0a12345678902"}]
```

</div>

</details>

<details>
<summary>Get Member's Organizations</summary>

<div>

Retrieves all organizations a member belongs to.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the member. |

**Returns:** `Organization[]|error`

**Sample code:**

```ballerina
trello:Organization[] orgs = check trello->/members/[memberId]/organizations;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678980", "name": "myteam", "displayName": "My Team"}]
```

</div>

</details>

#### Organizations

<details>
<summary>Get an Organization</summary>

<div>

Retrieves an organization (workspace) by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the organization. |

**Returns:** `Organization|error`

**Sample code:**

```ballerina
trello:Organization org = check trello->/organizations/[orgId];
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678980", "name": "myteam", "displayName": "My Team", "desc": "Our development team workspace"}
```

</div>

</details>

<details>
<summary>Get Boards of Organization</summary>

<div>

Retrieves all boards belonging to an organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the organization. |

**Returns:** `Board[]|error`

**Sample code:**

```ballerina
trello:Board[] boards = check trello->/organizations/[orgId]/boards;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678901", "name": "My Project Board", "closed": false, "idOrganization": "60d5f2c8e4b0a12345678980"}]
```

</div>

</details>

<details>
<summary>Get Members of Organization</summary>

<div>

Retrieves all members of an organization.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the organization. |

**Returns:** `Member[]|error`

**Sample code:**

```ballerina
trello:Member[] members = check trello->/organizations/[orgId]/members;
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678930", "fullName": "Jane Smith", "username": "janesmith"}]
```

</div>

</details>

#### Actions

<details>
<summary>Get a specific field on an Action</summary>

<div>

Retrieves a specific field on an action.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the action. |
| `field` | `ActionFields` | Yes | The field to retrieve. |

**Returns:** `Action|error`

**Sample code:**

```ballerina
trello:Action action = check trello->/actions/[actionId]/data;
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678920", "type": "commentCard", "date": "2026-03-17T08:00:00.000Z"}
```

</div>

</details>

<details>
<summary>Update a Comment Action</summary>

<div>

Updates the text of a comment action.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the action. |
| `queries` | `PutActionsIdTextQueries` | Yes | Query parameters including `value` (the new comment text). |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/actions/[actionId]/text.put(queries = {value: "Updated comment text"});
```

</div>

</details>

<details>
<summary>Delete an Action</summary>

<div>

Deletes an action (only works for comment actions).

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the action. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/actions/[actionId].delete();
```

</div>

</details>

<details>
<summary>Get the Board for an Action</summary>

<div>

Retrieves the board associated with an action.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the action. |

**Returns:** `Board|error`

**Sample code:**

```ballerina
trello:Board board = check trello->/actions/[actionId]/board;
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678901", "name": "My Project Board"}
```

</div>

</details>

#### Search

<details>
<summary>Search Trello</summary>

<div>

Searches for boards, cards, members, and organizations matching a query.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetSearchQueries` | Yes | Query parameters including `query` (required), `modelTypes`, `idBoards`, `idOrganizations`, and more. |

**Returns:** `InlineResponse2001|error`

**Sample code:**

```ballerina
trello:InlineResponse2001 results = check trello->/search(queries = {query: "login feature"});
```

**Sample response:**

```ballerina
{"cards": [{"id": "60d5f2c8e4b0a12345678905", "name": "Implement login feature"}], "boards": [], "organizations": []}
```

</div>

</details>

<details>
<summary>Search Members</summary>

<div>

Searches for Trello members by name or username.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `queries` | `GetSearchMembersQueries` | Yes | Query parameters including `query` (required), `limit`, `idBoard`, `idOrganization`. |

**Returns:** `Member[]|error`

**Sample code:**

```ballerina
trello:Member[] members = check trello->/search/members(queries = {query: "jane"});
```

**Sample response:**

```ballerina
[{"id": "60d5f2c8e4b0a12345678930", "fullName": "Jane Smith", "username": "janesmith"}]
```

</div>

</details>

#### Webhooks

<details>
<summary>Create Webhook</summary>

<div>

Creates a new webhook for receiving callbacks on model changes.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `WebhooksBody` | Yes | Request body with `callbackURL`, `idModel`, `description`, and `active` fields. |

**Returns:** `Webhook|error`

**Sample code:**

```ballerina
trello:Webhook webhook = check trello->/webhooks.post({
    callbackURL: "https://myapp.example.com/trello/webhook",
    idModel: boardId,
    description: "Board change notifications"
});
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678990", "description": "Board change notifications", "idModel": "60d5f2c8e4b0a12345678901", "callbackURL": "https://myapp.example.com/trello/webhook", "active": true}
```

</div>

</details>

<details>
<summary>Get a Webhook</summary>

<div>

Retrieves a webhook by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the webhook. |

**Returns:** `Webhook|error`

**Sample code:**

```ballerina
trello:Webhook webhook = check trello->/webhooks/[webhookId];
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678990", "description": "Board change notifications", "idModel": "60d5f2c8e4b0a12345678901", "callbackURL": "https://myapp.example.com/trello/webhook", "active": true}
```

</div>

</details>

<details>
<summary>Update Webhook</summary>

<div>

Updates a webhook's callback URL, model, or active status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the webhook. |
| `payload` | `WebhooksIdBody` | Yes | Request body with fields to update. |

**Returns:** `Webhook|error`

**Sample code:**

```ballerina
trello:Webhook updated = check trello->/webhooks/[webhookId].put({
    description: "Updated webhook",
    active: false
});
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678990", "description": "Updated webhook", "active": false}
```

</div>

</details>

<details>
<summary>Delete Webhook</summary>

<div>

Deletes a webhook.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the webhook. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/webhooks/[webhookId].delete();
```

</div>

</details>

#### Custom Fields

<details>
<summary>Create a new Custom Field on a Board</summary>

<div>

Creates a new custom field definition on a board.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `payload` | `CustomFieldsBody` | Yes | Request body with custom field configuration. |

**Returns:** `CustomField|error`

**Sample code:**

```ballerina
trello:CustomField field = check trello->/customFields.post({
    idModel: boardId,
    modelType: "board",
    name: "Priority",
    'type: "list",
    pos: "bottom"
});
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678910", "idModel": "60d5f2c8e4b0a12345678901", "name": "Priority", "type": "list", "pos": 1}
```

</div>

</details>

<details>
<summary>Get a Custom Field</summary>

<div>

Retrieves a custom field definition by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the custom field. |

**Returns:** `CustomField|error`

**Sample code:**

```ballerina
trello:CustomField field = check trello->/customFields/[customFieldId];
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678910", "idModel": "60d5f2c8e4b0a12345678901", "name": "Priority", "type": "list"}
```

</div>

</details>

<details>
<summary>Delete a Custom Field definition</summary>

<div>

Deletes a custom field definition and removes it from all cards.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the custom field. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/customFields/[customFieldId].delete();
```

</div>

</details>

#### Notifications

<details>
<summary>Get a Notification</summary>

<div>

Retrieves a notification by its ID.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the notification. |

**Returns:** `Notification|error`

**Sample code:**

```ballerina
trello:Notification notif = check trello->/notifications/[notificationId];
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678995", "type": "addedToCard", "unread": true, "date": "2026-03-17T09:00:00.000Z"}
```

</div>

</details>

<details>
<summary>Update Notification</summary>

<div>

Updates a notification's read status.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `TrelloID` | Yes | The ID of the notification. |
| `queries` | `PutNotificationsIdQueries` | No | Query parameters including `unread`. |

**Returns:** `Notification|error`

**Sample code:**

```ballerina
trello:Notification notif = check trello->/notifications/[notificationId].put(queries = {unread: false});
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678995", "type": "addedToCard", "unread": false}
```

</div>

</details>

#### Tokens

<details>
<summary>Get a Token</summary>

<div>

Retrieves information about an API token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tokenValue` | `string` | Yes | The token value. |

**Returns:** `Token|error`

**Sample code:**

```ballerina
trello:Token tokenInfo = check trello->/tokens/[apiToken];
```

**Sample response:**

```ballerina
{"id": "60d5f2c8e4b0a12345678998", "identifier": "Ballerina Connector", "idMember": "60d5f2c8e4b0a12345678930", "dateExpires": null}
```

</div>

</details>

<details>
<summary>Delete a Token</summary>

<div>

Revokes and deletes a token.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `tokenValue` | `string` | Yes | The token value. |

**Returns:** `error?`

**Sample code:**

```ballerina
_ = check trello->/tokens/[apiToken].delete();
```

</div>

</details>
