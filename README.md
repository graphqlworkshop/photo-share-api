# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Main Idea

We need a way to upload files to the server, but uploading a file is different than a regular field value.

- API needs to handle multipart/form-data
- The custom scalar Upload is provided by Apollo, contains info about file including upload stream
- Need to add express middleware to save the photo

### Paste new index.js file

- Install new dependencies

```
npm i express
npm i apollo-server-express
npm i graphql-playground-middleware-express
```

- file scalar
- postPhoto resolver
- Serving the assets folder

### Test the Upload (no playground)

- [ ] navigate to [http://localhost:4000/img/photos](http://localhost:4000/img/photos)
- [ ] add a users `githubToken` to the first token field (find in DB)
- [ ] Click browser and select an image
