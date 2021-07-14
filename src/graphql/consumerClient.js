const { ApolloClient } = require('apollo-boost');
const { InMemoryCache } = require('apollo-cache-inmemory');
const gql = require('graphql-tag');
const { createHttpLink } = require('apollo-link-http');

const createClient = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      fetch: require('node-fetch'),
      headers: {
        foo: 'bar',
      },
      uri: `http://localhost:${process.env.API_PORT}/graphql`,
    }),
  });

const query = () => {
  return createClient()
    .query({
      query: gql`
        query HelloQuery {
          hello
        }
      `,
      variables: {
        foo: 'bar',
      },
    })
    .then((result) => result.data);
};

module.exports = { query };
