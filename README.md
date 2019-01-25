# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add `photo` query to schema

```graphql
photo(id: ID!): Photo!
```

### Add `photo` resolver

```javascript
photo: (parent, { id }) => photos.find(photo => photo.id === id);
```
