# nestjs-graphql-relay

Example backend server for relay :

- NestJS 7
- Relay Style
  - Identification, Connections
  - using relay-js
- Code first approach
- TypeORM

## Running the app

```bash
# start mysql server
$ docker-compose up

# development
$ npm run start

# watch mode
$ npm run start:dev

# run if initial data needed
$ npx ts-node ./src/_script/seed.ts

# drop all data
$ npm run typeorm schema:drop
```

Go to `http://localhost:3000/graphql`

example query

```
query {
  getUsers {
    id
    name
    catsConnection(where: {name: "Leo"}) {
      aggregate {
        count
      }
      edges {
        node {
          id
          name
          age
          user {
            id
            name
          }
        }
      }
    }
  }
  getCats {
    id
    name
  }
}
```
