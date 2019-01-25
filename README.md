# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add postPhoto Mutation to the schema

```graphql
type Mutation {
  postPhoto(name: String!, description: String): Boolean!
}
```

### Add postPhoto Mutation Resolver

```javascript
const resolvers = {
  Mutation: {
    postPhoto: (parent, args) => {
      let newPhoto = {
        ...args
      };
      photos.push(newPhoto);
      return true;
    }
  }
};
```
