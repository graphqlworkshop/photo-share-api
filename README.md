# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add input type to the schema

```graphql
input PostPhotoInput {
  name: String!
  description: String
  category: PhotoCategory = PORTRAIT
}

type Mutation {
  postPhoto(input: PostPhotoInput!): Photo!
}
```

### Change postPhoto Resolver to accept input

```javascript
postPhoto: (parent, { input }) => {
  let newPhoto = {
    id: generate(),
    ...input
  };
  photos.push(newPhoto);
  return newPhoto;
};
```

### Test it

```graphql
mutation Post($input: PostPhotoInput!) {
  postPhoto(input: $input) {
    id
    name
    description
    category
  }
}
```

- Add json input

```json
{
  "input": {
    "name": "Red Red Wine",
    "description": "you make me feel so fine",
    "category": "ACTION"
  }
}
```
