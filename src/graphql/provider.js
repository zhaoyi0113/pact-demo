const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'Hello world!',
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    rootValue: root,
    schema,
  }),
);

const start = () => {
  // tslint:disable:no-console
  app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
};

module.exports = { app, start };
