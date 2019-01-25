# PhotoShare API

PhotoShare is the main back-end exercise for [GraphQL Workshop](https://www.graphqlworkshop.com). In this exercise, students build a GraphQL API for a small photo sharing application.

## Changes

### Add PhotoCategory to the schema

```graphql
type Photo {
    ...
    category: PhotoCategory!
}

enum PhotoCategory {
    PORTRAIT
    LANDSCAPE
    ACTION
    SELFIE
}

type Mutation {
    postPhoto(name: String! description: String category: PhotoCategory=PORTRAIT): Photo!
}
```
