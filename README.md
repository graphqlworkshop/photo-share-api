# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add User and user queries to the schema

```graphql
type User {
  id: ID!
  name: String!
}

type Query {
  totalUsers: Int!
  allUsers: [User!]!
  User(id: ID!): User!
}
```

### Add query resolvers

```javascript
  Query: {
    totalUsers: () => users.length,
    allUsers: () => users,
    User: (parent, { id }) => users.find(user => user.id === id)
  },
```
