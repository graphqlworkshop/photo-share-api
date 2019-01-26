# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add fake users with githubAuth Resolver

```javascript
githubAuth: async (parent, { code }, { users }) => {
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
  ...
}
```

### Add test users

```graphql
query users {
  totalUsers
  allUsers {
    ...person
  }
}

mutation addTestUser {
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
