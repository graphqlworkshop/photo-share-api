# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

- Modify user type

```graphql
type User {
  githubLogin: ID!
  name: String!
  avatar: String!
  postedPhotos: [Photo!]!
}
```

- Add mutation

```graphql
type AuthPayload {
  token: String!
  user: User!
}

type Mutation {
  postPhoto(input: PostPhotoInput!): Photo!
  githubAuth(code: String!): AuthPayload!
}
```

- Add githubAuth Mutation

```javascript
const { authorizeWithGithub } = require("./lib");

...

githubAuth: async (parent, { code }, { users }) => {
  const payload = await authorizeWithGithub({
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code
  });

  const githubUserInfo = {
    githubLogin: payload.login,
    name: payload.name,
    avatar: payload.avatar_url,
    githubToken: payload.access_token
  };

  const {
    ops: [user]
  } = await users.replaceOne({ githubLogin: payload.login }, githubUserInfo, {
    upsert: true
  });

  return { user, token: user.githubToken };
};
```

- Go to: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user`
- Get code
- Send mutation

```graphql
mutation {
  githubAuth(code: "<CODE_HERE>") {
    token
    user {
      name
      githubLogin
    }
  }
}
```
