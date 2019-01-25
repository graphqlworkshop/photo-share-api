const { ApolloServer, gql } = require("apollo-server");
const photos = require("../data/photos.json");

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

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ port }) => `server listening on ${port}`)
  .then(console.log)
  .catch(console.error);
