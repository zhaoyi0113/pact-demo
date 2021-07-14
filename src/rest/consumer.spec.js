const { Publisher } = require('@pact-foundation/pact');

const { Order } = require('../order');
const { fetchOrders } = require('./orderClient');
const { provider, pactFile } = require('../pact');

describe('Pact with Order API', () => {
  // Start the mock service on a randomly available port,
  // and set the API mock service port so clients can dynamically
  // find the endpoint
  beforeAll(() =>
    provider.setup().then((opts) => {
      process.env.API_PORT = opts.port;
    }),
  );
  afterEach(() => provider.verify());

  describe('given there are orders', () => {
    const itemProperties = {
      name: 'burger',
      quantity: 2,
      value: 100,
    };

    const orderProperties = {
      id: 1,
      items: [itemProperties],
    };

    describe('when a call to the API is made', () => {
      beforeAll(() => {
        return provider.addInteraction({
          state: 'there are orders',
          uponReceiving: 'a request for orders',
          withRequest: {
            path: '/orders',
            method: 'GET',
          },
          willRespondWith: {
            body: [orderProperties],
            status: 200,
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          },
        });
      });

      it('will receive the list of current orders', async () => {
        const orders = await fetchOrders();
        return expect(orders).toEqual([new Order(orderProperties.id, [itemProperties])]);
      });
    });
  });

  // Write pact files to file
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
});
