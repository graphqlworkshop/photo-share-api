const { ApolloServer, gql } = require("apollo-server");
const photos = require("../data/photos.json");
const { generate } = require("shortid");

const typeDefs = gql`
  type Photo {
    id: ID!
    name: String!
    description: String
    category: PhotoCategory!
  }

  enum PhotoCategory {
    PORTRAIT
    LANDSCAPE
    ACTION
    SELFIE
  }

  input PostPhotoInput {
    name: String!
    description: String
    category: PhotoCategory = PORTRAIT
  }

  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
  }
`;

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },
  Mutation: {
    postPhoto: (parent, { input }) => {
      let newPhoto = {
        id: generate(),
        ...input
      };
      photos.push(newPhoto);
      return newPhoto;
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
