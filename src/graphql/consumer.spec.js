const { Publisher, GraphQLInteraction, Matchers } = require('@pact-foundation/pact');
const { query } = require('./consumerClient');
const { provider, pactFile } = require('../pact');

describe('GraphQL example', () => {
  beforeAll(() =>
    provider.setup().then((opts) => {
      process.env.API_PORT = opts.port;
    }),
  );
  afterAll(async () => {
    await provider.finalize();
    const opts = {
      pactBroker: 'localhost:9292',
      pactFilesOrDirs: [pactFile],
      consumerVersion: '1.0.0',
    };
    const results = await new Publisher(opts).publishPacts();
    console.log('publis results:', results);
  });

  describe('query hello on /graphql', () => {
    beforeAll(() => {
      const graphqlQuery = new GraphQLInteraction()
        .uponReceiving('a hello request')
        .withQuery(
          `
          query HelloQuery {
            hello
          }
        `,
        )
        .withOperation('HelloQuery')
        .withRequest({
          path: '/graphql',
          method: 'POST',
        })
        .withVariables({
          foo: 'bar',
        })
        .willRespondWith({
          status: 200,
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: {
            data: {
              hello: Matchers.like('Hello world!'),
            },
          },
        });
      return provider.addInteraction(graphqlQuery);
    });

    it('returns the correct response', async () => {
      return expect(await query()).toEqual({ hello: 'Hello world!' });
    });

    // verify with Pact, and reset expectations
    afterEach(() => provider.verify());
  });
});
