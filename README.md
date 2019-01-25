# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add url field to `Photo`

```graphql
type Photo {
  ...
  url: String!
}
```

### Add `Photo.url` resolver

```javascript
Photo: {
  url: parent => `/img/photos/${parent.id}.jpg`;
}
```
