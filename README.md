# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Create a Package.json

`npm init -y`

`npm i nodemon dotenv -D`

```json
"scripts": {
    "start": "nodemon -r dotenv/config ./src/index.js"
}
```

### Install Apollo Server

`npm i apollo-server graphql`

### Add an index.js file

```javascript
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    gnar: String
  }
`;

const resolvers = {
  Query: {
    gnar: () => "gnarly!!!"
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(({ port }) => `server listening on ${port}`)
  .then(console.log)
  .catch(console.error);
```

### Start the Server

`npm start`

Browse [http://localhost:4000](http://localhost:4000)
