# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Installing mongodb

```sh
npm install mongodb
```

### Adding mongo

**Installing mongodb**

```sh
brew install mongodb
```

**Checking your services**

```sh
brew services list
```

**Starting the mongo service**

```
brew services start mongodb
```

### New `index.js` file Walkthrough

### Add .env file

```
DB_HOST=mongodb://localhost:27017/photo-share
```

```
npm start
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
