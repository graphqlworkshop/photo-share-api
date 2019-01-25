# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add `postedBy` field to `Photo`

```graphql
type Photo {
  id: ID!
  name: String!
  description: String
  category: PhotoCategory!
  url: String!
  postedBy: User!
}
```

### Add `postedBy` resolver

```javascript
Photo: {
  postedBy: parent => users.find(user => user.id === parent.userID);
}
```
