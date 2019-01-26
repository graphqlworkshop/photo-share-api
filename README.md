# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### New `index.js` file Walkthrough

### Install mongodb

```sh
npm install mongodb
```

### Add mongo

- Typical Mongo Service (photo-share database)

```
mongodb://localhost:27017/photo-share
```

- Installing mongo

```
brew install mongodb
```

- Checking your services

```
brew services list
```

- Starting the mongo service

```
brew services start mongodb
```

- Connecting to the shell

```
mongo
```

### Add .env file

```
DB_HOST=mongodb://localhost:27017/photo-share
```

### Send Query for Data

```graphql
query users {
  allUsers {
    githubLogin
    name
  }
}
```

### Try Mutation

```graphql
mutation postPhoto($input: PostPhotoInput!) {
  postPhoto(input: $input) {
    id
    name
    description
  }
}
```

```json
{
  "input": {
    "name": "sunset",
    "description": "beautiful sunset",
    "category": "LANDSCAPE"
  }
}
```

### Add a user in context

```
currentUser: {
  githubLogin: "someone"
}
```
