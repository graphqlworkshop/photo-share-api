# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

```graphql
type Query {
    me: User
    ...
}
```

### Add the Resolver

```javascript
me: (parent, args, { currentUser }) => currentUser,
```

### Modify Context

**index.js**

```javascript
const context = async ({ req }) => {
  const photos = db.collection("photos");
  const users = db.collection("users");
  const githubToken = req.headers.authorization;
  const currentUser = await users.findOne({ githubToken });
  return { photos, users, currentUser };
};
```

**make sure to remove the context**

```javascript
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});
```

### Test

```graphql
query currentUser {
  me {
    name
  }
}

mutation authorize {
  githubAuth(code: "TEST") {
    token
    user {
      ...person
    }
  }
}

fragment person on User {
  name
  githubLogin
  avatar
  postedPhotos {
    name
  }
}
```

**HTTP Headers**

```json
{
  "Authorization": "<ADD_HEADER>"
}
```
