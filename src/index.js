const { ApolloServer, gql, PubSub } = require("apollo-server");
const { MongoClient, ObjectID } = require("mongodb");
const { authorizeWithGithub, generateFakeUsers } = require("./lib");

const typeDefs = gql`
  type Photo {
    id: ID!
    name: String!
    description: String
    category: PhotoCategory!
    url: String
    postedBy: User!
  }

  type User {
    githubLogin: ID!
    name: String!
    avatar: String!
    postedPhotos: [Photo!]!
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

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    totalPhotos: Int!
    allPhotos: [Photo!]!
    Photo(id: ID!): Photo!
    totalUsers: Int!
    allUsers: [User!]!
    User(githubLogin: ID!): User
  }

  type Mutation {
    postPhoto(input: PostPhotoInput!): Photo!
    githubAuth(code: String!): AuthPayload!
  }

  type Subscription {
    newUser: User!
    newPhoto: Photo!
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, { currentUser }) => currentUser,
    totalPhotos: (parent, args, { photos }) => photos.countDocuments(),
    allPhotos: (parent, args, { photos }) => photos.find().toArray(),
    Photo: (parent, { id }, { photos }) =>
      photos.findOne({ _id: ObjectID(id) }),
    totalUsers: (parent, args, { users }) => users.countDocuments(),
    allUsers: (parent, args, { users }) => users.find().toArray(),
    User: (parent, { githubLogin }, { users }) => users.findOne({ githubLogin })
  },
  Mutation: {
    postPhoto: async (parent, { input }, { photos, currentUser, pubsub }) => {
      if (!currentUser) {
        throw new Error("only an authorized user can post a photo");
      }

      const newPhoto = {
        ...input,
        userID: currentUser.githubLogin
      };

      const { insertedId } = await photos.insertOne(newPhoto);
      newPhoto.id = insertedId.toString();

      pubsub.publish("photo-added", { newPhoto });

      return newPhoto;
    },
    githubAuth: async (parent, { code }, { users, pubsub }) => {
      let payload;

      if (code === "TEST") {
        const {
          results: [fakeUser]
        } = await generateFakeUsers(1);
        payload = {
          login: fakeUser.login.username,
          name: `${fakeUser.name.first} ${fakeUser.name.last}`,
          avatar_url: fakeUser.picture.thumbnail,
          access_token: fakeUser.login.sha1
        };
      } else {
        payload = await authorizeWithGithub({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code
        });
      }

      const githubUserInfo = {
        githubLogin: payload.login,
        name: payload.name,
        avatar: payload.avatar_url,
        githubToken: payload.access_token
      };

      const {
        ops: [user]
      } = await users.replaceOne(
        { githubLogin: payload.login },
        githubUserInfo,
        { upsert: true }
      );

      pubsub.publish("user-added", { newUser: user });

      return { user, token: user.githubToken };
    }
  },
  Subscription: {
    newPhoto: {
      subscribe: (parent, data, { pubsub }) =>
        pubsub.asyncIterator("photo-added")
    },
    newUser: {
      subscribe: (parent, data, { pubsub }) =>
        pubsub.asyncIterator("user-added")
    }
  },
  Photo: {
    id: parent => parent.id || parent._id.toString(),
    url: parent => `/img/photos/${parent.id || parent._id.toString()}.jpg`,
    postedBy: (parent, args, { users }) =>
      users.findOne({ githubLogin: parent.userID })
  },
  User: {
    postedPhotos: (parent, args, { photos }) =>
      photos.find({ userID: parent.githubLogin }).toArray()
  }
};

const start = async () => {
  const client = await MongoClient.connect(
    process.env.DB_HOST,
    { useNewUrlParser: true }
  );
  const db = client.db();

  const pubsub = new PubSub();

  const context = async ({ req, connection }) => {
    const photos = db.collection("photos");
    const users = db.collection("users");
    const githubToken = req
      ? req.headers.authorization
      : connection.context.Authorization;
    const currentUser = await users.findOne({ githubToken });
    return { photos, users, currentUser, pubsub };
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  server
    .listen()
    .then(({ port }) => `server listening on ${port}`)
    .then(console.log)
    .catch(console.error);
};

start();
