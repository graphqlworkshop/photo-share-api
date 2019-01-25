# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Import Photos Array

```javascript
const photos = require("../data/photos.json");
```

### Add totalPhotos to schema and resolvers

```javascript
const typeDefs = gql`
  type Query {
    totalPhotos: Int!
  }
`;

const resolvers = {
  Query: {
    totalPhotos: () => photos.length
  }
};
```
