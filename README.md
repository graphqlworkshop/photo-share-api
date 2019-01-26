# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

- Configure OAuth on GitHub
- Create an App
- Adjust `.env` file

```
GITHUB_CLIENT_ID=<YOUR_ID_HERE>
GITHUB_CLIENT_SECRET=<YOUR_SECRET_HERE>
```

- Log both with the server

```javascript
server
  .listen()
  .then(console.log("Client ID", process.env.GITHUB_CLIENT_ID))
  .then(console.log("Client Secret", process.env.GITHUB_CLIENT_SECRET));
```
