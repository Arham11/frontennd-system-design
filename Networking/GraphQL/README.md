# GraphQL — Interview Revision Guide

## What is GraphQL?

GraphQL is a **query language for APIs** and a **runtime for executing those queries** against your data. Developed by Facebook in 2012 and open-sourced in 2015, it provides a more efficient, flexible alternative to REST.

> **One-liner:** GraphQL lets the client ask for exactly the data it needs — nothing more, nothing less.

---

## GraphQL vs REST

| Feature         | REST                                | GraphQL                              |
| --------------- | ----------------------------------- | ------------------------------------ |
| Endpoints       | Multiple (`/users`, `/books`)       | Single (`/graphql`)                  |
| Data fetching   | Fixed structure per endpoint        | Client specifies the shape           |
| Over-fetching   | Common (get all fields)             | Eliminated (pick fields)             |
| Under-fetching  | Common (need multiple calls)        | Eliminated (nested queries)          |
| Versioning      | `/v1/`, `/v2/`                      | No versioning needed (evolve schema) |
| Protocol        | HTTP verbs (GET, POST, PUT, DELETE) | Typically POST only                  |
| Response format | Decided by server                   | Decided by client                    |

---

## Core Concepts

### 1. Schema Definition Language (SDL)

The schema is the **contract** between client and server. It defines types, queries, and mutations.

```graphql
type Book {
  id: ID!
  title: String!
  publishedYear: Int
  author: Author # Relationship: a book has one author
}

type Author {
  id: ID!
  name: String!
  books: [Book] # Relationship: an author can have many books
}
```

**Scalar types:** `Int`, `Float`, `String`, `Boolean`, `ID`

**`!`** means the field is **non-nullable** (required).

### 2. Queries (Read Data)

Queries are how clients **read** data. The client decides the shape of the response.

```graphql
# Fetch all books with their author names
query {
  books {
    title
    publishedYear
    author {
      name
    }
  }
}
```

Defined in the schema as:

```graphql
type Query {
  authors: [Author]
  books: [Book]
}
```

### 3. Mutations (Write Data)

Mutations are used to **create, update, or delete** data.

```graphql
mutation {
  addBooks(title: "System Design", publishedYear: 2024, authorID: "1") {
    id
    title
  }
}
```

Defined in the schema as:

```graphql
type Mutation {
  addBooks(title: String!, publishedYear: Int, authorID: ID!): Book!
}
```

### 4. Resolvers

Resolvers are **functions that return data** for each field in the schema. They are the bridge between the schema and your data source.

```js
const resolvers = {
  Query: {
    books: () => data.books,
    authors: () => data.author,
  },
  Mutation: {
    addBooks: (parent, args) => {
      const newBook = { id: data.books.length + 1 + "", ...args };
      data.books.push(newBook);
      return newBook;
    },
  },
  // Field-level resolvers for relationships
  Book: {
    author: (parent) => data.author.find((a) => a.id === parent.authorID),
  },
  Author: {
    books: (parent) => data.books.filter((b) => parent.booksIds.includes(b.id)),
  },
};
```

**Resolver arguments:** `(parent, args, context, info)`

| Argument  | Purpose                                                                 |
| --------- | ----------------------------------------------------------------------- |
| `parent`  | Result returned by the parent resolver (used in nested/field resolvers) |
| `args`    | Arguments passed to the field in the query                              |
| `context` | Shared across all resolvers (auth, DB connections, etc.)                |
| `info`    | Metadata about the query execution (AST, field name, etc.)              |

### 5. Subscriptions (Real-time Data)

Subscriptions allow the server to **push data** to the client when an event occurs (uses WebSockets under the hood).

```graphql
subscription {
  bookAdded {
    title
    author {
      name
    }
  }
}
```

---

## Key Interview Topics

### Over-fetching & Under-fetching

- **Over-fetching:** Getting more data than needed. REST returns all fields; GraphQL lets you pick.
- **Under-fetching:** Needing multiple API calls. REST may require `/books` + `/authors/1`; GraphQL resolves in one request via nested queries.

### N+1 Problem

When fetching a list of books and each book resolves its author individually, it causes **N+1 queries** (1 for books + N for each author).

**Solution:** Use a **DataLoader** — batches and caches requests within a single tick.

```js
const authorLoader = new DataLoader(ids => batchGetAuthors(ids));

// In resolver
Book: {
  author: (parent) => authorLoader.load(parent.authorID),
}
```

### Fragments

Reusable units of fields to avoid repetition in queries.

```graphql
fragment BookFields on Book {
  id
  title
  publishedYear
}

query {
  books {
    ...BookFields
    author {
      name
    }
  }
}
```

### Variables

Parameterize queries instead of hardcoding values.

```graphql
query GetBooks($year: Int) {
  books(publishedYear: $year) {
    title
  }
}
```

### Directives

Conditionally include/skip fields.

```graphql
query GetBooks($withAuthor: Boolean!) {
  books {
    title
    author @include(if: $withAuthor) {
      name
    }
  }
}
```

Built-in directives: `@include(if: Boolean)`, `@skip(if: Boolean)`, `@deprecated(reason: String)`

### Aliases

Query the same field with different arguments by giving them different names.

```graphql
query {
  frontendBooks: books(category: "frontend") {
    title
  }
  backendBooks: books(category: "backend") {
    title
  }
}
```

### Inline Fragments (Union & Interface Types)

```graphql
query {
  search(text: "GraphQL") {
    ... on Book {
      title
    }
    ... on Author {
      name
    }
  }
}
```

---

## Architecture Patterns

### 1. GraphQL as API Gateway

```
Client → GraphQL Server → REST APIs / Microservices / DBs
```

Single entry point that aggregates data from multiple sources.

### 2. Direct DB Access

```
Client → GraphQL Server → Database
```

Resolvers query the database directly.

### 3. Hybrid

```
Client → GraphQL Server → DB + REST + gRPC + other GraphQL
```

---

## Caching in GraphQL

| Strategy              | How                                                         |
| --------------------- | ----------------------------------------------------------- |
| **Client-side**       | Apollo Client's normalized cache (by `__typename` + `id`)   |
| **HTTP caching**      | Harder since all requests are POST to `/graphql`            |
| **Persisted queries** | Pre-register queries with hashes; enables GET + CDN caching |
| **Server-side**       | DataLoader for request-level batching/caching               |

---

## Security Considerations

| Threat                          | Mitigation                                         |
| ------------------------------- | -------------------------------------------------- |
| **Deep/expensive queries**      | Query depth limiting, query complexity analysis    |
| **Introspection in production** | Disable introspection (`introspection: false`)     |
| **DDoS via complex queries**    | Rate limiting, persisted queries                   |
| **Authorization**               | Implement in resolvers or middleware via `context` |

---

## Apollo Server Setup (from this project)

```js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typesDefs.js";
import { resolvers } from "./resolvers.js";

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
```

Run with: `npm start` → opens Apollo Sandbox at `http://localhost:4000`

---

## Quick Comparison: GraphQL vs REST vs gRPC

|                | GraphQL                 | REST               | gRPC                      |
| -------------- | ----------------------- | ------------------ | ------------------------- |
| Protocol       | HTTP                    | HTTP               | HTTP/2                    |
| Format         | JSON                    | JSON/XML           | Protobuf (binary)         |
| Schema         | SDL (strongly typed)    | OpenAPI (optional) | `.proto` (strongly typed) |
| Use case       | Flexible client queries | CRUD APIs          | Low-latency microservices |
| Learning curve | Medium                  | Low                | High                      |

---

## Common Interview Questions

1. **What is GraphQL and how is it different from REST?**
2. **Explain Query, Mutation, and Subscription.**
3. **What are resolvers? Explain the 4 arguments.**
4. **What is the N+1 problem and how do you solve it?**
5. **How does caching work in GraphQL?**
6. **What are Fragments, Aliases, and Directives?**
7. **How do you handle authentication/authorization in GraphQL?**
8. **What is schema stitching vs federation?**
   - _Stitching:_ merge multiple schemas into one (legacy approach).
   - _Federation:_ each service owns part of the graph; a gateway composes them (Apollo Federation).
9. **How do you prevent malicious/expensive queries?**
10. **What is introspection and when should it be disabled?**
    - Introspection lets clients discover the schema (`__schema` query). Disable in production for security.

---

## Cheat Sheet

```
Schema  = typeDefs + resolvers
typeDefs = types + queries + mutations + subscriptions
resolvers(parent, args, context, info)

!          → non-nullable
[Book]     → array of Book
ID         → unique identifier scalar
@include   → conditionally include field
@skip      → conditionally skip field
@deprecated → mark field as deprecated
```

---

### Project Data Model

```
books {id, title, publishedYear, author}
author {id, name, books}

- One book has one author
- One author can have multiple books
```
