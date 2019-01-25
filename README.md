# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add Photo Type

```graphql
type Photo {
  id: ID!
  name: String!
  description: String
}
```

### Add `allPhotos` Query

```graphql
type Query {
  allPhotos: [Photo!]!
}
```

### Add allPhotos Resolver

```javascript
allPhotos: () => photos;
```

### Adjust Mutation to return Photo

```graphql
postPhoto(name: String!, description: String): Photo!
```

### Adjust Mutation Resolver

```shell
npm i shortid --save
```

```javascript
const { generate } = require("shortid");
```

```javascript
Mutation: {
  postPhoto: (parent, args) => {
    let newPhoto = {
      id: generate(),
      ...args
    };
    photos.push(newPhoto);
    return newPhoto;
  };
}
```
