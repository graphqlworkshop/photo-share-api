# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add `userID` field to photos.json

```json
[
  {
    "id": "1",
    "name": "Kirkwood Blue Bird",
    "description": "Dropping the heart chute",
    "category": "ACTION",
    "userID": "c"
  },
  {
    "id": "2",
    "name": "Squaw Valley",
    "description": "chimney chute",
    "category": "LANDSCAPE",
    "userID": "b"
  }
]
```

### Add `postedPhotos` field to `User`

```graphql
type User {
  id: ID!
  name: String!
  postedPhotos: [Photo!]!
}
```

### Add `postedPhotos` resolver

```javascript
User: {
  postedPhotos: parent => photos.filter(photo => photo.userID === parent.id);
}
```
