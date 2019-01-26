# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add DateTime to the Schema

```graphql
scalar DateTime

type Photo {
  id: ID!
  name: String!
  url: String!
  description: String
  category: PhotoCategory!
  postedBy: User!
  created: DateTime
}
```

### Modify Resolver

```javascript
const { GraphQLScalarType } = require("graphql");

DateTime: new GraphQLScalarType({
  name: "DateTime",
  description: "A valid date time value.",
  parseValue: value => new Date(value),
  serialize: value => new Date(value).toISOString(),
  parseLiteral: ast => new Date(ast.value)
});
```

- parseValue: invoked to parse client input that was sent as variables. This is a javascript object
- parseLiteral: invoked to parse input sent inline - AST
- serialize: invoked to take the data and convert it into a format that can be stored.

### Add a date field to the postPhoto

```javascript
const newPhoto = {
  ...input,
  userID: currentUser.githubLogin,
  created: new Date()
};
```

### Test the Upload (no playground)

- [ ] navigate to [http://localhost:4000/img/photos](http://localhost:4000/img/photos)

```graphql
query {
  allPhotos {
    id
    url
    created
  }
}
```
