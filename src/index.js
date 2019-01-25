const { ApolloServer, gql } = require("apollo-server");
const photos = require("../data/photos.json");

const typeDefs = gql`
  type Query {
    totalPhotos: Int!
  }

  type Mutation {
    postPhoto(name: String!, description: String): Boolean!
  }
`;

const resolvers = {
  Query: {
    totalPhotos: () => photos.length
  },
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

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen()
  .then(({ port }) => `server listening on ${port}`)
  .then(console.log)
  .catch(console.error);
