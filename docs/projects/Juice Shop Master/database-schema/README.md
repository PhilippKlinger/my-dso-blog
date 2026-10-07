# Database Schema

**Category:** Injection · **Difficulty:** 3 stars

I solved this challenge in my own OWASP Juice Shop lab. I used Burp Repeater to investigate the product search and retrieve database table definitions through SQL injection.

## Educational Purpose

I performed these exercises only in my own intentionally vulnerable Juice Shop training environment. This report is for educational and defensive learning. No third-party system or real user data was involved; test only systems you own or are explicitly authorized to assess.

## Goal

Investigate the three-star *Database Schema* injection challenge and retrieve database structure definitions from the training application. Explain the request, the observed responses, the weakness, and a suitable defense.

## Initial Observation

The product search receives a `q` query parameter. A normal request for `banana` returned a product, while adding a single quote to a search value produced `500 Internal Server Error`. The error disclosed `SQLITE_ERROR` and part of the SQL statement, including `name LIKE '%test'%'`. This showed that the quote disrupted a SQL string and that the search used SQLite. The response alone did not reveal the database schema.

## Investigation

I intercepted the product-search request and varied only `q` in Burp Repeater. The values below are decoded for readability; spaces and other special characters were URL-encoded in the HTTP request.

| Step | Search value or change | Observed result | What it established |
| --- | --- | --- | --- |
| Baseline | `banana` | `200 OK`, returning *Banana Juice* | The search endpoint returned product data. |
| Quote probe | `test'` | `500` with `SQLITE_ERROR` and the assembled SQL | The input affected SQL syntax inside a quoted `LIKE` value. |
| Restore syntax | `banana'))--` | `200 OK` with `data: []` | Closing the string and parentheses, then commenting out the remaining SQL, produced a valid query. The empty result was consistent with the remaining `LIKE '%banana'` pattern, which matches names ending in `banana`. |
| Check result shape | A `UNION SELECT` with nine fixed values, including `Probe` in position two | `200 OK`; `name` was `Probe` and `description` was `Nur ein Test` | The added result matched the product response's nine fields. Position two was visible as `name`. |

## Retrieving the Schema

SQLite stores schema definitions in the `sql` column of `sqlite_master`. I replaced the fixed `Probe` value in the second `UNION SELECT` position with `sql` and placed `FROM sqlite_master WHERE type='table'` **before** the final SQL comment. An earlier attempt put `FROM` after `--`, which commented it out.

The final decoded search value was:

```text
banana')) UNION SELECT 0,sql,'Nur ein Test',0,0,'',NULL,NULL,NULL FROM sqlite_master WHERE type='table'--
```

The response placed a `CREATE TABLE` definition for `Addresses` in the JSON `name` field. Both queries returned nine columns, and the second column appeared as `name` in the product response. This displayed schema text without saving a product or changing the database.

## Cause, Risk, and Defense

The search input became part of the SQL query text instead of being treated only as a value. This let me close the original search expression and add a `UNION SELECT` to read database metadata.

In a real application, SQL injection could expose other data as well. Detailed database errors also reveal internal query structure. My exercise demonstrated schema retrieval; I did not test further data access or data changes.

To prevent this weakness:

- Pass search values as bound SQL parameters instead of inserting them into a query string.
- Return generic errors to clients and keep detailed database diagnostics in protected server logs.

## Result and Evidence

In Burp Repeater, I observed a normal `200` result, a `500` SQLite syntax error, a valid empty `200` result, a synthetic `Probe` row, and a `200` response containing `CREATE TABLE` text for `Addresses`. Juice Shop then marked *Database Schema* as solved. The response excerpt described here does not establish how many schema objects were returned in total.

The demonstration video is pending.

[Back to Juice Shop Master](../README.md)
