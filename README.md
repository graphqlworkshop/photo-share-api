# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add Subscriptions to the Schema

```graphql
type Subscription {
  newUser: User!
  newPhoto: Photo!
}
```

### Import PubSub from ApolloServer

```javascript
const { ApolloServer, gql, PubSub } = require("apollo-server");
```

```javascript
const db = client.db()
const pubsub = new PubSub()

const context = async ({ req, connection }) => {
    ...
    const githubToken = req ? req.headers.authorization : connection.context.Authorization
    const currentUser = await users.findOne({ githubToken })
    return { photos, users, currentUser, pubsub }
}

```

### Publish Events from Mutations

```javascript
 Mutation: {
    postPhoto: async (parent, { input }, { photos, currentUser, pubsub }) => {

        ...

        pubsub.publish('photo-added', { newPhoto })

        return newPhoto

    },
    githubAuth: async (parent, { code }, { users, pubsub }) => {

        ...

        pubsub.publish('user-added', { newUser: user })

        return { user, token: user.githubToken }

    }
},
```

### Add Subscription Resolvers

```javascript
Subscription: {
    newPhoto: {
        subscribe: (parent, data, { pubsub }) => pubsub.asyncIterator('photo-added')
    },
    newUser: {
        subscribe: (parent, data, { pubsub }) => pubsub.asyncIterator('user-added')
    }
}
```

### Test

```graphql
subscription {
  newUser {
    name
  }
}
```

```graphql
mutation auth {
  githubAuth(code: "TEST") {
    token
    user {
      name
    }
  }
}
```
